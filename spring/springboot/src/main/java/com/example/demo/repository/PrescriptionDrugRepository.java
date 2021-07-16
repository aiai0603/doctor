package com.example.demo.repository;

import com.example.demo.entity.PrescriptionDrugEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface PrescriptionDrugRepository extends JpaRepository<PrescriptionDrugEntity,Integer>,
        JpaSpecificationExecutor<PrescriptionDrugEntity> {
}
