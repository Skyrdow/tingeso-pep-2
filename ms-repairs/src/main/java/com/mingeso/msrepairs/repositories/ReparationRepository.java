package com.mingeso.msrepairs.repositories;

import com.mingeso.msrepairs.entities.ReparationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReparationRepository extends JpaRepository<ReparationEntity, Long> {
    List<ReparationEntity> findByPatent(String patent);
    Integer countByPatent(String patent);
}
