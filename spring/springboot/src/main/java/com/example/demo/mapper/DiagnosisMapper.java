package com.example.demo.mapper;

import com.example.demo.entity.BaseDiagnosisEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface DiagnosisMapper {
    @Select("SELECT * FROM base_diagnosis")
    List<BaseDiagnosisEntity> findAll();
}
