package com.mingeso.msreports.services;

import com.mingeso.msreports.clients.CarsFeignClient;
import com.mingeso.msreports.clients.ReparationListFeignClient;
import com.mingeso.msreports.clients.ReparationsFeignClient;
import com.mingeso.msreports.entities.CarEntity;
import com.mingeso.msreports.entities.ReparationEntity;
import com.mingeso.msreports.enums.CarType;
import com.mingeso.msreports.enums.ReparationType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ReportService {
    @Autowired
    ReparationsFeignClient reparationsFeignClient;
    @Autowired
    ReparationListFeignClient reparationListFeignClient;
    @Autowired
    CarsFeignClient carsFeignClient;

    public Map<CarType, Map> getReport1(Integer month, Integer year) {
        Map<CarType, Map> carTypeCounts = new HashMap<>();
        for (CarType carType : CarType.values()) {
            Map<ReparationType, Map> carTypeData = new HashMap<>();
            // Obtener los autos por tipo de auto
            List<CarEntity> everyCar = carsFeignClient.listCars().stream().filter(car -> car.getCarType() == carType).toList();
            for (CarEntity car : everyCar) {
                // reportes por auto y falta filtrar por mes y año
                List<ReparationEntity> reparations = reparationsFeignClient.getReparationsList().stream()
                        .filter(reparationEntity -> Objects.equals(reparationEntity.getPatent(), car.getPatent())).toList();
                reparations = filterReparationsByMonth(reparations, month, year);
                for (ReparationEntity reparation : reparations) {
                    List<ReparationType> types = reparationsFeignClient.getReparationTypes(reparation);
                    for (ReparationType type : types) {
                        Long price = reparationListFeignClient.getReparationByType(type.ordinal()).get(car.getMotorType());
                        if (!carTypeData.containsKey(type)) {
                            carTypeData.put(type, Map.of("count", 1, "totalPrice", price));
                        } else {
                            Map accumulator = carTypeData.get(type);
                            Integer newCount = (Integer) accumulator.get("count") + 1;
                            Long newPrice = (Long) accumulator.get("totalPrice") + price;
                            carTypeData.put(type, Map.of("count", newCount, "totalPrice", newPrice));
                        }
                    }
                }
            }
            carTypeCounts.put(carType, carTypeData);
        }
        System.out.println(carTypeCounts);
        return carTypeCounts;
    }

    public List<Map<ReparationType, Map>> getReport2(Integer month, Integer year) {
        List<Map<ReparationType, Map>> resultList = new ArrayList<>();
        // Obtener todas las reparaciones
        List<ReparationEntity> reparations = reparationsFeignClient.getReparationsList();
        for (Integer monthInt: List.of(0,1,2,3))
        {
            Map<ReparationType, Map> result = new HashMap<>();
            List<ReparationEntity> reparationsMonth = filterReparationsByMonth(reparations, (month - monthInt + 12) % 12, month > monthInt ? year : year - 1);
            for (ReparationType type : ReparationType.values())
            {
                result.put(type, Map.of("count", 0, "totalPrice", 0));
            }
            for (ReparationEntity reparation : reparationsMonth) {
                // Obtener todos los tipos de cada reparacion
                List<ReparationType> types = reparationsFeignClient.getReparationTypes(reparation);
                // Calcular por tipo el precio y sumarlo
                for (ReparationType type : types)
                {
                    Long price = reparationListFeignClient.getReparationByType(type.ordinal()).get(reparation.getMotorType());
                    Map accumulator = result.get(type);
                    Integer newCount = ((Number) accumulator.get("count")).intValue() + 1;
                    Long newPrice = ((Number) accumulator.get("totalPrice")).longValue() + price;
                    result.put(type, Map.of("count", newCount, "totalPrice", newPrice));
                }
            }
            resultList.add(result);
        }

        return resultList;
    }

    public List<ReparationEntity> filterReparationsByMonth(List<ReparationEntity> reparationEntityList, Integer month, Integer year) {
        return reparationEntityList.stream().filter(reparationEntity -> {
            Calendar dateCal = Calendar.getInstance();
            dateCal.setTime(reparationEntity.getAdmissionDate());

            return dateCal.get(Calendar.MONTH) == (month - 1) && dateCal.get(Calendar.YEAR) == year;
        }).toList();
    }
}
