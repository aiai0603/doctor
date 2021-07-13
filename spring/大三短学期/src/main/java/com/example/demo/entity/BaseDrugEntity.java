package com.example.demo.entity;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Objects;

@Entity
@Table(name = "base_drug", schema = "doctor", catalog = "")
public class BaseDrugEntity {
    private int drugId; /**药品id*/
    private String drugName; /**药品通用名称*/
    private String tradeName; /**商品名*/
    private String pinyinCode; /**拼音码*/
    private String specification; /**药品规格*/
    private String packUnit; /**包装单位*/
    private BigDecimal price; /**药品价格*/
    private BigDecimal dose; /**剂量*/
    private String doseUnit; /**剂量单位*/
    private String factoryName; /**产地*/
    private String approvalNumber; /**批准文号*/

    @Id
    @Column(name = "drug_id")
    public int getDrugId() {
        return drugId;
    }

    public void setDrugId(int drugId) {
        this.drugId = drugId;
    }

    @Basic
    @Column(name = "drug_name")
    public String getDrugName() {
        return drugName;
    }

    public void setDrugName(String drugName) {
        this.drugName = drugName;
    }

    @Basic
    @Column(name = "trade_name")
    public String getTradeName() {
        return tradeName;
    }

    public void setTradeName(String tradeName) {
        this.tradeName = tradeName;
    }

    @Basic
    @Column(name = "pinyin_code")
    public String getPinyinCode() {
        return pinyinCode;
    }

    public void setPinyinCode(String pinyinCode) {
        this.pinyinCode = pinyinCode;
    }

    @Basic
    @Column(name = "specification")
    public String getSpecification() {
        return specification;
    }

    public void setSpecification(String specification) {
        this.specification = specification;
    }

    @Basic
    @Column(name = "pack_unit")
    public String getPackUnit() {
        return packUnit;
    }

    public void setPackUnit(String packUnit) {
        this.packUnit = packUnit;
    }

    @Basic
    @Column(name = "price")
    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    @Basic
    @Column(name = "dose")
    public BigDecimal getDose() {
        return dose;
    }

    public void setDose(BigDecimal dose) {
        this.dose = dose;
    }

    @Basic
    @Column(name = "dose_unit")
    public String getDoseUnit() {
        return doseUnit;
    }

    public void setDoseUnit(String doseUnit) {
        this.doseUnit = doseUnit;
    }

    @Basic
    @Column(name = "factory_name")
    public String getFactoryName() {
        return factoryName;
    }

    public void setFactoryName(String factoryName) {
        this.factoryName = factoryName;
    }

    @Basic
    @Column(name = "approval_number")
    public String getApprovalNumber() {
        return approvalNumber;
    }

    public void setApprovalNumber(String approvalNumber) {
        this.approvalNumber = approvalNumber;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BaseDrugEntity that = (BaseDrugEntity) o;
        return drugId == that.drugId && Objects.equals(drugName, that.drugName) && Objects.equals(tradeName, that.tradeName) && Objects.equals(pinyinCode, that.pinyinCode) && Objects.equals(specification, that.specification) && Objects.equals(packUnit, that.packUnit) && Objects.equals(price, that.price) && Objects.equals(dose, that.dose) && Objects.equals(doseUnit, that.doseUnit) && Objects.equals(factoryName, that.factoryName) && Objects.equals(approvalNumber, that.approvalNumber);
    }

    @Override
    public int hashCode() {
        return Objects.hash(drugId, drugName, tradeName, pinyinCode, specification, packUnit, price, dose, doseUnit, factoryName, approvalNumber);
    }
}
