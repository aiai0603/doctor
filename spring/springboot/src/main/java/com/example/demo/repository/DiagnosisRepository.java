package com.example.demo.repository;

import com.example.demo.entity.BaseDiagnosisEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface DiagnosisRepository extends JpaRepository<BaseDiagnosisEntity,Integer>, JpaSpecificationExecutor<BaseDiagnosisEntity> {

}
