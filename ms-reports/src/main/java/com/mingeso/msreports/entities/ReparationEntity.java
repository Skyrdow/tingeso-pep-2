package com.mingeso.msreports.entities;


import com.mingeso.msreports.enums.MotorType;
import com.mingeso.msreports.enums.ReparationType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "reparaciones")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReparationEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;

    private String patent;
    private MotorType motorType;
    private Date admissionDate;
    private Long sumAmount = 0L;
    private Float surchargeAmount = 0f;
    private Float discountAmount = 0f;
    private Float ivaAmount = 0f;
    private Float totalAmount = 0f;

    @OneToMany(mappedBy = "reparation", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ReparationTypeEntity> reparationTypes = new HashSet<>();
    private Date repairExitDate;
    private Date retrievalDate;

    public void setReparationType(ReparationType reparationType) {
        ReparationTypeEntity reparationTypeEntity = new ReparationTypeEntity();
        reparationTypeEntity.setReparationType(reparationType);
        reparationTypeEntity.setReparationId(this.getId());
        reparationTypes.add(reparationTypeEntity);
    }
}
