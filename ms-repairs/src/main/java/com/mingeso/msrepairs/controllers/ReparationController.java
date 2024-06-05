package com.mingeso.msrepairs.controllers;

import com.mingeso.msrepairs.entities.ReparationEntity;
import com.mingeso.msrepairs.enums.ReparationType;
import com.mingeso.msrepairs.services.ReparationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/reparation")
public class ReparationController {
    @Autowired
    ReparationService reparationService;

    @GetMapping("/")
    public ResponseEntity<Map<String, List<Map>>> getReparations() {
        List<ReparationEntity> newReparations = reparationService.getReparations();
        List<Map> response = new ArrayList<>();
        for (ReparationEntity reparation: newReparations) {
            response.add(Map.of(
                    "patent", reparation.getPatent(),
                    "discount", reparation.getDiscountAmount(),
                    "iva", reparation.getIvaAmount(),
                    "total", reparation.getTotalAmount(),
                    "sum", reparation.getSumAmount(),
                    "surcharge", reparation.getSurchargeAmount(),
                    "admissionDate", reparation.getAdmissionDate(),
                    "reparationTypes", reparationService.getReparationTypes(reparation).toString(),
                    "repairExitDate", reparation.getRepairExitDate(),
                    "retrievalDate", reparation.getRetrievalDate()));
        }
        return ResponseEntity.ok(Map.of("reparations", response));
    }

    @GetMapping("/list")
    public ResponseEntity<List<ReparationEntity>> getReparationsList() {
        List<ReparationEntity> newReparations = reparationService.getReparations();
        return ResponseEntity.ok(newReparations);
    }
    @PostMapping("/types")
    public ResponseEntity<List<ReparationType>> getReparationTypes(@RequestBody ReparationEntity reparation) {
        List<ReparationType> newReparations = reparationService.getReparationTypes(reparation);
        return ResponseEntity.ok(newReparations);
    }

    @GetMapping("/report")
    public ResponseEntity<?> getReport() {
        return ResponseEntity.ok(reparationService.getRepairReport());
    }

    @PostMapping("/")
    public ResponseEntity<?> saveReparation(@RequestBody ReparationEntity reparationEntity) {

        ReparationEntity newReparation = null;
        try {
            newReparation = reparationService.saveReparation(reparationEntity);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        return ResponseEntity.ok(newReparation);
    }
}
