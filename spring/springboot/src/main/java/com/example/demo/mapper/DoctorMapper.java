package com.example.demo.mapper;

import com.example.demo.entity.BaseDoctorEntity;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface DoctorMapper {
    @Select("SELECT * FROM base_doctor")
    List<BaseDoctorEntity> findAll();

    @Select("SELECT * FROM base_doctor WHERE doctor_id = #{doctor}")
    BaseDoctorEntity findById();

    @Select("SELECT * FROM base_doctor WHERE user_id = #{user}")
    BaseDoctorEntity findByUser(@Param("user")Integer user);

    @Select("SELECT * FROM base_doctor WHERE doctor_name LIKE '%${value}%' OR dept_name LIKE '%${value}%'")
    List<BaseDoctorEntity> findByConditon(String search);

    @Delete("DELETE FROM base_doctor WHERE doctor_id = #{doctor}")
    void deleteDoctor(@Param("doctor")Integer doctor);
}
