package com.example.demo.repository;

import com.example.demo.entity.BaseAccoutEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface AccountRepository extends JpaRepository<BaseAccoutEntity,Integer>, JpaSpecificationExecutor<BaseAccoutEntity> {
}
