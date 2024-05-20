package com.mingeso.msrepairs.services;

import com.mingeso.msrepairs.PriceConstants;
import com.mingeso.msrepairs.clients.CarsFeignClient;
import com.mingeso.msrepairs.clients.ReparationListFeignClient;
import com.mingeso.msrepairs.entities.CarEntity;
import com.mingeso.msrepairs.entities.ReparationEntity;
import com.mingeso.msrepairs.entities.ReparationTypeEntity;
import com.mingeso.msrepairs.enums.ReparationType;
import com.mingeso.msrepairs.repositories.ReparationRepository;
import com.mingeso.msrepairs.repositories.ReparationTypeRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ReparationService {
    @Autowired
    CarsFeignClient carsFeignClient;
    @Autowired
    ReparationListFeignClient reparationListFeignClient;
    @Autowired
    ReparationRepository reparationRepository;
    @Autowired
    ReparationTypeRepository reparationTypeRepository;
    PriceConstants pc = PriceConstants.getInstance();

    public List<ReparationEntity> getReparations() {
        return reparationRepository.findAll();
    }
    public List<ReparationEntity> getReparationsByPatent(String patent) {
        return reparationRepository.findByPatent(patent);
    }
    @Transactional
    public ReparationEntity saveReparation(ReparationEntity reparationEntity) throws Exception {
        CarEntity car = carsFeignClient.findCar(reparationEntity.getPatent());
        if (car == null) throw new Exception("No car with patent " + reparationEntity.getPatent());
        ReparationEntity savedEntity = reparationRepository.save(reparationEntity);
        System.out.println(savedEntity);
        if (savedEntity.getReparationTypes().isEmpty()) throw new Exception("Reparation without type");
        for (ReparationTypeEntity rep:savedEntity.getReparationTypes()) {
            rep.setReparationId(savedEntity.getId());
            reparationTypeRepository.save(rep);
        }
        savedEntity.setMotorType(car.getMotorType());
        List<ReparationEntity> reparations = List.of(savedEntity);
        Long price = getReparationPrices(reparations, car);
        Float surcharges = getSurcharges(reparations, car, price);
        Float discounts = getDiscounts(reparations, car, price);
        try {
            savedEntity.setSumAmount(price);
            savedEntity.setSurchargeAmount(surcharges);
            savedEntity.setDiscountAmount(discounts);
            savedEntity.setIvaAmount((price + surcharges - discounts) * pc.iva);
            savedEntity.setTotalAmount(applyIva(price + surcharges - discounts));
        } catch (Exception e) { throw new Exception(e.getMessage()); }
        return savedEntity;
    }

    public List<ReparationType> getReparationTypes(ReparationEntity reparation) {
        List<ReparationTypeEntity> reparationTypes = reparationTypeRepository.findByReparationId(reparation.getId());

        return reparationTypes.stream().map(ReparationTypeEntity::getReparationType).toList();
    }
    // Usando fecha de admisión y contando TODAS las reparaciones
    public Integer reparationOnLast12MonthsCount(CarEntity carEntity) {
        List<ReparationEntity> reparations = reparationRepository.findByPatent(carEntity.getPatent());
        System.out.println(reparations);

        // Calcula la fecha de hace 12 meses
        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.MONTH, -12);
        Date twelveMonthsAgo = cal.getTime();

        // Filtra las reparaciones en el rango de los últimos 12 meses y cuenta los resultados
        long count = reparations.stream()
                .filter(reparation -> reparation.getAdmissionDate().after(twelveMonthsAgo))
                .count();

        return Math.toIntExact(count);
    }
    public Long getReparationTime(ReparationEntity reparation) {
        Date startDate = reparation.getAdmissionDate();
        Date endDate = reparation.getRepairExitDate();
        return endDate.getTime() - startDate.getTime();
    }


    public Float calculateReparationPrice(CarEntity car) throws Exception {
        List<ReparationEntity> reparations = reparationRepository.findByPatent(car.getPatent());
        // Costo Total = [Suma(Reparaciones) + Recargos – Descuentos] + IVA
        try {
            Long price = getReparationPrices(reparations, car);
            Float surcharges = getSurcharges(reparations, car, price);
            Float discounts = getDiscounts(reparations, car, price);
            return applyIva(price + surcharges - discounts);
        } catch (Exception e) { throw new Exception(e.getMessage()); }
    }

    public Long getReparationPrices(List<ReparationEntity> reparations, CarEntity car) {
        Long priceSum = 0L;
        for (ReparationEntity reparation : reparations) {
            for (ReparationType reparationType : getReparationTypes(reparation)) {
                priceSum += reparationListFeignClient.getReparationByType(reparationType).get(car.getMotorType());
            }
        }
        return priceSum;
    }

    public Float getSurcharges(List<ReparationEntity> reparations, CarEntity car, Long price) throws Exception {
        try {
            Float mileageSurcharge = pc.mileageSurchargeMap.get(car.getCarType()).getMileageSurcharge(car.getMileage())/100f;
            Float ageSurcharge = pc.ageSurchargeMap.get(car.getCarType()).getAgeSurcharge(car.getFabDate())/100f;
            Integer delaySum = 0;
            for (ReparationEntity reparation: reparations) {
                delaySum += pc.delaySurcharge.getDelaySurcharge(reparation.getRepairExitDate(), reparation.getRetrievalDate());
            }
            Float delaySurcharge = delaySum/100f;
            return (mileageSurcharge + ageSurcharge + delaySurcharge) * price;
        } catch (Exception e) { throw new Exception(e.getMessage()); }
    }

    public Float getDiscounts(List<ReparationEntity> reparations, CarEntity car, Long price) throws Exception {
        try {
            Integer reparationCount = reparationOnLast12MonthsCount(car);
            Float repairDiscount = pc.discountByRepairMap.get(car.getMotorType()).getDiscountByRepair(reparationCount)/100f;
            Integer daySum = 0;
            for (ReparationEntity reparation: reparations) {
                daySum += pc.discountByDay.getDiscountByDay(reparation.getAdmissionDate());
            }
            Float dayDiscount = daySum/100f;
            Long brandBonus = car.getBrandBonus();

            return ((repairDiscount + dayDiscount) * price) + brandBonus;
        } catch (Exception e) { throw new Exception(e.getMessage()); }
    }

    public Float applyIva(Float price) {
        return (price + (price * pc.iva));
    }

    public List<Map> getRepairReport() {
        List<Map> responseMaps = new ArrayList<>();
        List<CarEntity> everyCar = carsFeignClient.listCars();
        for (CarEntity car: everyCar) {
            try {
                List<ReparationEntity> reparations = reparationRepository.findByPatent(car.getPatent());
                if (reparations.isEmpty()) continue;
                Long price = getReparationPrices(reparations, car);
                Float totalPrice = calculateReparationPrice(car);
                Float surcharges =  getSurcharges(reparations, car, price);
                Float discounts =  getDiscounts(reparations, car, price);
                Map newMap = Map.of(
                        "car", car.getPatent(),
                        "totalPrice", totalPrice,
                        "basePrice", price,
                        "surcharges", surcharges,
                        "discounts", discounts,
                        "iva", pc.iva * (price + surcharges - discounts)
                );
                responseMaps.add(newMap);
            } catch (Exception e) { responseMaps.add(Map.of("Problem on car:", car.getPatent(),
                    "problem:", e.getMessage())); }
        }
        return responseMaps;
    }
}
