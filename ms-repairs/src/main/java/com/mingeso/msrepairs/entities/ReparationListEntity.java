package com.mingeso.msrepairs.entities;

import com.mingeso.msrepairs.enums.MotorType;
import com.mingeso.msrepairs.enums.ReparationType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "lista_reparaciones")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReparationListEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;

    private Long gasolinePrice;
    private Long dieselPrice;
    private Long hibridoPrice;
    private Long electricoPrice;

    public Long get(MotorType motorType) {
        switch (motorType) {
            case Gasolina -> {
                return this.gasolinePrice;
            }
            case Diesel -> {
                return this.dieselPrice;
            }
            case Hibrido -> {
                return this.hibridoPrice;
            }
            case Electrico -> {
                return this.electricoPrice;
            }
            default -> {
                return null;
            }
        }
    }
}
