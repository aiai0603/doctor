package com.example.demo.mapper;

import com.example.demo.entity.BaseDrugEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface DrugMapper {
    @Select("SELECT * FROM base_drug WHERE pinyin_code LIKE '%${value}%' OR drug_name LIKE '%${value}%'")
    List<BaseDrugEntity> findByIndex(String search);

    @Select("SELECT * FROM base_drug")
    List<BaseDrugEntity> findAll();

}
