package com.mingeso.msvehicles.services;

import com.mingeso.msvehicles.entities.CarEntity;
import com.mingeso.msvehicles.enums.CarType;
import com.mingeso.msvehicles.enums.MotorType;
import com.mingeso.msvehicles.repositories.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarService {
    @Autowired
    CarRepository carRepository;
    public List<CarEntity> getCars() { return carRepository.findAll();}
    public CarEntity saveCar(CarEntity carEntity) { return carRepository.save(carEntity); }
    public CarEntity getCarByPatent(String patent) { return carRepository.findByPatent(patent); }
    public List<CarEntity> getCarsByCarType(CarType carType) { return carRepository.findByCarType(carType); }
    public List<CarEntity> getCarsByMotorType(MotorType motorType) { return carRepository.findByMotorType(motorType); }
    public List<CarEntity> getCarsByBrand(String brand) { return carRepository.findByBrand(brand); }
    public List<String> getBrands() {
        return carRepository.findAll().stream().map(CarEntity::getBrand).distinct().toList();
    }
    public CarEntity setBrandBonus(String patent, Long bonus) throws Exception {
        CarEntity car = carRepository.findByPatent(patent);
        if (car == null) throw new Exception("Car with patent " + patent + "not found");
        car.setBrandBonus(bonus);
        return carRepository.save(car);
    }
}
