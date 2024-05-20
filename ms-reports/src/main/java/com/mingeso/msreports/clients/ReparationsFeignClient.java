package com.mingeso.msreports.clients;

import com.mingeso.msreports.configurations.FeignClientConfig;
import com.mingeso.msreports.entities.CarEntity;
import com.mingeso.msreports.entities.ReparationEntity;
import com.mingeso.msreports.enums.ReparationType;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Map;

@FeignClient(value = "ms-repairs",
        path = "/api/v1/reparation",
        configuration = {FeignClientConfig.class})
public interface ReparationsFeignClient {
    @GetMapping("/")
    public Map<String, List<Map>> getReparations();
    @GetMapping("/list")
    public List<ReparationEntity> getReparationsList();
    @GetMapping("/types")
    public List<ReparationType> getReparationTypes(@RequestBody ReparationEntity reparation);
}
