package com.example.demo.entity;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Objects;

@Entity
@Table(name = "prescription_info", schema = "doctor", catalog = "")
public class PrescriptionInfoEntity {
    private String prescriptionId; /**处方id*/
    private String orgId; /**机构id*/
    private String userId; /**患者id*/
    private String consultId; /**问诊id*/
    private String prescriptionType; /**处方类型，1西药，2中成药，3中草药*/
    private String doctorId; /**开方医生id*/
    private String doctorName; /**开方医生姓名*/
    private Timestamp createTime; /**开方时间*/
    private String prescriptionStatus; /**处方提交状态，0未提交 ，1已提交 */

    @Id
    @Column(name = "prescription_id")
    public String getPrescriptionId() {
        return prescriptionId;
    }

    public void setPrescriptionId(String prescriptionId) {
        this.prescriptionId = prescriptionId;
    }

    @Basic
    @Column(name = "org_id")
    public String getOrgId() {
        return orgId;
    }

    public void setOrgId(String orgId) {
        this.orgId = orgId;
    }

    @Basic
    @Column(name = "user_id")
    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    @Basic
    @Column(name = "consult_id")
    public String getConsultId() {
        return consultId;
    }

    public void setConsultId(String consultId) {
        this.consultId = consultId;
    }

    @Basic
    @Column(name = "prescription_type")
    public String getPrescriptionType() {
        return prescriptionType;
    }

    public void setPrescriptionType(String prescriptionType) {
        this.prescriptionType = prescriptionType;
    }

    @Basic
    @Column(name = "doctor_id")
    public String getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(String doctorId) {
        this.doctorId = doctorId;
    }

    @Basic
    @Column(name = "doctor_name")
    public String getDoctorName() {
        return doctorName;
    }

    public void setDoctorName(String doctorName) {
        this.doctorName = doctorName;
    }

    @Basic
    @Column(name = "create_time")
    public Timestamp getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Timestamp createTime) {
        this.createTime = createTime;
    }

    @Basic
    @Column(name = "prescription_status")
    public String getPrescriptionStatus() {
        return prescriptionStatus;
    }

    public void setPrescriptionStatus(String prescriptionStatus) {
        this.prescriptionStatus = prescriptionStatus;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PrescriptionInfoEntity that = (PrescriptionInfoEntity) o;
        return Objects.equals(prescriptionId, that.prescriptionId) && Objects.equals(orgId, that.orgId) && Objects.equals(userId, that.userId) && Objects.equals(consultId, that.consultId) && Objects.equals(prescriptionType, that.prescriptionType) && Objects.equals(doctorId, that.doctorId) && Objects.equals(doctorName, that.doctorName) && Objects.equals(createTime, that.createTime) && Objects.equals(prescriptionStatus, that.prescriptionStatus);
    }

    @Override
    public int hashCode() {
        return Objects.hash(prescriptionId, orgId, userId, consultId, prescriptionType, doctorId, doctorName, createTime, prescriptionStatus);
    }
}
