package com.example.demo.entity;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "base_doctor", schema = "doctor", catalog = "")
public class BaseDoctorEntity {
    private int userId;
    private int doctorId; /**医生id*/
    private String doctorName; /**医生姓名*/
    private String deptName; /**科室名称*/
    private String avatarUrl; /**医生头像链接*/
    private String levelCode; /**医生职称，1主任医师，2副主任医师，3主治医师，4医师，5医士*/
    private String levelName; /**医生职称，1主任医师，2副主任医师，3主治医师，4医师，5医士*/

    @Id
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
    @Column(name = "dept_name")
    public String getDeptName() {
        return deptName;
    }

    public void setDeptName(String deptName) {
        this.deptName = deptName;
    }

    @Basic
    @Column(name = "avatar_url")
    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    @Basic
    @Column(name = "level_code")
    public String getLevelCode() {
        return levelCode;
    }

    public void setLevelCode(String levelCode) {
        this.levelCode = levelCode;
    }

    @Basic
    @Column(name = "level_name")
    public String getLevelName() {
        return levelName;
    }

    public void setLevelName(String levelName) {
        this.levelName = levelName;
    }

    @Basic
    @Column(name = "user_id")
    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BaseDoctorEntity that = (BaseDoctorEntity) o;
        return Objects.equals(doctorId, that.doctorId) && Objects.equals(doctorName, that.doctorName) && Objects.equals(deptName, that.deptName) && Objects.equals(avatarUrl, that.avatarUrl) && Objects.equals(levelCode, that.levelCode) && Objects.equals(levelName, that.levelName) && Objects.equals(doctorId, that.doctorId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(doctorId, doctorName, deptName, avatarUrl, levelCode, levelName,userId);
    }
}
