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
				<u-form-item label="诊断医生" prop="doctor" :required="true" :border-bottom="false" v-if="!form.doctor.name" style="width: 100%;">
					<u-section 
					    title="" 
						sub-title="选择医生" 
						:showLine="false"
						slot="right"
						style="margin-right: 30rpx;"
						@click="chooseDoc()"></u-section>
			    </u-form-item>
				<view class="doctor-info" v-else>
					<view style="display: flex; flex-direction: row;">
						<u-avatar size="150" :src="form.doctor.avatar"></u-avatar>
						<view style="margin-left: 20rpx; height: 120rpx;">
							<view style="display: flex; margin-top: 10rpx; flex-direction: row;">
								<span style="font-weight: 700; font-size: 38rpx;">{{ form.doctor.name }}</span>
								<u-tag type="warning" :text="form.doctor.level" shape="circle" class="tag"></u-tag>
							</view>
							<view style="margin-top: 30rpx;">{{ form.doctor.dept }}</view>
						</view>
					</view>
					<view style="color: #ccc; float: right;">
						更换医生
						<u-icon name="arrow-right" @click="chooseDoc()"></u-icon>
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
				<view style="margin-right: 30rpx;" slot="right" v-if="!form.diagnosis" @click="chooseDi()">
					选择诊断
					<u-icon name="arrow-right"></u-icon>
				</view>
				<view v-else style="margin-right: 30rpx; color: #000;" slot="right" @click="chooseDi()">{{ form.diagnosis }}</view>
			</u-form-item>
			<u-form-item label="所需药品" prop="drug" :border-bottom="false" :required="true">
				<view style="margin-right: 30rpx;" slot="right" @click="addMedicine()">
					添加药品
					<u-icon name="arrow-right"></u-icon>
				</view>
			</u-form-item>
			<view v-if="form.drugList.length != 0" class="drug">
				<block v-for="(item, index) in form.drugList">
					<u-tag type="success" :text="item" style="margin: 20rpx 25rpx;" :closeable="true" @close="delTag(index)"></u-tag>
				</block>
			</view>
			
			<u-gap height="20" bg-color="#f2f2f2"></u-gap>
			
			<view style="display: flex; align-items: center; width: 100%; flex-direction: row;">
				<view class="title-item"></view>
				<u-form-item label="病情描述" prop="describe" style="width: 100%;" :required="true"></u-form-item>
			</view>
			<view style="width: 100%; display: flex; justify-content: center; flex-direction: row;">
				<view style="width: 90%;">
					<u-input type="textarea" :autoHeight="true" v-model="form.value" placeholder="请准确描述病情,以便医生更好判断(不少于5个字)"></u-input>
				</view>
			</view>
			
			<u-gap height="20" bg-color="#f2f2f2"></u-gap>
			
			<view style="display: flex; align-items: center; width: 100%; flex-direction: row;">
				<view class="title-item"></view>
				<u-form-item label="病情照片" prop="photo" style="width: 100%" ></u-form-item>
			</view>
			<view style="width: 100%; display: flex; align-items: center; margin-top: 30rpx; flex-direction: column;">
				<view style="width: 90%;">
					<u-upload ref="uUpload" :auto-upload="false" :action="action"></u-upload>
				</view>
				<view style="width: 85%; margin-top: 60rpx; color: #ccc; margin-bottom: 80rpx;">
					<text space="emsp">
					    {{ text }}
					</text>
				</view>
			</view>
		</u-form>
		
		<u-button type="success" style="height: 100rpx;" @click="submit()">提交</u-button>
		
		<!--信息弹出层-->
		<u-popup v-model="showInfo" mode="center" width="90%" height="55%" border-radius="20" :closeable="true">
			<view class="infoForm">
				<h3 style="margin: 30rpx 0;">填写信息</h3>
				<u-form :model="popupform" ref="infoFrom" label-align="left" label-width="200" :label-style="labelStyle">
					<u-form-item label="姓名" :required="true" :border-bottom="false">
						<u-input v-model="popupform.name" :border="true" class="form-item" :clearable="false" placeholder="请填写姓名"></u-input>
					</u-form-item>
					<u-form-item label="身份证号" :required="true" :border-bottom="false">
						<u-input v-model="popupform.id" :border="true" class="form-item" :clearable="false" placeholder="请填写身份证号"></u-input>
					</u-form-item>
					<u-form-item label="性别" :required="true" :border-bottom="false">
						<u-input type="select" v-model="popupform.sex" :border="true" class="form-item" placeholder="请选择性别" @click="showSex = true"></u-input>
						<u-picker v-model="showSex" mode="selector" :default-selector="[0]" :range="selectorSex" @confirm="confirmSex"></u-picker>
					</u-form-item>
					<u-form-item label="出生日期" :required="true" :border-bottom="false">
						<u-input type="select" v-model="popupform.birthday" :border="true" class="form-item" placeholder="请填写出生日期" @click="showBirthday = true"></u-input>
						<u-picker v-model="showBirthday" mode="time" @confirm="confirmBirthday"></u-picker>
					</u-form-item>
					<u-form-item label="手机号" :required="true" :border-bottom="false">
						<u-input type="number" v-model="popupform.phone" :border="true" class="form-item" :clearable="false" placeholder="请填写手机号"></u-input>
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
					doctor: {
						avatar: '',
						name: '',
						level: '',
						dept: ''
					},
					patientInfo: {
						name: '',
						id: '',
						sex: '',
						age: '',
						birthday: '',
						phone: ''
					},
					diagnosis: '',
					drugList: [],
					value: ''
				},
				popupform: {
					name: '',
					id: '',
					sex: '',
					age: '',
					birthday: '',
					phone: ''
				},
				text: '  请上传病情照片、化验单、检查资料、报告单、药品处方单,若为皮肤问题,建议对准患处拍摄。照片仅自己和医生可见',
				selectorSex: ['男', '女'],
				action: 'http://47.97.158.11:8088/consult/addPhoto'
			}
		},
		methods: {
			confirmSex (index) {
				this.popupform.sex = this.selectorSex[index]
			},
			confirmBirthday (e) {
				this.popupform.birthday = e.year + '-' + e.month + '-' + e.day
				this.popupform.age = getAge(e.year, e.month, e.day)
			},
			saveInfo () {
				var NameReg = /^[\u4e00-\u9fa5]{2,6}((·|•|‧|•|⋅|ㆍ|・|●)[\u4e00-\u9fa5]{1,6}){0,2}$/;
				var IdReg =/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/;
                var PhoneReg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
				
				if(!NameReg.test(this.popupform.name)) {
					uni.showToast({
						icon: 'none',
						title: '请输入正确的姓名',
						duration: 2000
					})
				} else if (!IdReg.test(this.popupform.id)) {
					uni.showToast({
						icon: 'none',
						title: '请输入正确的身份证号',
						duration: 2000
					})
				} else if (!this.popupform.sex) {
					uni.showToast({
						icon: 'none',
						title: '请选择性别',
						duration: 2000
					})
				} else if (!this.popupform.birthday) {
					uni.showToast({
						icon: 'none',
						title: '请选择出生日期',
						duration: 2000
					})
				} else if (!PhoneReg.test(this.popupform.phone)) {
					uni.showToast({
						icon: 'none',
						title: '请输入正确的手机号',
						duration: 2000
					})
				} else {
					this.form.patientInfo = JSON.parse(JSON.stringify(this.popupform)) /*深拷贝*/
					this.showInfo = false
				}
			},
			addMedicine () {
				uni.navigateTo({
					url: '../medicine/medicine'
				})
			},
			chooseDoc () {
				uni.navigateTo({
					url: '../doctorList/doctorList'
				})
			},
			chooseDi () {
				uni.navigateTo({
					url: '../diagnosis/diagnosis'
				})
			},
			delTag (index) {
				this.form.drugList.splice(index, 1)
			},
			submit () {
				let files = [];
				console.log(this.$refs.uUpload.lists)
				files = this.$refs.uUpload.lists.filter(val => {
					return val.progress == 100;
				})
				this.$refs.uUpload.upload();
				console.log(files)
			}
		},
	}
</script>

<style>
	.doctor {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 100%;
	}
	
	.doctor>.doctor-info {
		position: relative;
		display: flex;
		flex-direction: row;
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
	
	.tag {
		margin-top: 10rpx;
		margin-left: 15rpx; 
		height: 45rpx;
		width: 130rpx;
	}

	
</style>
