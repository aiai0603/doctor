package com.example.demo.mapper;

import com.example.demo.entity.ConsultAskEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface ConsultAskMapper {
   @Select("SELECT * FROM consult_ask WHERE doctor_id = #{doctor} AND consult_status = #{type}")
    List<ConsultAskEntity> findAll(@Param("doctor") String doctor,@Param("type") Integer type);

   @Select("SELECT * FROM consult_ask WHERE consult_id = #{consult}")
    ConsultAskEntity findByConsult(@Param("consult") String consult);
}
