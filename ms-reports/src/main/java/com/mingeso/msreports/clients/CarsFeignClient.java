package com.mingeso.msreports.clients;

import com.mingeso.msreports.configurations.FeignClientConfig;
import com.mingeso.msreports.entities.CarEntity;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(value = "ms-vehicles",
        path = "/api/v1/cars",
        configuration = {FeignClientConfig.class})
public interface CarsFeignClient {
    @GetMapping("/")
    public List<CarEntity> listCars();

    @GetMapping("/{patent}")
    public CarEntity findCar(@PathVariable String patent);
}
