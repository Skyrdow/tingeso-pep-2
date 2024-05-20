package com.mingeso.msvehicles.repositories;

import com.mingeso.msvehicles.entities.CarEntity;
import com.mingeso.msvehicles.enums.CarType;
import com.mingeso.msvehicles.enums.MotorType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarRepository extends JpaRepository<CarEntity, String> {
    CarEntity findByPatent(String patent);
    List<CarEntity> findByCarType(CarType carType);
    List<CarEntity> findByMotorType(MotorType motorType);
    List<CarEntity> findByBrand(String brand);
}
