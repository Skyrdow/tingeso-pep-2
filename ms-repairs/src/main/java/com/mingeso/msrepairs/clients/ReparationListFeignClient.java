package com.mingeso.msrepairs.clients;

import com.mingeso.msrepairs.configurations.FeignClientConfig;
import com.mingeso.msrepairs.entities.ReparationListEntity;
import com.mingeso.msrepairs.enums.ReparationType;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@FeignClient(value = "ms-vehicles",
        path = "/api/v1/repair-list",
        configuration = {FeignClientConfig.class})
public interface ReparationListFeignClient {
    @GetMapping("/")
    public List<ReparationListEntity> getReparationList();

    @GetMapping("/reparation-by-type")
    public ReparationListEntity getReparationByType(@RequestBody ReparationType reparationType);

    @PostMapping("/")
    public ReparationListEntity saveReparationList(@RequestBody ReparationListEntity reparationListEntity);
}
