package com.example.demo.entity;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Objects;

@Entity
@Table(name = "consult_ask", schema = "doctor", catalog = "")
public class ConsultAskEntity {
    private String consultId; /**问诊id*/
    private String deptName; /**科室名称*/
    private String doctorId; /**医生id*/
    private String doctorName; /**医生姓名*/
    private String doctorLevelName; /**医生职称*/
    private String createUserId; /**操作用户id*/
    private String personName; /**配药人姓名*/
    private String personCardType; /**配药人证件类型，01居民身份证 02居民户口簿 03护照 04军官证 05驾驶证 06港澳居民来往内地通行证 07台湾居民来往内地通行证 11出生证明 12港澳居民身份证 13港澳居民居住证 99其他法定有效证件*/
    private String personCardId; /**配药人证件号码*/
    private String personGenderName; /**配药人性别，1男，2女*/
    private Timestamp personBirthDate; /**配药人出生日期*/
    private int personAge; /**配药人年龄*/
    private String personPhoneNo; /**配药人手机号码*/
    private String question; /**问题描述*/
    private String diagnosis; /**诊断小结*/
    private String drugIds; /**复诊提交药物id，用英文逗号分隔*/
    private String drugNames; /**复诊配药提交药物名称，用英文逗号分隔*/
    private String photoIds; /**问诊照片id，用英文逗号分隔*/
    private int consultStatus; /**复诊配药状态，1待接诊，2进行中，3已完成*/
    private Timestamp createTime; /**创建时间*/
    private Timestamp acceptTime; /**接诊时间*/
    private Timestamp finishTime; /**完成时间*/

    @Id
    @Column(name = "consult_id")
    public String getConsultId() {
        return consultId;
    }

    public void setConsultId(String consultId) {
        this.consultId = consultId;
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
    @Column(name = "doctor_level_name")
    public String getDoctorLevelName() {
        return doctorLevelName;
    }

    public void setDoctorLevelName(String doctorLevelName) {
        this.doctorLevelName = doctorLevelName;
    }

    @Basic
    @Column(name = "create_user_id")
    public String getCreateUserId() {
        return createUserId;
    }

    public void setCreateUserId(String createUserId) {
        this.createUserId = createUserId;
    }

    @Basic
    @Column(name = "person_name")
    public String getPersonName() {
        return personName;
    }

    public void setPersonName(String personName) {
        this.personName = personName;
    }

    @Basic
    @Column(name = "person_card_type")
    public String getPersonCardType() {
        return personCardType;
    }

    public void setPersonCardType(String personCardType) {
        this.personCardType = personCardType;
    }

    @Basic
    @Column(name = "person_card_id")
    public String getPersonCardId() {
        return personCardId;
    }

    public void setPersonCardId(String personCardId) {
        this.personCardId = personCardId;
    }

    @Basic
    @Column(name = "person_gender_name")
    public String getPersonGenderName() {
        return personGenderName;
    }

    public void setPersonGenderName(String personGenderName) {
        this.personGenderName = personGenderName;
    }

    @Basic
    @Column(name = "person_birth_date")
    public Timestamp getPersonBirthDate() {
        return personBirthDate;
    }

    public void setPersonBirthDate(Timestamp personBirthDate) {
        this.personBirthDate = personBirthDate;
    }

    @Basic
    @Column(name = "person_age")
    public int getPersonAge() {
        return personAge;
    }

    public void setPersonAge(int personAge) {
        this.personAge = personAge;
    }

    @Basic
    @Column(name = "person_phone_no")
    public String getPersonPhoneNo() {
        return personPhoneNo;
    }

    public void setPersonPhoneNo(String personPhoneNo) {
        this.personPhoneNo = personPhoneNo;
    }

    @Basic
    @Column(name = "question")
    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    @Basic
    @Column(name = "diagnosis")
    public String getDiagnosis() {
        return diagnosis;
    }

    public void setDiagnosis(String diagnosis) {
        this.diagnosis = diagnosis;
    }

    @Basic
    @Column(name = "drug_ids")
    public String getDrugIds() {
        return drugIds;
    }

    public void setDrugIds(String drugIds) {
        this.drugIds = drugIds;
    }

    @Basic
    @Column(name = "drug_names")
    public String getDrugNames() {
        return drugNames;
    }

    public void setDrugNames(String drugNames) {
        this.drugNames = drugNames;
    }

    @Basic
    @Column(name = "photo_ids")
    public String getPhotoIds() {
        return photoIds;
    }

    public void setPhotoIds(String photoIds) {
        this.photoIds = photoIds;
    }

    @Basic
    @Column(name = "consult_status")
    public int getConsultStatus() {
        return consultStatus;
    }

    public void setConsultStatus(int consultStatus) {
        this.consultStatus = consultStatus;
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
    @Column(name = "accept_time")
    public Timestamp getAcceptTime() {
        return acceptTime;
    }

    public void setAcceptTime(Timestamp acceptTime) {
        this.acceptTime = acceptTime;
    }

    @Basic
    @Column(name = "finish_time")
    public Timestamp getFinishTime() {
        return finishTime;
    }

    public void setFinishTime(Timestamp finishTime) {
        this.finishTime = finishTime;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ConsultAskEntity that = (ConsultAskEntity) o;
        return personAge == that.personAge && Objects.equals(consultId, that.consultId) &&  Objects.equals(deptName, that.deptName) && Objects.equals(doctorId, that.doctorId) && Objects.equals(doctorName, that.doctorName) && Objects.equals(doctorLevelName, that.doctorLevelName) && Objects.equals(createUserId, that.createUserId) && Objects.equals(personName, that.personName) && Objects.equals(personCardType, that.personCardType) && Objects.equals(personCardId, that.personCardId)  && Objects.equals(personGenderName, that.personGenderName) && Objects.equals(personBirthDate, that.personBirthDate) && Objects.equals(personPhoneNo, that.personPhoneNo) && Objects.equals(question, that.question) && Objects.equals(diagnosis, that.diagnosis) && Objects.equals(drugIds, that.drugIds) && Objects.equals(drugNames, that.drugNames) && Objects.equals(photoIds, that.photoIds) && Objects.equals(consultStatus, that.consultStatus) && Objects.equals(createTime, that.createTime) && Objects.equals(acceptTime, that.acceptTime) && Objects.equals(finishTime, that.finishTime);
    }

    @Override
    public int hashCode() {
        return Objects.hash(consultId, deptName, doctorId, doctorName, doctorLevelName, createUserId, personName, personCardType, personCardId,personGenderName, personBirthDate, personAge, personPhoneNo, question, diagnosis, drugIds, drugNames, photoIds, consultStatus, createTime, acceptTime, finishTime);
    }
}
