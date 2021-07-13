package com.example.demo.entity;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "base_dic_drug_frequency", schema = "doctor", catalog = "")
public class BaseDicDrugFrequencyEntity {
    private int itemCode; /**服用方式id*/
    private String itemName; /**服用频次*/
    private String itemNameAbbr; /**缩写*/

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

    @Basic
    @Column(name = "item_name_abbr")
    public String getItemNameAbbr() {
        return itemNameAbbr;
    }

    public void setItemNameAbbr(String itemNameAbbr) {
        this.itemNameAbbr = itemNameAbbr;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BaseDicDrugFrequencyEntity that = (BaseDicDrugFrequencyEntity) o;
        return itemCode == that.itemCode && Objects.equals(itemName, that.itemName) && Objects.equals(itemNameAbbr, that.itemNameAbbr);
    }

    @Override
    public int hashCode() {
        return Objects.hash(itemCode, itemName, itemNameAbbr);
    }
}
