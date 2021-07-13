<template>
	<view class="main">
		<view class="in" @click="enter()">
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
		methods: {
				
			enter(){
				uni.navigateTo({
					url:'../login/login'
				})
			}
		}
	}
</script>

<style>
	page{
		height: 100%;
		width: 100%;
		
	}
	
	.in {
		width: 80%;
		display: flex;
		flex-flow: row;
		justify-content: center;
		align-items: center;
		color: white;
		background: linear-gradient( #8debff,#6cacff);
		border-radius: 50rpx;
		font-size: 50rpx;
		height: 120rpx;
		margin-bottom: 100rpx;
		box-shadow: #666666 3rpx 3rpx 10rpx;
	
	}
	
	.main{
		height: 100%;
		width: 100%;
		background: url(../../static/img/3-2.jpg) ;
		background-size: 100% 100%;
		display: flex;
		flex-flow: column;
		align-items: center;
		justify-content: flex-end;
	}
</style>
