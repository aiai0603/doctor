<template>
	<view class="main">
		<view class="logo">
			<image src="../../static/img/zjyy.jpg" mode="" class="pic"></image>
			<view class="title">
				测试医院
			</view>
		</view>
		<view type="default" @click="login()" class="but">
			<image src="../../static/img/wechat.png" mode="" class="icon"></image>微信快捷登录
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

			login() {
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						console.log(loginRes.authResult);
						uni.redirectTo({
							url:'../index/index'
						})
					}
				});
			}
		}
	}
</script>

<style>
	page{
		width: 100%;
		height:100%;
	}
	.main{
		height: 100%;
		width: 100%;
		display: flex;
		flex-flow: column;
		align-items: center;
		justify-content: flex-start;
	}
	.pic{
		width: 250rpx;
		height: 250rpx;
	}
	.logo {
		width: 100%;
		height: 50%;
		display: flex;
		flex-flow: column;
		justify-content: center;
		align-items: center;
	}
	.title{
		font-weight: 600;
		font-size: 40rpx;
		margin-top: 30rpx;
		color: #333333;
	}

	.but {
		width: 80%;
		display: flex;
		flex-flow: row;
		justify-content: center;
		align-items: center;
		color: white;
		background-color: #06b908;
		border-radius: 50rpx;
		font-size: 30rpx;
		height: 80rpx;
		box-shadow: #666666 3rpx 3rpx 10rpx;

	}

	.icon {
		width: 40rpx;
		height: 40rpx;
		margin-right: 10rpx;
	}
</style>
