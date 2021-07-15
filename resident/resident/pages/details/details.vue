<template>
	<view>
		<u-navbar
		    height="65"
			title="复诊配药详情"
			title-color="#fff"
			back-icon-color="#fff"
			:background="background">
		</u-navbar>
		
		<!--表单-->
		<u-form :model="form" ref="uForm" label-width="200" :label-style="labelStyle">
			<view class="doctor" :style="{ height: form.doctorId ? '200rpx': ''}">
				<u-form-item label="诊断医生" prop="doctor" :required="true" :border-bottom="false" v-if="!form.doctorId" style="width: 100%;">
					<u-section 
					    title="" 
						sub-title="选择医生" 
						:showLine="false"
						slot="right"
						style="margin-right: 30rpx;"></u-section>
			    </u-form-item>
				<view class="doctor-info" v-else>
					<view style="display: flex;">
						<u-avatar size="150"></u-avatar>
						<view style="margin-left: 20rpx; height: 120rpx;">
							<view style="display: flex; margin-top: 10rpx;">
								<span style="font-weight: 700; font-size: 38rpx;">方红全</span>
								<u-tag type="warning" text="主任医师" shape="circle" style="margin-left: 15rpx;"></u-tag>
							</view>
							<view style="margin-top: 30rpx;">呼吸内科</view>
						</view>
					</view>
					<view style="color: #ccc; float: right;">
						更换医生
						<u-icon name="arrow-right"></u-icon>
					</view>
				</view>
			</view>
			
			<u-gap height="20" bg-color="#f2f2f2"></u-gap>
			
			<u-form-item label="问诊人" prop="patient" :required="true">
				<view style="margin-right: 30rpx;" slot="right" v-if="!form.patientInfo.name" @click="showInfo = true;">
					填写信息
					<u-icon name="arrow-right"></u-icon>
				</view>
				<view v-else style="margin-right: 30rpx; color: #000;" slot="right" @click="showInfo = true;">{{ form.patientInfo.name }}&nbsp;{{ form.patientInfo.sex }}&nbsp;{{ form.patientInfo.age }}</view>
			</u-form-item>
			<u-form-item label="确诊诊断" prop="diagnosis" :required="true">
				<view style="margin-right: 30rpx;" slot="right" v-if="!form.diagnosis">
					选择诊断
					<u-icon name="arrow-right"></u-icon>
				</view>
				<view v-else style="margin-right: 30rpx; color: #000;" slot="right">霍乱</view>
			</u-form-item>
			<u-form-item label="所需药品" prop="drug" :border-bottom="false" :required="true">
				<view style="margin-right: 30rpx;" slot="right">
					添加药品
					<u-icon name="arrow-right"></u-icon>
				</view>
			</u-form-item>
			<view v-if="form.drug.length != 0" class="drug">
				<block v-for="item in form.drug">
					<u-tag type="success" :text="item" style="margin: 20rpx 25rpx;" :closeable="true"></u-tag>
				</block>
			</view>
			
			<u-gap height="20" bg-color="#f2f2f2"></u-gap>
			
			<view style="display: flex; align-items: center; width: 100%;">
				<view class="title-item"></view>
				<u-form-item label="病情描述" prop="describe" style="width: 100%;" :required="true"></u-form-item>
			</view>
			<view style="width: 100%; display: flex; justify-content: center;">
				<view style="width: 90%;">
					<u-input type="textarea" :autoHeight="true" v-model="form.value" placeholder="请准确描述病情,以便医生更好判断(不少于5个字)"></u-input>
				</view>
			</view>
			
			<u-gap height="20" bg-color="#f2f2f2"></u-gap>
			
			<view style="display: flex; align-items: center; width: 100%;">
				<view class="title-item"></view>
				<u-form-item label="病情照片" prop="photo" style="width: 100%" ></u-form-item>
			</view>
			<view style="width: 100%; display: flex; align-items: center; margin-top: 30rpx; flex-direction: column;">
				<view style="width: 90%;">
					<u-upload :auto-upload="false"></u-upload>
				</view>
				<view style="width: 85%; margin-top: 60rpx; color: #ccc; margin-bottom: 80rpx;">
					<text space="emsp">
					    {{ text }}
					</text>
				</view>
			</view>
		</u-form>
		
		<u-button type="success" style="height: 100rpx;">提交</u-button>
		
		<!--信息弹出层-->
		<u-popup v-model="showInfo" mode="center" width="90%" height="55%" border-radius="20">
			<view class="infoForm">
				<h3 style="margin: 30rpx 0;">填写信息</h3>
				<u-form :model="form.patientInfo" ref="infoFrom" label-align="left" label-width="200" :label-style="labelStyle">
					<u-form-item label="姓名" :required="true" :border-bottom="false">
						<u-input v-model="form.patientInfo.name" :border="true" class="form-item" :clearable="false" placeholder="请填写姓名"></u-input>
					</u-form-item>
					<u-form-item label="身份证号" :required="true" :border-bottom="false">
						<u-input v-model="form.patientInfo.id" :border="true" class="form-item" :clearable="false" placeholder="请填写身份证号"></u-input>
					</u-form-item>
					<u-form-item label="性别" :required="true" :border-bottom="false">
						<u-input type="select" v-model="form.patientInfo.sex" :border="true" class="form-item" placeholder="请选择性别" @click="showSex = true"></u-input>
						<u-picker v-model="showSex" mode="selector" :default-selector="[0]" :range="selectorSex" @confirm="confirmSex"></u-picker>
					</u-form-item>
					<u-form-item label="出生日期" :required="true" :border-bottom="false">
						<u-input type="select" v-model="form.patientInfo.birthday" :border="true" class="form-item" placeholder="请填写出生日期" @click="showBirthday = true"></u-input>
						<u-picker v-model="showBirthday" mode="time" @confirm="confirmBirthday"></u-picker>
					</u-form-item>
					<u-form-item label="手机号" :required="true" :border-bottom="false">
						<u-input type="number" v-model="form.patientInfo.phone" :border="true" class="form-item" :clearable="false" placeholder="请填写手机号"></u-input>
					</u-form-item>
				</u-form>
				<u-button type="primary" style="margin-top: 50rpx;" @click="saveInfo()">保存</u-button>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import { getAge } from '../../utils/age.js'
	
	export default {
		data() {
			return {
				showInfo: false,
				showSex: false,
				showBirthday: false,
				background: {
					backgroundColor: '#0a88df',
				},
				labelStyle: {
					fontSize: '30rpx',
					marginLeft: '40rpx'
				},
				form: {
					doctorId: '0',
					patientInfo: {
						name: '',
						id: '',
						sex: '',
						age: '',
						birthday: '',
						phone: ''
					},
					diagnosis: '霍乱',
					drug: ["甘草"],
					value: ''
				},
				text: '  请上传病情照片、化验单、检查资料、报告单、药品处方单,若为皮肤问题,建议对准患处拍摄。照片仅自己和医生可见',
				selectorSex: ['男', '女']
			}
		},
		methods: {
			confirmSex (index) {
				this.form.patientInfo.sex = this.selectorSex[index]
			},
			confirmBirthday (e) {
				this.form.patientInfo.birthday = e.year + '-' + e.month + '-' + e.day
				this.form.patientInfo.age = getAge(e.year, e.month, e.day)
			},
			saveInfo () {
				var NameReg = /^[\u4e00-\u9fa5]{2,6}(·|•|‧|•|⋅|ㆍ|・|●|[\u4e00-\u9fa5]{1,6}){0,2}$/;
				var IdReg =/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/;
                var PhoneReg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
				
				if(!NameReg.test(this.form.patientInfo.name)) {
					uni.showToast({
						icon: 'none',
						title: '请输入正确的姓名',
						duration: 2000
					})
				} else if (!IdReg.test(this.form.patientInfo.id)) {
					uni.showToast({
						icon: 'none',
						title: '请输入正确的身份证号',
						duration: 2000
					})
				} else if (!this.form.patientInfo.sex) {
					uni.showToast({
						icon: 'none',
						title: '请选择性别',
						duration: 2000
					})
				} else if (!this.form.patientInfo.birthday) {
					uni.showToast({
						icon: 'none',
						title: '请选择出生日期',
						duration: 2000
					})
				} else if (!PhoneReg.test(this.form.patientInfo.phone)) {
					uni.showToast({
						icon: 'none',
						title: '请输入正确的手机号',
						duration: 2000
					})
				} else {
					this.showInfo = true
				}
				
			}
		},
	}
</script>

<style>
	.doctor {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
	}
	
	.doctor>.doctor-info {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 90%;
		width: 95%;
	}
	
	.drug {
		display: flex;
		flex-wrap: wrap;
	}
	
	.title-item {
		margin-left: 10rpx;
		width: 10rpx;
		height: 32rpx;
		border-radius: 10px;
		background: #21bd64;
	}
	
	/deep/.u-form-item--left__content--required {
		position: relative;
		left: 0;
		margin-left: 40rpx;
	}
	
	.infoForm {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		height: 100%;
	}
	
	.form-item {
		margin-left: 20rpx;
	}

	
</style>
