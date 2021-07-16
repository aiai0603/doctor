<template>
	<view class="main">
		<view class="logo">
			<image src="../../static/img/zjyy.jpg" mode="" class="pic"></image>
			<view class="title">
				测试医院
			</view>
		</view>
		<view type="default" @click="login()" class="but" v-show="!flag">
			<image src="../../static/img/wechat.png" mode="" class="icon"></image>微信快捷登录
		</view>

		<view class="phone" v-show="flag">
			<view>
				手机号
			</view>
			<input type="number" v-model="photo" class="input" />
		</view>
		<view type="default" @click="login2()" class="but" v-show="flag">
			激活账号
		</view>
	</view>
</template>

<script>
	import {
		request,
		showToast
	} from "../../static/js/request.js"
	export default {
		data() {
			return {
				flag: 0,
				photo: ''
			}
		},
		methods: {
			
			login2() {
				
				if(this.photo.length!=11){
					uni.showToast({
						icon: 'none',
						title:  '请输入11位手机号',
						duration: 2000
					});
					
					return ;
				}
				let that = this;
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						request({
							method: "POST",
							url: '/accout/saveOpen', //仅为示例，并非真实接口地址。
							data: {
								openId: loginRes.authResult.openid,
								phone:that.photo
							}
						}).
						then(res => {
			
							if (res.data.rspCode == 200) {
			
								try {
									uni.setStorageSync('doctorId', res.data.data);
								} catch (e) {
									// error
								}
								uni.reLaunch({
									url: '../index/index'
								})
			
			
							}else {
								uni.showToast({
									icon: 'none',
									title: res.data.data ? res.data.data : '网络异常',
									duration: 2000
								});
			
							}
			
						})
			
			
					},
					fail: function(e) {
						uni.showToast({
							icon: 'none',
							title: '授权失败',
							duration: 2000
						});
					}
				});
				},
			
			
			
			

			login() {

				let that = this;
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						request({
							method: "GET",
							url: '/accout/login', //仅为示例，并非真实接口地址。
							data: {
								openId: loginRes.authResult.openid
							}
						}).
						then(res => {
							

							if (res.data.rspCode == 200) {

								try {
									uni.setStorageSync('doctorId', res.data.data);
								} catch (e) {
									// error
								}
								uni.reLaunch({
									url: '../index/index'
								})


							} else if (res.data.rspCode == 999) {
								that.flag = 1;
								uni.showToast({
									icon: 'none',
									title:  '请激活账号',
									duration: 2000
								});




							} else {
								uni.showToast({
									icon: 'none',
									title: res.data.data ? res.data.data : '网络异常',
									duration: 2000
								});

							}

						})


					},
					fail: function(e) {
						uni.showToast({
							icon: 'none',
							title: '授权失败',
							duration: 2000
						});
					}
				});

			}
		}
	}
</script>

<style>
	.input {
		width: 55%;
		border-bottom: #333333 1rpx solid;
		margin-left: 20rpx;
		padding-left: 20rpx;
	}

	.phone {
		margin: 20rpx 0rpx 60rpx;
		display: flex;
		flex-flow: row;
		justify-content: center;
		width: 100%;
		font-size: 40rpx;
		line-height: 100rpx;
		align-items: center;
	}

	page {
		width: 100%;
		height: 100%;
	}

	.main {
		height: 100%;
		width: 100%;
		display: flex;
		flex-flow: column;
		align-items: center;
		justify-content: flex-start;
	}

	.pic {
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

	.title {
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

	.but:active {
		width: 80%;
		display: flex;
		flex-flow: row;
		justify-content: center;
		align-items: center;
		color: white;
		background-color: #05aa05;
		border-radius: 50rpx;
		font-size: 30rpx;
		height: 80rpx;
		box-shadow: #666666 3rpx 3rpx 5rpx;

	}

	.icon {
		width: 40rpx;
		height: 40rpx;
		margin-right: 10rpx;
	}
</style>
