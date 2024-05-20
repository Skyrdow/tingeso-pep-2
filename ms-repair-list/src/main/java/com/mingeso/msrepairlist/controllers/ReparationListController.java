package com.mingeso.msrepairlist.controllers;

import com.mingeso.msrepairlist.entities.ReparationListEntity;
import com.mingeso.msrepairlist.enums.ReparationType;
import com.mingeso.msrepairlist.services.ReparationListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/repair-list")
@CrossOrigin("*")
public class ReparationListController {
    @Autowired
    ReparationListService reparationListService;

    @GetMapping("/")
    public ResponseEntity<List<ReparationListEntity>> getReparationList() {
        return ResponseEntity.ok(reparationListService.getReparationList());
    }

    @GetMapping("/reparation-by-type")
    public ResponseEntity<ReparationListEntity> getReparationByType(@RequestBody ReparationType reparationType) {
        Optional<ReparationListEntity> rep = reparationListService.findByReparationType(reparationType);
        return rep.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.ok(new ReparationListEntity()));
    }

    @PostMapping("/")
    public ResponseEntity<ReparationListEntity> saveReparationList(@RequestBody ReparationListEntity reparationListEntity) {
        return ResponseEntity.ok(reparationListService.saveReparationList(reparationListEntity));
    }
}
