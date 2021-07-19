package com.example.demo.mapper;

import com.example.demo.entity.ConsultAskEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.sql.Timestamp;
import java.util.List;

@Mapper
public interface ConsultAskMapper {
   @Select("SELECT * FROM consult_ask WHERE doctor_id = #{doctor} AND consult_status = #{type}")
    List<ConsultAskEntity> findAll(@Param("doctor") String doctor,@Param("type") Integer type);

   @Select("SELECT * FROM consult_ask WHERE consult_id = #{consult}")
    ConsultAskEntity findByConsult(@Param("consult") Integer consult);

   @Update("UPDATE consult_ask SET finish_time = #{finish} , consult_status = 3 WHERE consult_id = #{consult}")
    void finishConsult(@Param("finish")Timestamp time,@Param("consult") Integer consult);

   @Select("SELECT * FROM consult_ask WHERE create_user_id = #{user}")
    List<ConsultAskEntity> findByUser(@Param("user")Integer user );
}
