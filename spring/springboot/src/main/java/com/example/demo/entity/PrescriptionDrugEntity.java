package com.example.demo.entity;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Objects;

@Entity
@Table(name = "prescription_drug", schema = "doctor", catalog = "")
public class PrescriptionDrugEntity {
    private int prescriptionDrugId;
    private int prescriptionId;
    private int drugId;
    private String drugName;
    private String specification;
    private BigDecimal dose;
    private String doseUnit;
    private Integer frequencyCode;
    private String frequencyName;
    private Integer usageCode;
    private String usageName;
    private Integer takeDays;
    private BigDecimal quantity;
    private BigDecimal price;
    private String packUnit;
    private Integer groupNumber;
    private Integer sortNumber;
    private String remark;

    @Id
    @Column(name = "prescription_drug_id")
    public int getPrescriptionDrugId() {
        return prescriptionDrugId;
    }

    public void setPrescriptionDrugId(int prescriptionDrugId) {
        this.prescriptionDrugId = prescriptionDrugId;
    }

    @Basic
    @Column(name = "prescription_id")
    public int getPrescriptionId() {
        return prescriptionId;
    }

    public void setPrescriptionId(int prescriptionId) {
        this.prescriptionId = prescriptionId;
    }

    @Basic
    @Column(name = "drug_id")
    public Integer getDrugId() {
        return drugId;
    }

    public void setDrugId(Integer drugId) {
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
    @Column(name = "specification")
    public String getSpecification() {
        return specification;
    }

    public void setSpecification(String specification) {
        this.specification = specification;
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
    @Column(name = "frequency_code")
    public Integer getFrequencyCode() {
        return frequencyCode;
    }

    public void setFrequencyCode(Integer frequencyCode) {
        this.frequencyCode = frequencyCode;
    }

    @Basic
    @Column(name = "frequency_name")
    public String getFrequencyName() {
        return frequencyName;
    }

    public void setFrequencyName(String frequencyName) {
        this.frequencyName = frequencyName;
    }

    @Basic
    @Column(name = "usage_code")
    public Integer getUsageCode() {
        return usageCode;
    }

    public void setUsageCode(Integer usageCode) {
        this.usageCode = usageCode;
    }

    @Basic
    @Column(name = "usage_name")
    public String getUsageName() {
        return usageName;
    }

    public void setUsageName(String usageName) {
        this.usageName = usageName;
    }

    @Basic
    @Column(name = "take_days")
    public Integer getTakeDays() {
        return takeDays;
    }

    public void setTakeDays(Integer takeDays) {
        this.takeDays = takeDays;
    }

    @Basic
    @Column(name = "quantity")
    public BigDecimal getQuantity() {
        return quantity;
    }

    public void setQuantity(BigDecimal quantity) {
        this.quantity = quantity;
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
    @Column(name = "pack_unit")
    public String getPackUnit() {
        return packUnit;
    }

    public void setPackUnit(String packUnit) {
        this.packUnit = packUnit;
    }

    @Basic
    @Column(name = "group_number")
    public Integer getGroupNumber() {
        return groupNumber;
    }

    public void setGroupNumber(Integer groupNumber) {
        this.groupNumber = groupNumber;
    }

    @Basic
    @Column(name = "sort_number")
    public Integer getSortNumber() {
        return sortNumber;
    }

    public void setSortNumber(Integer sortNumber) {
        this.sortNumber = sortNumber;
    }

    @Basic
    @Column(name = "remark")
    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PrescriptionDrugEntity that = (PrescriptionDrugEntity) o;
        return Objects.equals(prescriptionDrugId, that.prescriptionDrugId)&& Objects.equals(prescriptionId, that.prescriptionId) && Objects.equals(drugId, that.drugId) && Objects.equals(drugName, that.drugName) && Objects.equals(specification, that.specification) && Objects.equals(dose, that.dose) && Objects.equals(doseUnit, that.doseUnit) && Objects.equals(frequencyCode, that.frequencyCode) && Objects.equals(frequencyName, that.frequencyName) && Objects.equals(usageCode, that.usageCode) && Objects.equals(usageName, that.usageName) && Objects.equals(takeDays, that.takeDays) && Objects.equals(quantity, that.quantity) && Objects.equals(price, that.price) && Objects.equals(packUnit, that.packUnit) && Objects.equals(groupNumber, that.groupNumber) && Objects.equals(sortNumber, that.sortNumber) && Objects.equals(remark, that.remark);
    }

    @Override
    public int hashCode() {
        return Objects.hash(prescriptionDrugId,prescriptionId, drugId, drugName, specification, dose, doseUnit, frequencyCode, frequencyName, usageCode, usageName, takeDays, quantity, price, packUnit, groupNumber, sortNumber, remark);
    }
}
