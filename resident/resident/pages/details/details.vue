<template>
	<view>
		<u-navbar
		    height="65"
			title="复诊配药详情"
			title-color="#fff"
			back-icon-color="#fff"
			:background="background">
		</u-navbar>
		
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
				<view style="margin-right: 30rpx;" slot="right" v-if="!form.patientInfo">
					填写信息
					<u-icon name="arrow-right"></u-icon>
				</view>
				<view v-else style="margin-right: 30rpx; color: #000;" slot="right">张伟&nbsp;男&nbsp;36岁</view>
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
				<u-form-item label="病情照片" prop="photo" style="width: 100%; margin-left: 20rpx;" ></u-form-item>
			</view>
			<view style="width: 100%; display: flex; justify-content: center; margin-top: 30rpx;">
				<view style="width: 90%;">
					<u-upload :auto-upload="false"></u-upload>
				</view>
			</view>
		</u-form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: {
					backgroundColor: '#0a88df',
					
				},
				labelStyle: {
					fontSize: '30rpx',
					marginLeft: '10rpx'
				},
				form: {
					doctorId: '',
					patientInfo: {},
					diagnosis: '霍乱',
					drug: ["甘草"],
					value: ''
				},
				
			}
		},
		methods: {
			
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
		margin-left: 20rpx;
	}
	
</style>
