<template>
	<view>
		<u-navbar
		    height="65"
			title="配药记录"
			titleBold="true"
			title-color="#000"
			back-icon-color="#000">
		</u-navbar>
		
		<view class="record">
			<view class="record-info">
				<view class="record-date">问诊时间&nbsp;:&nbsp;&nbsp;2021-05-24&nbsp;11:26</view>
				<view class="record-state">待完成</view>
			</view>
			<view class="record-detail">
				<u-avatar size="100"></u-avatar>
				<view class="record-detail-info">
					<view style="display: flex; align-items: center; flex-direction: row;">
						<span>林玉娇</span>
						<p style="margin-left: 25rpx; color: #818181;">在线云诊室</p>
					</view>
					<view style="margin-top: 20rpx; color: #818181;">就诊人：&nbsp;张伟</view>
					<view style="margin-top: 20rpx; color: #818181;">病情：&nbsp;头好痛</view>
				</view>
			</view>
			<view class="record-bottom">
				<view class="record-icon">
					<image src="../../static/icons/record-icon.png"></image>
				</view>
				<view style="margin-left: 20rpx; color: #818181;">复诊配药</view>
				<u-button size="mini" :custom-style="customStyle">查看处方</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				customStyle: {
					color: '#039f49'
				}
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.record {
		margin-top: 10rpx;
		background: #fff;
		height: 400rpx;
		width: 100%;
		box-shadow: #ccc 1rpx 1rpx 1rpx;
	}
	
	.record-info {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin-left: 30rpx;
		width: 95%;
		height: 25%;
		border-bottom: 1rpx solid #ddd;
	}
	
	.record-info>.record-date {
		font-weight: 550;
		color: #6a6a6a;
	}
	
	.record-info>.record-state {
		color: #f4951a;
		margin-right: 30rpx;
	}
	
	.record-detail {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-left: 30rpx;
		width: 95%;
		height: 50%;
		border-bottom: 1rpx solid #ddd;
	}
	
	.record-detail span {
		font-size: large;
		font-weight: 800;
	}
	
	.record-detail>.record-detail-info {
		width: 80%;
		margin-left: 30rpx;
	}
	
	.record-bottom {
		display: flex;
		align-items: center;
		margin-top: 10rpx;
		margin-left: 30rpx;
		width: 95%;
		height: 20%;
	}
	
	.record-bottom>.record-icon {
		background: #cbcbcb;
		width: 35rpx;
		height: 35rpx;
	}
	
	.record-bottom image {
		width: 100%;
		height: 100%;
	}
	
	uni-button {
		margin-right: 20rpx;
	}
	
</style>
