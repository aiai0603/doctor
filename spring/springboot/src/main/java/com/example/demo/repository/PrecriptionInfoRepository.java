package com.example.demo.repository;

import com.example.demo.entity.PrescriptionInfoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface PrecriptionInfoRepository extends JpaRepository<PrescriptionInfoEntity,Integer>, JpaSpecificationExecutor<PrescriptionInfoEntity> {
}
