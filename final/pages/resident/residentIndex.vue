<template>
	<view class="index">
		<view class="item  bubble" @click="goDetails()">
			<view style="width: 200rpx; height: 200rpx;">
				<image src="../../static/icons/py.png" style="width: 100%; height: 100%;"></image>
			</view>
			<view>复诊配药</view>
		</view>
		
		<view class="item  bubble" @click="goRecord()">
			<view style="width: 200rpx; height: 200rpx;">
			    <image src="../../static/icons/rc.png" style="width: 100%; height: 100%;"></image>
		    </view>
			<view>配药记录</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onShow: function() {
			
			if (wx.canIUse('hideHomeButton')) {
			  wx.hideHomeButton()
			}
		
		},
		methods: {
			goDetails () {
				uni.navigateTo({
					url: './details'
				})
			},
			goRecord () {
				uni.navigateTo({
					url: './record'
				})
			}
		}
	}
</script>

<style>
	
	.bubble {
		position: relative;
		overflow: hidden;
	}
	.bubble:after {
		content: "cccccc";
		background: #5c9899;
		position: absolute;
		width: 750rpx;
		height: 750rpx;
		left: calc(50% - 375rpx);
		top: calc(50% - 375rpx);
		opacity: 0;
		margin: auto;
		border-radius: 50%;
		transform: scale(1);
		transition: all 0.5s ease-in-out;
	}
	.bubble:active:after {
		transform: scale(0);
		opacity: 1;
		transition: 0s;
	}
	
	
	page{
		background:linear-gradient( #6cacff,#8debff);
		height:100%;
		
	}
	.index {
		display: flex;
		flex-flow: column;
		align-items: center;
	}
	
	.item {
		box-shadow: #cccccc 2rpx 2rpx 10rpx;
		width: 400rpx;
		height: 400rpx;
		background-color: rgba(255,255,255,.4);
		border-radius: 50rpx;
		color: white;
		font-size: 40rpx;
		margin-top: 30%;
		display: flex;
		flex-flow: column;
		align-items: center;
		justify-content: center;
	}
	.item  view{
		margin: 10rpx;
	}
</style>
