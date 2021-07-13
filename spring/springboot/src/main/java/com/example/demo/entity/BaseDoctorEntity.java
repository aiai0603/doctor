package com.example.demo.entity;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "base_doctor", schema = "doctor", catalog = "")
public class BaseDoctorEntity {
    private String doctorId; /**医生id*/
    private String doctorName; /**医生姓名*/
    private String orgId;  /**机构id*/
    private String orgName; /**机构名称*/
    private String deptId; /**科室id*/
    private String deptName; /**科室名称*/
    private String avatarUrl; /**医生头像链接*/
    private String levelCode; /**医生职称，1主任医师，2副主任医师，3主治医师，4医师，5医士*/
    private String levelName; /**医生职称，1主任医师，2副主任医师，3主治医师，4医师，5医士*/

    @Id
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
    @Column(name = "org_id")
    public String getOrgId() {
        return orgId;
    }

    public void setOrgId(String orgId) {
        this.orgId = orgId;
    }

    @Basic
    @Column(name = "org_name")
    public String getOrgName() {
        return orgName;
    }

    public void setOrgName(String orgName) {
        this.orgName = orgName;
    }

    @Basic
    @Column(name = "dept_id")
    public String getDeptId() {
        return deptId;
    }

    public void setDeptId(String deptId) {
        this.deptId = deptId;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BaseDoctorEntity that = (BaseDoctorEntity) o;
        return Objects.equals(doctorId, that.doctorId) && Objects.equals(doctorName, that.doctorName) && Objects.equals(orgId, that.orgId) && Objects.equals(orgName, that.orgName) && Objects.equals(deptId, that.deptId) && Objects.equals(deptName, that.deptName) && Objects.equals(avatarUrl, that.avatarUrl) && Objects.equals(levelCode, that.levelCode) && Objects.equals(levelName, that.levelName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(doctorId, doctorName, orgId, orgName, deptId, deptName, avatarUrl, levelCode, levelName);
    }
}
