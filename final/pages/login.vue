<template>
	<view class="main">
		<view class="logo">
			<image src="../static/imgs/zjyy.jpg" mode="" class="pic"></image>
			<view class="title">
				测试医院
			</view>
		</view>
		<button class="but" v-show="!flag" open-type="getUserInfo" lang="zh_CN" @getuserinfo="login">
			<image src="../static/imgs/wechat.png" mode="" class="icon"></image>微信快捷登录
		</button>
		<view type="default">

		</view>

		<view class="phone" v-show="flag">
			<view>
				手机号
			</view>
			<input type="number" v-model="photo" class="input" />
		</view>
		<view type="default" @click="activate()" class="but" v-show="flag && type == 1">
			激活账号
		</view>
		<view type="default" @click="activate()" class="but" v-show="flag && type == 0">
			注册账号
		</view>
	</view>
</template>

<script>
	import {
		request,
		showToast
	} from "../api/request.js"
	export default {
		data() {
			return {
				type: -1,
				flag: 0,
				photo: ''
			}
		},
		onLoad(option) {
			this.type = option.type
		},
		methods: {
			activate() {
				if (this.photo.length != 11) {
					uni.showToast({
						icon: 'none',
						title: '请输入11位手机号',
						duration: 2000
					});
					return;
				}
				let that = this;
				// #ifdef MP-WEIXIN
				uni.getProvider({
					service: 'oauth',
					success: function(res) {
						if (~res.provider.indexOf('weixin')) {
							uni.login({
								provider: 'weixin',
								success: (res2) => {
									if (that.type == 1) {

										request({
											method: "POST",
											url: '/accout/saveOpen',
											data: {
												openId: res2.code,
												phone: that.photo
											}
										}).
										then(res => {


											if (res
												.data
												.rspCode ==
												200
											) {

												try {
													uni.setStorageSync(
														'doctorId',
														res
														.data
														.data
													);
												} catch (
													e
												) {
													// error
												}
												that.sub();
												uni.reLaunch({
													url: 'doctor/doctorIndex'

												})
											} else if (
												res
												.data
												.rspCode ==
												999
											) {
												that.flag =
													1;
												uni.showToast({
													icon: 'none',
													title: '请注册账号',
													duration: 2000
												});
											} else {
												uni.showToast({
													icon: 'none',
													title: res
														.data
														.data ?
														res
														.data
														.data : '网络异常',
													duration: 2000
												});
											}



										});
									} else if (that.type == 0) {


										request({
											method: "POST",
											url: '/accout/addUser', //仅为示例，并非真实接口地址。
											data: {
												openId: res2.code,
												phone: that.photo
											}
										}).
										then(res => {
												if (res
													.data
													.rspCode ==
													200
												) {
													console
														.log(
															res
															.data
															.data
														)
													try {
														uni.setStorageSync(
															'userId',
															res
															.data
															.data
														);
													} catch (
														e
													) {
														// error
													}
													that.sub();
													uni.reLaunch({
														url: 'resident/residentIndex'
													})
												} else if (
													res
													.data
													.rspCode ==
													999
												) {
													that.flag =
														1;
													uni.showToast({
														icon: 'none',
														title: '找不到账号',
														duration: 2000
													});
												} else {
													uni.showToast({
														icon: 'none',
														title: res
															.data
															.data ?
															res
															.data
															.data : '网络异常',
														duration: 2000
													});
												}


											},







										)

									}
								}
							})

						}
					}
				});

				//#endif

			},



			sub() {
				var pubsub = this.goeasy.pubsub;
				var channel = null;
				if (uni.getStorageSync('doctorId') != undefined && uni.getStorageSync('doctorId') != '') {
					channel = 'd' + uni.getStorageSync('doctorId')
				} else if (uni.getStorageSync('userId') != undefined && uni.getStorageSync('userId') != '') {
					channel = 'u' + uni.getStorageSync('userId')
				}
				if (channel != null) {
					pubsub.subscribe({
						channel: channel,
						onMessage: function(message) {
							uni.showModal({
								title: '提示',
								content: message.content,
								success: function(res) {
									if (res.confirm) {
										if (channel.charAt(0) == 'd') {
											uni.reLaunch({
												url: './doctorIndex',
											
											})
										} else {
											uni.navigateTo({
												url: './record'
											})
										}

									} else if (res.cancel) {

									}
								}
							});

						},
						onSuccess: function() {
							console.log("Subscribe successfully.")
						},
						onFailed: function() {
							console.log("Subscribe successfully.")
						}

					});
				}

			},

			login() {
				var that = this
				// #ifdef MP-WEIXIN
				uni.getProvider({
					service: 'oauth',
					success: function(res) {
						if (~res.provider.indexOf('weixin')) {
							uni.login({
								provider: 'weixin',
								success: (res2) => {
									if (that.type == 0) {

										request({
											method: "GET",
											url: '/accout/loginUser',
											data: {
												openId: res2.code
											}
										}).
										then(res => {

											if (res
												.data
												.rspCode ==
												200
											) {

												try {
													uni.setStorageSync(
														'userId',
														res
														.data
														.data
													);
												} catch (
													e
												) {
													// error
												}
												that.sub();
												uni.reLaunch({
													url: 'resident/residentIndex'
												})
											} else if (
												res
												.data
												.rspCode ==
												999
											) {
												that.flag =
													1;
												uni.showToast({
													icon: 'none',
													title: '请注册账号',
													duration: 2000
												});
											} else {
												uni.showToast({
													icon: 'none',
													title: res
														.data
														.data ?
														res
														.data
														.data : '网络异常',
													duration: 2000
												});
											}



										});
									} else if (that.type == 1) {


										request({
											method: "GET",
											url: '/accout/login', //仅为示例，并非真实接口地址。
											data: {
												openId: res2.code
											}
										}).
										then(res => {
												if (res
													.data
													.rspCode ==
													200
												) {
													console
														.log(
															res
															.data
															.data
														)
													try {
														uni.setStorageSync(
															'doctorId',
															res
															.data
															.data
														);
													} catch (
														e
													) {
														// error
													}
													that.sub();
													uni.reLaunch({
														url: 'doctor/doctorIndex'
													})
												} else if (
													res
													.data
													.rspCode ==
													999
												) {
													that.flag =
														1;
													uni.showToast({
														icon: 'none',
														title: '请激活账号',
														duration: 2000
													});
												} else {
													uni.showToast({
														icon: 'none',
														title: res
															.data
															.data ?
															res
															.data
															.data : '网络异常',
														duration: 2000
													});
												}


											},







										)

									}
								}
							})

						}
					}
				});

				//#endif




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
