<template>
	<view class="index">
		<u-navbar
		    height="55"
			title="首页"
			title-color="#fff"
			:background="background"
			:is-back="false">
		</u-navbar>
		
		<view class="item" @click="goDetails()">
			<view style="width: 200rpx; height: 200rpx;">
				<image src="../../static/icons/logo1.png" style="width: 100%; height: 100%;"></image>
			</view>
			<h2>复诊配药</h2>
		</view>
		
		<view class="item" @click="goRecord()">
			<view style="width: 200rpx; height: 200rpx;">
			    <image src="../../static/icons/logo2.png" style="width: 100%; height: 100%;"></image>
		    </view>
			<h2>配药记录</h2>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: {
					backgroundColor: '#0a88df',
				},
			}
		},
		methods: {
			goDetails () {
				uni.navigateTo({
					url: '../details/details'
				})
			},
			goRecord () {
				uni.navigateTo({
					url: '../record/record'
				})
			}
		}
	}
</script>

<style>
	.index {
		display: flex;
		flex-flow: column;
		align-items: center;
	}
	
	.item {
		margin-top: 20%;
		display: flex;
		flex-flow: column;
		align-items: center;
	}
</style>
