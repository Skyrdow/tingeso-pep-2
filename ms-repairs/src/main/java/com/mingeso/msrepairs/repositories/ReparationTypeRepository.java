package com.mingeso.msrepairs.repositories;

import com.mingeso.msrepairs.entities.ReparationTypeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReparationTypeRepository extends JpaRepository<ReparationTypeEntity, Long> {
    List<ReparationTypeEntity> findByReparationId(Long id);
}
