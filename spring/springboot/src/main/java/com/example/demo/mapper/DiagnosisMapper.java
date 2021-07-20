package com.example.demo.mapper;

import com.example.demo.entity.BaseDiagnosisEntity;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface DiagnosisMapper {

    @Select("SELECT * FROM base_diagnosis WHERE diseases_name LIKE '%${value}%' OR pinyin_code LIKE '%${value}%'")
    List<BaseDiagnosisEntity> findByConditon(String search);

    @Select("SELECT * FROM base_diagnosis WHERE diagnosis_id = #{diagnosis}")
    BaseDiagnosisEntity findById(@Param("diagnosis")Integer diagnosis);

    @Delete("DELETE FROM base_diagnosis WHERE diagnosis_id = #{diagnosis}")
    void deleteById(@Param("diagnosis")Integer diagnosis);

    @Select("SELECT * FROM base_diagnosis WHERE diseases_id = #{diseases}")
    BaseDiagnosisEntity findByDiseases(@Param("diseases")Integer diseases);
}
