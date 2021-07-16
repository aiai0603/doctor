package com.example.demo.entity;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Objects;

@Entity
@Table(name = "prescription_info", schema = "doctor", catalog = "")
public class PrescriptionInfoEntity {
    private int prescriptionId;
    private int userId;
    private int consultId;
    private String prescriptionType;
    private int doctorId;
    private String doctorName;
    private Timestamp createTime;
    private String prescriptionStatus;


    @Id
    @Column(name = "prescription_id")
    public int getPrescriptionId() {
        return prescriptionId;
    }

    public void setPrescriptionId(int prescriptionId) {
        this.prescriptionId = prescriptionId;
    }

    @Basic
    @Column(name = "user_id")
    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    @Basic
    @Column(name = "consult_id")
    public int getConsultId() {
        return consultId;
    }

    public void setConsultId(int consultId) {
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
    public int getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(int doctorId) {
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
        return Objects.equals(prescriptionId, that.prescriptionId) && Objects.equals(userId, that.userId) && Objects.equals(consultId, that.consultId) && Objects.equals(prescriptionType, that.prescriptionType) && Objects.equals(doctorId, that.doctorId) && Objects.equals(doctorName, that.doctorName) && Objects.equals(createTime, that.createTime) && Objects.equals(prescriptionStatus, that.prescriptionStatus);
    }

    @Override
    public int hashCode() {
        return Objects.hash(prescriptionId,userId, consultId, prescriptionType, doctorId, doctorName, createTime, prescriptionStatus);
    }
}
