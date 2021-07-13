package com.example.demo.entity;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "base_diagnosis", schema = "doctor", catalog = "")
public class BaseDiagnosisEntity {
    private int diagnosisId; /**诊断标识*/
    private String diagnosisType; /**诊断类型，1西医，2中医*/
    private String diseasesCode; /**诊断类型为西医时为疾病代码，为中医时为中医疾病代码*/
    private int diseasesId; /**诊断类型为西医时为疾病标识，为中医时为中医疾病标识*/
    private String diseasesName; /**诊断类型为西医时为疾病名称，为中医时为中医疾病名称*/
    private String pinyinCode; /**拼音码*/

    @Id
    @Column(name = "diagnosis_id")
    public int getDiagnosisId() {
        return diagnosisId;
    }

    public void setDiagnosisId(int diagnosisId) {
        this.diagnosisId = diagnosisId;
    }

    @Basic
    @Column(name = "diagnosis_type")
    public String getDiagnosisType() {
        return diagnosisType;
    }

    public void setDiagnosisType(String diagnosisType) {
        this.diagnosisType = diagnosisType;
    }

    @Basic
    @Column(name = "diseases_code")
    public String getDiseasesCode() {
        return diseasesCode;
    }

    public void setDiseasesCode(String diseasesCode) {
        this.diseasesCode = diseasesCode;
    }

    @Basic
    @Column(name = "diseases_id")
    public int getDiseasesId() {
        return diseasesId;
    }

    public void setDiseasesId(int diseasesId) {
        this.diseasesId = diseasesId;
    }

    @Basic
    @Column(name = "diseases_name")
    public String getDiseasesName() {
        return diseasesName;
    }

    public void setDiseasesName(String diseasesName) {
        this.diseasesName = diseasesName;
    }

    @Basic
    @Column(name = "pinyin_code")
    public String getPinyinCode() {
        return pinyinCode;
    }

    public void setPinyinCode(String pinyinCode) {
        this.pinyinCode = pinyinCode;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BaseDiagnosisEntity that = (BaseDiagnosisEntity) o;
        return diagnosisId == that.diagnosisId && diseasesId == that.diseasesId && Objects.equals(diagnosisType, that.diagnosisType) && Objects.equals(diseasesCode, that.diseasesCode) && Objects.equals(diseasesName, that.diseasesName) && Objects.equals(pinyinCode, that.pinyinCode);
    }

    @Override
    public int hashCode() {
        return Objects.hash(diagnosisId, diagnosisType, diseasesCode, diseasesId, diseasesName, pinyinCode);
    }
}
