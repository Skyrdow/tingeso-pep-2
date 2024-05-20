package com.mingeso.msreports.entities;

import com.mingeso.msreports.enums.ReparationType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "tipos_reparaciones")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReparationTypeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "reparation")
    private ReparationEntity reparation;
    private Long reparationId;
    private ReparationType reparationType;
}
