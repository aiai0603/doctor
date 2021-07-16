<template>
	<view>
		<view class="main">
			<u-search placeholder="搜索药品" v-model="keyword" shape="shape" bg-color="#f7f8fa" action-text="取消"
				@custom="search()" @change="change()"></u-search>
		</view>
		<view class="result">
			搜索结果({{sum}}条)
		</view>
		<scroll-view scroll-y @scrolltolower="onreachBottom" :style="{height:swiperheight}" class="swiperss">
			<view class="list">
				<view class="list-item" v-for="(item,index) in list" @click="goto(item.drugId)">
					<view>
						{{item.drugName}} {{item.dose}}{{item.doseUnit}}
					</view>
					<view>
						{{item.factoryName}}
					</view>
				</view>
			</view>
			<view class="more">
				没有更多了
			</view>
			<view>

			</view>
		</scroll-view>


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
				pid: 0,
				sum: 0,
				keyword: '',
				list: [],
				swiperheight: 200,
				start: 1,
				size: 0,

			}
		},
		onLoad(option) {
			this.pid = option.id
		},
		onReady() {
			//swiper高度自适应
			this.getElementHeight('.swiperss');
			this.getData()

		},
		methods: {

			goto(id) {
			
				uni.navigateTo({
					url: '../method/method?id=' + id + '&pid=' + this.pid
				})
				

			},
			search() {

				this.keyword = ''


			},
			getData() {
				request({
					url: '/drug/queryAll', //仅为示例，并非真实接口地址。
					data: {
						start: this.start,
						condition: this.keyword
					}
				}).
				then(res => {
					if (res.data.rspCode == 200) {
						this.list = this.list.concat(res.data.data.list);
						this.sum = res.data.data.total

					} else if (res.data.rspCode == 999) {
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
				this.getData();

			},


			change() {
				this.list = [];
				this.sum = 0;
				this.start = 1;
				this.getData();
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

		}
	}
</script>

<style>
	.more {
		display: flex;
		flex-flow: row;
		justify-content: center;
		align-items: center;
		font-size: 32rpx;
		margin: 40rpx;
	}

	.list-item {
		padding: 30rpx 20rpx;
		font-size: 32rpx;
		border-bottom: #eeeeee 1rpx solid;
	}
	
	.list-item:active {
		background-color: #f7f7f7;
	}

	.list-item view {
		padding: 5rpx;

	}

	.list {
		box-shadow: #cccccc 1rpx 1rpx 10rpx;
		width: 100%;
		background-color: white;
	}

	.result {
		font-size: 32rpx;
		margin: 20rpx;
	}

	.main {
		display: flex;
		flex-flow: row;
		justify-content: center;
		align-items: center;
		background-color: white;
		padding: 25rpx 15rpx 15rpx;
		box-shadow: #cccccc 1rpx 1rpx 10rpx;
	}

	page {
		background-color: #f1f5f6;
		height: 100%;
		display: flex;
		flex-flow: column;
	}
</style>
