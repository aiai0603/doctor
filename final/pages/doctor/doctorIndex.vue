<template>
	<view>
		<u-tabs-swiper :current="swiperCurrent" ref="uTabs" :list="list" :is-scroll="false" @change="changeIndex"
			active-color="#87cbc3" inactive-color="#aaaaaa" bar-width="360" bar-height="10" height="100" fontSize="32">
		</u-tabs-swiper>

		<swiper :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish"
			:style="{height:swiperheight}" class="swiperss">
			<swiper-item class="swiper-item" v-for="(item, index) in list" :key="index">
				<scroll-view scroll-y @scrolltolower="onreachBottom" class="list" :style="{height:swiperheight}">
					<view class="list">
						<view v-for="(item2,index2) in medicalList" class="card"
							@click="goto(item2.consultStatus,item2.consultId)">
							<view class="up">
								<view class="date">
									申请时间：{{time(item2.createTime)}}
								</view>
								<view class="status">
									{{item2.consultStatus==2?'待完成':'已完成'}}
								</view>
							</view>
							<view class="mid">
								<image src="../../static/imgs/boy.png" class="avater"></image>
								<view class="msg">
									<view class="name">
										{{item2.personName}} <text
											style="color: #a8a8a8;margin-left: 20rpx;">{{item2.personGenderName}}</text>
										<text style="color: #a8a8a8;margin-left: 20rpx;">{{item2.personAge+'岁'}}</text>
									</view>
									<view class="drug">
										药品需求：<text style="color: #000000;">{{item2.drugNames}}</text>
									</view>
								</view>
								<image src="../../static/imgs/go.png" mode="" class="go"></image>
							</view>
							<view class="down">
								<view class="but">
									{{item2.consultStatus==2?'完成接诊':'查看处方'}}
								</view>
							</view>
						</view>
					</view>

				</scroll-view>
			</swiper-item>
		</swiper>
	</view>



</template>

<script>
	import { request, showToast } from "../../api/request.js"
	export default {
		data() {
			return {
				did: 0,
				list: [{
					name: '待完成'
				}, {
					name: '已完成'
				}],
				medicalList: [],
				swiperCurrent: 0,
				start: 1,
				swiperheight: 200,
			}
		},
		onReady() {
			//swiper高度自适应
			this.getElementHeight('.swiperss');
		},
		onShow: function() {
			
			if (wx.canIUse('hideHomeButton')) {
			  wx.hideHomeButton()
			}
		
		},
		onLoad() {
			if (uni.getStorageSync('doctorId') != undefined && uni.getStorageSync('doctorId') != '') {
				this.getData();
			}
		},
		computed: {
			time() {
				return function(cellval) {
					return this.format(cellval);
				}
			}
		},
		methods: {
			add0(m) {
				return m < 10 ? '0' + m : m
			},
			format(shijianchuo) {
				var time = new Date(shijianchuo);
				var y = time.getFullYear();
				var m = time.getMonth() + 1;
				var d = time.getDate();
				var h = time.getHours();
				var mm = time.getMinutes();
				var s = time.getSeconds();
				return y + '-' + this.add0(m) + '-' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm) + ':' + this
					.add0(s);
			},
			getElementHeight(element) {
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
			},
			goto(e, id) {
				uni.navigateTo({
					url: "./person?id=" + id
				})
			},
			changeIndex(index) {
				this.swiperCurrent = index;
				this.medicalList = [];
				this.start = 1;
				this.getData(index);
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
				if (this.swiperCurrent == current) {
				} else {
					this.swiperCurrent = current;
					this.medicalList = [];
					this.start = 1;
					this.getData(this.swiperCurrent)
				}
			},
			getData() {
				request({
					url: '/consult/findAll', //仅为示例，并非真实接口地址。
					data: {
						start: this.start,
						type: this.swiperCurrent + 2,
						doctorId: uni.getStorageSync('doctorId')
					},
				}).then(res => {
					if (res.data.rspCode == 201) {
						this.medicalList = this.medicalList.concat(res.data.data.list);
					} else {
						uni.showToast({
							icon: 'none',
							title: res.data.data ? res.data.data : '网络异常',
							duration: 2000
						});
					}
				});
			},
			onreachBottom() {
				this.start++;
				this.getData(this.swiperCurrent);
			}
		}
	}
</script>

<style>
	.name {
		font-size: 32rpx;
	}
	.drug {
		font-size: 30rpx;
		overflow: hidden;
		/*超出部分隐藏*/
		text-overflow: ellipsis;
		/* 超出部分显示省略号 */
		white-space: nowrap;
		/*规定段落中的文本不进行换行 */
		width: 100%;
	}
	.go {
		height: 40rpx;
		width: 40rpx;
	}
	.msg {
		color: #666666;
		width: 60%;
		margin-left: 3%;
		display: flex;
		flex-flow: column;
		justify-content: space-between;
		height: 50%;
	}
	.avater {
		width: 150rpx;
		height: 150rpx;
		border-radius: 100rpx;
	}
	.up {
		width: 90%;
		display: flex;
		flex-flow: row;
		justify-content: space-between;
		align-items: center;
		height: 80rpx;
		border-bottom: #cccccc 1rpx solid;
	}
	.mid {
		width: 100%;
		height: 220rpx;
		display: flex;
		flex-flow: row;
		align-items: center;
		justify-content: center;
	}
	.down {
		border-top: #cccccc 1rpx solid;
		height: 70rpx;
		width: 90%;
		display: flex;
		flex-flow: row;
		align-items: flex-end;
		justify-content: flex-end;
	}
	.but {
		color: #1ab394;
		border: #1ab394 1rpx solid;
		border-radius: 10rpx;
		padding: 5rpx 10rpx;
		width: 160rpx;
		display: flex;
		flex-flow: row;
		justify-content: center;
		align-items: center;
	}
	.date {
		font-size: 30rpx;
		color: #818181;
	}
	.status {
		font-size: 30rpx;
		color: #ffc48a;
	}
	.card:active {
		display: flex;
		flex-flow: column;
		justify-content: center;
		align-items: center;
		background-color: #F7f7f7;
		box-shadow: #cccccc 1rpx 1rpx 5rpx;
	}
	.card {
		display: flex;
		flex-flow: column;
		justify-content: center;
		align-items: center;
	}
	.swiperss {
		padding-top: 10rpx;
		width: 100%;
	}
	.swiper-item {
		width: 100%;
		height: 100%;
	}
	page {
		background-color: #f2f2f2;
	}
	.list {
		display: flex;
		flex-flow: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		margin-bottom: 40rpx;
	}
	.card {
		height: 400rpx;
		width: 96%;
		margin-top: 30rpx;
		border-radius: 20rpx;
		background-color: white;
		box-shadow: #cccccc 1rpx 1rpx 10rpx;
	}
</style>