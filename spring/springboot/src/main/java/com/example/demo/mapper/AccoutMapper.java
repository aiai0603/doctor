package com.example.demo.mapper;

import com.example.demo.entity.BaseAccoutEntity;
import com.example.demo.entity.BaseDicDrugUsageEntity;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface AccoutMapper {
   @Select("SELECT * FROM base_accout WHERE phone_no = #{phone}")
    BaseAccoutEntity findByPhone(@Param("phone") String phone);
   @Select("SELECT * FROM base_accout WHERE mini_open_id = #{openid}")
    BaseAccoutEntity findByOpen(@Param("openid") String openid);

    @Select("SELECT * FROM base_accout WHERE user_id = #{user}")
    BaseAccoutEntity findByUser(@Param("user") Integer user);

   @Select("SELECT * FROM base_dic_drug_usage")
    List<BaseDicDrugUsageEntity> findUsage();

   @Select("SELECT * FROM base_accout WHERE phone_no LIKE '%${value}%' AND user_type = '1'")
    List<BaseAccoutEntity> findAll(String search);

   @Delete("DELETE FROM base_accout WHERE user_id = #{user}")
    void deleteDoctor(@Param("user")Integer user);

   @Update("UPDATE base_accout SET phone_no = #{phone} WHERE user_id = #{user}")
    void updateAccout(@Param("phone")String phone,@Param("user")Integer user);
    // 以下为模板
//    @Select("SELECT * FROM student WHERE id = #{id}")
//    Student findById(@Param("id") long id);
//
//    @Select("SELECT * FROM student ")
//    List<Student> queryAll();
//
//    @Delete("DELETE FROM student WHERE id = #{id}")
//    long deleteById(long id);
//
//    @Insert("INSERT INTO student(name,sex,email,identity,studentId,resume) VALUES(#{name},#{sex},#{email},#{identity},#{studentId},#{resume})")
//    void save(Student student);
//
//    @Select("SELECT * FROM student WHERE name = #{name}")
//    List<Student> findStudentByName(String searchValue);
//
//    @Update("UPDATE student SET name=#{name},email=#{email},resume=#{resume} WHERE id = #{id}")
//    long update(Student student);
}
