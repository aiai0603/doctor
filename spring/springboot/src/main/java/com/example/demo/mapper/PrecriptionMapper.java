package com.example.demo.mapper;

import com.example.demo.entity.PrescriptionDrugEntity;
import com.example.demo.entity.PrescriptionInfoEntity;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface PrecriptionMapper {

    /*@Select("SELECT * FROM prescription_info WHERE consult_id = #{consult} AND prescription_status = #{status}")
    List<PrescriptionInfoEntity> findByConsult(@Param("consult") Integer consult, @Param("status") String status);*/

    @Select("SELECT * FROM prescription_drug WHERE prescription_id = #{prescription}")
    List<PrescriptionDrugEntity> findDrugByPrescription(@Param("prescription")Integer prescription);

    @Update("UPDATE prescription_info SET prescription_status = 1 WHERE prescription_id = #{prescriptionId}")
    void submit(@Param("prescriptionId")Integer prescriptionId);

    @Delete("DELETE FROM prescription_info WHERE prescription_id = #{prescriptionId}")
    void deletePrescription(@Param("prescriptionId")Integer prescriptionId);

    @Delete("DELETE FROM prescription_drug WHERE prescription_drug_id = #{prescriptionDrug}")
    void deleteDrug(@Param("prescriptionDrug")Integer prescriptionDrug);

    @Select("SELECT * FROM prescription_info WHERE consult_id = #{consult} AND prescription_status = #{status}")
    List<PrescriptionInfoEntity> findByConsultStatus(@Param("consult")Integer consult,@Param("status") String status);

    @Select("SELECT * FROM prescription_info WHERE consult_id = #{consult} AND prescription_status = #{status}")
    List<PrescriptionInfoEntity> findByConsultDoctor(@Param("consult")Integer consult,
                                                     @Param("status")String status);

}
