<template>
	<view>
		<view class="main">
			<u-search placeholder="搜索医生" v-model="keyword" shape="shape" bg-color="#f7f8fa" action-text="取消"
				@custom="search()" @change="change()"></u-search>
		</view>
		<view class="result">
			搜索结果({{sum}}条)
		</view>
		<scroll-view scroll-y @scrolltolower="onreachBottom" :style="{height:swiperheight}" class="swiperss">
			<view class="list">
				<view class="list-item" v-for="(item,index) in list" @click="choose(item.doctorId)">
					<u-avatar :src="item.avatarUrl" size="150"></u-avatar>
					<view>
						<view style="display: flex; margin-top: 10rpx; flex-direction: row;">
							<span style="font-weight: 700; font-size: 38rpx;">{{ item.doctorName }}</span>
							<u-tag type="warning" :text="item.levelName" shape="circle" class="tag"></u-tag>
						</view>
						<view style="font-size: 30rpx; margin-top: 10rpx;">{{ item.deptName }}</view>
					</view>
				</view>
			</view>
			<view class="more">
				没有更多了
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import { request, showToast } from "../../api/request.js"
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
		onReady() {
			//swiper高度自适应
			this.getElementHeight('.swiperss');
			this.getData()
		},
		methods: {
			choose(id) {
				let pages = getCurrentPages();  //获取所有页面栈实例列表
				let nowPage = pages[ pages.length - 1];  //当前页页面实例
				let prevPage = pages[ pages.length - 2 ];  //上一页页面实例
				prevPage.$vm.form.doctor.id = id;
			    prevPage.$vm.form.doctor.avatar = this.list[id - 1].avatarUrl;
				prevPage.$vm.form.doctor.name = this.list[id - 1].doctorName;
				prevPage.$vm.form.doctor.level = this.list[id - 1].levelName;
				prevPage.$vm.form.doctor.dept = this.list[id - 1].deptName;
				uni.navigateBack({  //uni.navigateTo跳转的返回，默认1为返回上一级
					delta: 1
				});
			},
			search() {
				this.keyword = ''
			},
			getData() {
				request({
					url: '/doctor/queryAll', //仅为示例，并非真实接口地址。
					data: {
						start: this.start,
						condition: this.keyword
					}
				}).
				then(res => {
					if (res.data.rspCode == 200) {
						this.list = this.list.concat(res.data.data.list);
						this.sum = res.data.data.total;
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
				this.start = 1;
				this.sum = 0;
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
		font-size: 25rpx;
		margin: 40rpx;
	}
	.list-item {
		display: flex;
		flex-flow: row;
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
	.tag {
		margin-top: 10rpx;
		margin-left: 15rpx; 
		height: 45rpx;
		width: 130rpx;
	}
	page {
		background-color: #f1f5f6;
		height: 100%;
		display: flex;
		flex-flow: column;
	}
</style>
