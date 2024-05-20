package com.mingeso.msrepairlist.repositories;

import com.mingeso.msrepairlist.entities.ReparationListEntity;
import com.mingeso.msrepairlist.enums.ReparationType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReparationListRepository extends JpaRepository<ReparationListEntity, ReparationType> {
}
