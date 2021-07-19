<template>
	<view>
		<block v-for="(item, index) in recordList">
			<u-gap height="10" bg-color="#f2f2f2" v-if="index != 0"></u-gap>
			<view class="record">
				<view class="record-info">
					<view class="record-date">问诊时间&nbsp;:&nbsp;&nbsp;{{ format(recordList[index].acceptTime) }}</view>
					<view class="record-state">{{ recordList[index].consultStatus === 3 ? '已完成' : '未完成' }}</view>
				</view>
				<view class="record-detail">
					<u-avatar size="100" :src="src"></u-avatar>
					<view class="record-detail-info">
						<view style="display: flex; align-items: center; flex-direction: row;">
							<span>{{ recordList[index].doctorName }}</span>
							<p style="margin-left: 25rpx; color: #818181;">{{ recordList[index].deptName }}</p>
						</view>
						<view style="margin-top: 20rpx; color: #818181;">就诊人：&nbsp;{{ recordList[index].personName }}</view>
						<view style="margin-top: 20rpx; color: #818181;" class="question">病情：&nbsp;{{ recordList[index].question }}</view>
					</view>
				</view>
				<view class="record-bottom">
					<view class="record-icon">
						<image src="../../static/icons/record-icon.png"></image>
					</view>
					<view style="margin-left: 20rpx; color: #818181;">复诊配药</view>
					<u-button size="mini" :custom-style="customStyle" v-if="recordList[index].consultStatus === 3" @click="choose(recordList[index].consultId)">查看处方</u-button>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	import { request, showToast } from "../../api/request.js"
	
	export default {
		data() {
			return {
				customStyle: {
					color: '#039f49'
				},
				background: {
					backgroundColor: '#0a88df',
				},
				recordList: [],
				src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F0a0cefbb9cb88fc9868a1da92cb11c390ebbb9323e81-O5tOvT_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1628823315&t=2af0af34d6304d4cad48c5c0e7027bcf'
			}
		},
		methods: {
			add0(m) {
				return m < 10 ? '0' + m : m
			},
			format(timestamp) {
				if (!timestamp)
					return null;
					
				var time = new Date(timestamp);
				var y = time.getFullYear();
				var m = time.getMonth() + 1;
				var d = time.getDate();
				var h = time.getHours();
				var mm = time.getMinutes();
				var s = time.getSeconds();
				return y + '-' + this.add0(m) + '-' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s) ;
			},
			choose (id) {
				uni.navigateTo({
					url: '../recipel/recipel?consultId=' + id
				})
			}
		},
		onReady() {
			request({
				url: '/consult/showConsult',
				data: {
					"userId": 1
				}
			}).
			then(res => {
				if (res.data.rspCode == 200) {
					this.recordList = res.data.data
				} else if (res.data.rspCode == 999) {
					uni.showToast({
						icon: 'none',
						title: res.data.data ? res.data.data : '网络异常',
						duration: 2000
					});
				} 
			});
		}
	}
</script>

<style>
	.record {
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
	
	.question {
		width: 80%;
		display: -webkit-box;
		-webkit-line-clamp: 1; 
		overflow: hidden; 
		text-overflow: ellipsis; 
		-webkit-box-orient: vertical;
	}
	
	uni-button {
		margin-right: 20rpx;
	}
	
</style>
