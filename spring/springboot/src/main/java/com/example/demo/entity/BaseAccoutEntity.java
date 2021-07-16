package com.example.demo.entity;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Objects;

@Entity
@Table(name = "base_accout", schema = "doctor")
public class BaseAccoutEntity {
    private int userId;  /** 用户id*/
    private String userType;  /** 用户类型，1居民，2医生*/
    private String miniOpenId;  /** 微信小程序openid*/
    private String phoneNo; /**手机号码*/
    private Timestamp createTime; /**创建时间*/

    @Id
    @Column(name = "user_id")
    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    @Basic
    @Column(name = "user_type")
    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }

    @Basic
    @Column(name = "mini_open_id")
    public String getMiniOpenId() {
        return miniOpenId;
    }

    public void setMiniOpenId(String miniOpenId) {
        this.miniOpenId = miniOpenId;
    }

    @Basic
    @Column(name = "phone_no")
    public String getPhoneNo() {
        return phoneNo;
    }

    public void setPhoneNo(String phoneNo) {
        this.phoneNo = phoneNo;
    }

    @Basic
    @Column(name = "create_time")
    public Timestamp getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Timestamp createTime) {
        this.createTime = createTime;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BaseAccoutEntity that = (BaseAccoutEntity) o;
        return Objects.equals(userId, that.userId) && Objects.equals(userType, that.userType) && Objects.equals(miniOpenId, that.miniOpenId) && Objects.equals(phoneNo, that.phoneNo) && Objects.equals(createTime, that.createTime);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, userType, miniOpenId, phoneNo, createTime);
    }
}
