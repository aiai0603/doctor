<template>
	<view class="main">
		<view class="in bubble" @click="residentEnter()">
			居民进入
		</view>
		<view class="in bubble" @click="doctorEnter()">
			医生进入
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
			residentEnter () {
				let type = 0
				uni.navigateTo({
					url: './login?type=' + type
				})
			},
			doctorEnter() {
				let type = 1
				uni.navigateTo({
					url: './login?type=' + type
				})
			}
			
		}
	}
</script>

<style>
	page {
		height: 100%;
		width: 100%;
	}
	.in:active{
		background: linear-gradient(#87e2f4, #65a3ef);
		box-shadow: #666666 3rpx 3rpx 5rpx;
	}
	.in {
		width: 70%;
		display: flex;
		flex-flow: row;
		justify-content: center;
		align-items: center;
		color: white;
		background: linear-gradient(#8debff, #6cacff);
		border-radius: 50rpx;
		font-size: 50rpx;
		height: 120rpx;
		margin-bottom: 100rpx;
		box-shadow: #666666 3rpx 3rpx 10rpx;
	}
	
	.bubble {
		position: relative;
		overflow: hidden;
	}
	.bubble:after {
		content: "8debff";
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
	.main {
		height: 100%;
		width: 100%;
		background: url("http://qwd5e3z6e.hd-bkt.clouddn.com/2.png");
		background-size: 100% 100%;
		display: flex;
		flex-flow: column;
		align-items: center;
		justify-content: flex-end;
	}
</style>