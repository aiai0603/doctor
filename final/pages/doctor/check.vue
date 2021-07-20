<template>
	<view>
		<u-tabs-swiper :current="swiperCurrent" ref="uTabs" :list="list" :is-scroll="false" @change="changeIndex"
			name="index" active-color="#21bd64" inactive-color="#aaaaaa" :bar-width="(720/list.length)" bar-height="10"
			height="100" fontSize="32">
		</u-tabs-swiper>
		<swiper :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish"
			:style="{height:swiperheight}" class="swiperss">
			<swiper-item class="swiper-item" v-for="(item, index) in list" :key="index">
				<scroll-view scroll-y :style="{height:swiperheight}">
					<view class="msg">
						<view class="title">
							<view>
								创业惠康医院
							</view>
							<view>
								处方笺
							</view>


						</view>
						<view class="type">
							{{item.type}}
						</view>
					</view>
					<view class="id">
						<view class="id-item">
							<view>
								姓名 {{item.consult.personName}}
							</view>
							<view>
								性别 {{item.consult.personGenderName}}
							</view>
							<view>
								年龄 {{item.consult.personAge}}岁
							</view>
							<view>
								日期 {{format(item.consult.createTime)}}
							</view>
						</view>
						<view class="id-item2">
							<view>
								身份证号 {{item.consult.personCardId}}
							</view>
							<view>
								手机号 {{item.consult.personPhoneNo}}
							</view>

						</view>
					</view>
					<view class="logo">
						Rp
					</view>
					<view v-for="(item2,index2) in item.drug" class="med">
						<view>
							<view>
								{{item2.drugName}}
							</view>
							<view style="color: #666666;">
								用法: {{item2.dose}} {{item2.doseUnit}}/次 {{item2.frequencyName}} {{item2.usageName}}
							</view>
						</view>
						<view style="font-size: 34rpx;">
							{{item2.quantity}}{{item2.packUnit}}
						</view>
					</view>
					<view class="cost">
						药费：<text style="color: #f4951a;margin-left: 10rpx;"> ¥{{item.sum}}</text>元
					</view>
					<view class="doctor">
						<view>
							<view>
								处方医师：{{item.consult.doctorName}}
							</view>
							<view>
								审核医师：
							</view>
							<view>
								发药医师：
							</view>
						</view>
						<view>
							盖章：
						</view>

					</view>
					<view class="tips">
						*药师温馨提示：请准医嘱服药！处方当日有效！
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import {
		request,
		showToast
	} from "../../api/request.js"
	export default {
		data() {
			return {
				cid: 0,
				list: [],
				swiperCurrent: 0,
				swiperheight: 200,
			}
		},
		onLoad(option) {
			this.cid = option.id;
			this.getData();
		},
		onReady() {
			//swiper高度自适应
			this.getElementHeight('.swiperss')
		},
		methods: {
			add0(m) {
				return m < 10 ? '0' + m : m
			},
			format(shijianchuo) {
				if (!shijianchuo)
					return null;
				var time = new Date(shijianchuo);
				var y = time.getFullYear();
				var m = time.getMonth() + 1;
				var d = time.getDate();
				var h = time.getHours();
				var mm = time.getMinutes();
				var s = time.getSeconds();
				return y + '-' + this.add0(m) + '-' + this.add0(d);
			},
			getElementHeight(element) {
				setTimeout(() => {
					let query = uni.createSelectorQuery().in(this);
					query.select(element).boundingClientRect();
					query.exec((res) => {
						if (!res) { //如果没获取到，再调一次
							this.getElementHeight();
						} else {
							var that = this;
							uni.getSystemInfo({
								success: (resu) => { // resu 可以获取当前屏幕的高度
									that.swiperheight = (resu.windowHeight - res[0].top) +
										'px';
								},
							})

						}
					})
				}, 20)
			},
			changeIndex(index) {
				this.swiperCurrent = index;
				this.getData(index)
			},
			transition(e) {
				let dx = e.detail.dx;
				this.$refs.uTabs.setDx(dx);
			},
			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			animationfinish(e) {
				let current = e.detail.current;
				this.$refs.uTabs.setFinishCurrent(current);
				if (this.swiperCurrent != current) {
					this.swiperCurrent = current;
					this.getData(this.swiperCurrent)
				}

			},

			getData() {
				request({
					url: '/prescription/showPrescription', //仅为示例，并非真实接口地址。
					data: {
						consult: this.cid,
						doctor: uni.getStorageSync("doctorId")
					}
				}).
				then(res => {
					if (res.data.rspCode == 200) {
						this.list = res.data.data;
					} else {
						uni.showToast({
							icon: 'none',
							title: res.data.data ? res.data.data : '网络异常',
							duration: 2000
						});

					}

				})
			}

		}
	}
</script>

<style>
	.tips {
		box-shadow: #eeeeee 1rpx 8rpx 10rpx;
		margin-top: 20rpx;
		text-align: center;
		color: #aaaaaa;
		padding-bottom: 30rpx;
	}

	.doctor {
		font-size: 32rpx;
		line-height: 60rpx;
		padding: 20rpx 60rpx 20rpx 30rpx;
		display: flex;
		flex-flow: row;
		justify-content: space-between;
		align-items: flex-start;
	}

	.cost {
		font-size: 32rpx;
		width: 100%;
		padding: 10rpx 30rpx;
		text-align: end;
		margin-bottom: 50rpx;
	}

	.med {
		display: flex;
		flex-flow: row;
		align-items: center;
		justify-content: space-between;
		padding: 10rpx 30rpx;

		font-size: 32rpx;
		line-height: 50rpx;
	}

	.logo {
		margin: 30rpx;
		font-size: 36rpx;
		font-weight: 600;
	}

	.id {
		display: flex;
		flex-flow: column;
		justify-content: center;
		align-items: center;
		padding: 100rpx 0 200rpx;
		border-bottom: #000000 8rpx solid;
	}

	.id-item {
		width: 100%;
		display: flex;
		flex-flow: row;
		justify-content: space-around;
		align-items: center;
	}

	.id-item2 {
		margin: 30rpx 0;
		width: 100%;
		display: flex;
		flex-flow: row;
		justify-content: space-around;
		align-items: center;
	}

	.msg {
		margin-top: 20rpx;
		display: flex;
		flex-flow: row;
		justify-content: center;
		align-items: center;
		width: 100%;
	}

	.type {
		position: absolute;
		top: 70rpx;
		right: 40rpx;
		font-size: 32rpx;
		border: 2rpx #000000 solid;
		width: 140rpx;
		box-shadow: ;
		display: flex;
		flex-flow: row;

		justify-content: center;
		align-items: center;
		padding: 10rpx 20rpx;
		box-shadow: #cccccc 1rpx 1rpx 10rpx;
	}

	.title {
		line-height: 70rpx;
		font-size: 46rpx;
		display: flex;
		flex-flow: column;
		align-items: center;
		justify-content: center;

	}
</style>
