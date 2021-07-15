package com.example.demo.mapper;

import com.example.demo.entity.BaseDicDrugFrequencyEntity;
import com.example.demo.entity.BaseDicDrugUsageEntity;
import com.example.demo.entity.BaseDrugEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface DrugMapper {
    @Select("SELECT * FROM base_drug WHERE pinyin_code LIKE '%${value}%' OR drug_name LIKE '%${value}%'")
    List<BaseDrugEntity> findByIndex(String search);

    @Select("SELECT * FROM base_drug")
    List<BaseDrugEntity> findAll();

    @Select("SELECT * FROM base_drug WHERE drug_id = #{drugId}")
    BaseDrugEntity findByDrugId(@Param("drugId")Integer drugId);

    @Select("SELECT * FROM base_dic_drug_frequency")
    List<BaseDicDrugFrequencyEntity> findFrequency();

    @Select("SELECT * FROM base_dic_drug_usage")
    List<BaseDicDrugUsageEntity> findUsage();


}
