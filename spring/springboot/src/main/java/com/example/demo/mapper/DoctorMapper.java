package com.example.demo.mapper;

import com.example.demo.entity.BaseDoctorEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface DoctorMapper {
    @Select("SELECT * FROM base_doctor")
    List<BaseDoctorEntity> findAll();
}
