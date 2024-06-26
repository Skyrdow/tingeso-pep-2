package com.mingeso.msreports.clients;

import com.mingeso.msreports.configurations.FeignClientConfig;
import com.mingeso.msreports.entities.ReparationListEntity;
import com.mingeso.msreports.enums.ReparationType;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Optional;

@FeignClient(value = "ms-repair-list",
        path = "/api/v1/repair-list",
        configuration = {FeignClientConfig.class})
public interface ReparationListFeignClient {
    @PostMapping("/reparation-by-type")
    public ReparationListEntity getReparationByType(@RequestBody Integer reparationId);
}
