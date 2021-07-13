<template>
	<view>
		<view class="up-item">
			<view class="up">
				<view class="date">
					申请时间：<text style="color: #000000;">{{item2.createTime}}</text>
				</view>
				<view class="status">
					{{item2.consultStatus==1?'待完成':'已完成'}}
				</view>
			</view>
		</view>

		<view class="up-item">
			<view class="mid">

				<view class="msg">
					<view class="date">
						问诊人
					</view>
					<view class="name">
						{{item2.personName}}  {{item2.personGenderName}}  {{item2.personAge+'岁'}}
					</view>

				</view>

			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				item2: {
					consultId: 0,
					consultStatus: 1,
					personName: "张伟",
					personGenderCode: 2,
					personGenderName: "男",
					drugNames: "测试药剂1,测试药剂2,测试药剂3",
					personAge: 54,
					createTime: "2020-01-23 12:21:00"


				}

			}
		},
		methods: {

		}
	}
</script>

<style>
	page {
		background-color: #f2f2f2;
		font-weight: 600;
		
	}

	.up-item {
		box-shadow: #cccccc 1rpx 1rpx 10rpx;
		width: 100%;
		background-color: white;
		display: flex;
		flex-flow: row;
		justify-content: center;
		align-items: center;
		margin-bottom: 30rpx;
	}

	.name {
		font-size: 32rpx;
		
	}

	.msg {
		color: #666666;
		width: 100%;
		display: flex;
		flex-flow: row;
		justify-content: space-between;
		height: 100rpx;
		align-items: center;
		


	}

	
	.up {

		width: 90%;
		background-color: white;
		display: flex;
		flex-flow: row;
		justify-content: space-between;
		align-items: center;
		height: 100rpx;

	}

	.mid {
		width: 90%;
		display: flex;
		flex-flow: row;
		align-items: center;
		justify-content: center
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
		font-weight: 400;


	}

	.status {
		font-size: 30rpx;
		color: #ffc48a;
	}
</style>
