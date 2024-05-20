package com.mingeso.msreports.controllers;

import com.mingeso.msreports.enums.CarType;
import com.mingeso.msreports.enums.ReparationType;
import com.mingeso.msreports.services.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/v1/report")
@CrossOrigin("*")
public class ReportController {
    @Autowired
    ReportService reportService;

    @GetMapping("/1/{month}-{year}")
    public ResponseEntity<?> getReport1(@PathVariable Integer month, @PathVariable Integer year) {
        Map<CarType, Map> report2 = reportService.getReport1(month, year);
        List<Map> response = new ArrayList<>();
        for (ReparationType reparationType: ReparationType.values()) {
            List<Map> carTypesMaps = new ArrayList<>();
            for (CarType carType:CarType.values()) {
                Map carTypeReport = (Map) report2.get(carType).get(reparationType);
                if (carTypeReport == null) {
                    carTypesMaps.add(Map.of(
                            "carType", carType,
                            "totalPrice", 0,
                            "count", 0));
                } else {
                    carTypesMaps.add(Map.of(
                            "carType", carType,
                            "totalPrice", carTypeReport.get("totalPrice"),
                            "count", carTypeReport.get("count")));
                }
            }
            Map reparationMap = Map.of("reparationType", reparationType,
                    "carTypes", carTypesMaps);
            response.add(reparationMap);
        }

        return ResponseEntity.ok(response);
    }
    @GetMapping("/2/{month}-{year}")
    public ResponseEntity<?> getReport2(@PathVariable Integer month, @PathVariable Integer year) {
        List<Map<ReparationType, Map>> report2 = reportService.getReport2(month, year);
        List<Map> response = new ArrayList<>();
        for (ReparationType reparationType: ReparationType.values()) {
            List<Map> monthsMap = new ArrayList<>();
            for (Integer monthInt: List.of(0, 1, 2, 3)) {
                if (monthInt == 3) {
                    Map monthReport = report2.get(monthInt).get(reparationType);
                    monthsMap.add(Map.of(
                            "month", monthInt,
                            "totalPrice", monthReport.get("totalPrice"),
                            "count", monthReport.get("count")));
                } else {
                    Map monthReport = report2.get(monthInt).get(reparationType);
                    Map lastMonthReport = report2.get(monthInt + 1).get(reparationType);
                    Float priceVariation = (float) (((Long)monthReport.get("totalPrice")/(Long)lastMonthReport.get("totalPrice")) - 1);
                    Float countVariation = (float) (((Long)monthReport.get("count")/(Long)lastMonthReport.get("count")) - 1);
                    monthsMap.add(Map.of(
                            "month", monthInt,
                            "totalPrice", monthReport.get("totalPrice"),
                            "count", monthReport.get("count"),
                            "priceVariation", priceVariation,
                            "countVariation", countVariation));
                }
            }
            Map reparationMap = Map.of("reparationType", reparationType,
                    "months", monthsMap);
            response.add(reparationMap);
        }
        return ResponseEntity.ok(response);
    }
}
