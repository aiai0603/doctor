package com.example.demo.entity;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "base_dic_drug_usage", schema = "doctor", catalog = "")
public class BaseDicDrugUsageEntity {
    private int itemCode; /**服用方式id*/
    private String itemName; /**服用方式*/

    @Id
    @Column(name = "item_code")
    public int getItemCode() {
        return itemCode;
    }

    public void setItemCode(int itemCode) {
        this.itemCode = itemCode;
    }

    @Basic
    @Column(name = "item_name")
    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BaseDicDrugUsageEntity that = (BaseDicDrugUsageEntity) o;
        return itemCode == that.itemCode && Objects.equals(itemName, that.itemName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(itemCode, itemName);
    }
}
