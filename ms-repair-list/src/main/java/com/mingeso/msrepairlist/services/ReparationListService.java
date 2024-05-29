package com.mingeso.msrepairlist.services;
import com.mingeso.msrepairlist.entities.ReparationListEntity;
import com.mingeso.msrepairlist.enums.ReparationType;
import com.mingeso.msrepairlist.repositories.ReparationListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReparationListService {
    @Autowired
    ReparationListRepository reparationListRepository;

    public List<ReparationListEntity> getReparationList() {
        return reparationListRepository.findAll();
    }

    public ReparationListEntity saveReparationList(ReparationListEntity reparationListEntity) {
        return reparationListRepository.save(reparationListEntity);
    }
    public Optional<ReparationListEntity> findByReparationType(Long reparationId) {
        return reparationListRepository.findById(reparationId);
    }
}
