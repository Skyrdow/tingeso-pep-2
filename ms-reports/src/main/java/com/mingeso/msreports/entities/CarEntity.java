package com.mingeso.msreports.entities;

import com.mingeso.msreports.enums.CarType;
import com.mingeso.msreports.enums.MotorType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table(name = "autos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CarEntity {
    @Id
    @Column(unique = true, nullable = false)
    private String patent;


    private String brand;
    private String model;
    private CarType carType;
    private Date fabDate = new Date();
    private MotorType motorType;
    private int seatCount;
    private Long mileage;

    private Long brandBonus = 0L;
}
