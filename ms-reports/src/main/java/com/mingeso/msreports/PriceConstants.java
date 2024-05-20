package com.mingeso.msreports;


import com.mingeso.msreports.enums.CarType;
import com.mingeso.msreports.enums.MotorType;

import java.util.HashMap;
import java.util.Map;

public class PriceConstants {
    private static PriceConstants instance = null;
    // Precios por tipo de reparacion
    public Float iva;
    public Map<MotorType, DiscountByRepair> discountByRepairMap;

    public Map<CarType, MileageSurcharge> mileageSurchargeMap;
    public Map<CarType, AgeSurcharge> ageSurchargeMap;
    public DelaySurcharge delaySurcharge;
    public DiscountByDay discountByDay;
    public static PriceConstants getInstance() {
        if (instance == null) {
            instance = new PriceConstants();
        }
        return instance;
    }
    private PriceConstants() {
        discountByRepairMap = new HashMap<>();
        discountByRepairMap.put(MotorType.Gasolina, new DiscountByRepair(5, 10, 15, 20));
        discountByRepairMap.put(MotorType.Diesel, new DiscountByRepair(7, 12, 17, 22));
        discountByRepairMap.put(MotorType.Hibrido, new DiscountByRepair(10, 15, 20, 25));
        discountByRepairMap.put(MotorType.Electrico, new DiscountByRepair(8, 13, 18, 23));

        mileageSurchargeMap = new HashMap<>();
        mileageSurchargeMap.put(CarType.Sedan, new MileageSurcharge(0, 3, 7, 12, 20));
        mileageSurchargeMap.put(CarType.Hatchback, new MileageSurcharge(0, 3, 7, 12, 20));
        mileageSurchargeMap.put(CarType.SUV, new MileageSurcharge(0, 5, 9, 12, 20));
        mileageSurchargeMap.put(CarType.Pickup, new MileageSurcharge(0, 5, 9, 12, 20));
        mileageSurchargeMap.put(CarType.Furgoneta, new MileageSurcharge(0, 5, 9, 12, 20));

        ageSurchargeMap = new HashMap<>();
        ageSurchargeMap.put(CarType.Sedan, new AgeSurcharge(0, 5, 9, 15));
        ageSurchargeMap.put(CarType.Hatchback, new AgeSurcharge(0, 5, 9, 15));
        ageSurchargeMap.put(CarType.SUV, new AgeSurcharge(0, 7, 11, 20));
        ageSurchargeMap.put(CarType.Pickup, new AgeSurcharge(0, 7, 11, 20));
        ageSurchargeMap.put(CarType.Furgoneta, new AgeSurcharge(0, 7, 11, 20));

        delaySurcharge = new DelaySurcharge(5);
        discountByDay = new DiscountByDay(10);

        iva = 0.19f;
    }
}
