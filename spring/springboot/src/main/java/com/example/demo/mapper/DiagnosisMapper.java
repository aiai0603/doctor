package com.example.demo.mapper;

import com.example.demo.entity.BaseDiagnosisEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface DiagnosisMapper {
    @Select("SELECT * FROM base_diagnosis")
    List<BaseDiagnosisEntity> findAll();
    @Select("SELECT * FROM base_diagnosis WHERE diseases_name LIKE '%${value}%' OR pinyin_code LIKE '%${value}%'")
    List<BaseDiagnosisEntity> findByConditon(String search);
}
