<template>
	<view>

		<view class="up-item">
			<view class="up">
				<view class="date">
					申请时间：<text style="color: #000000;">{{time(item2.createTime)}}</text>
				</view>
				<view class="status">
					{{item2.consultStatus==2?'待完成':'已完成'}}
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
						{{item2.personName}} {{item2.personGenderName}} {{item2.personAge+'岁'}}
					</view>


				</view>
				<view class="msg2">
					<view class="date">
						所需药品
					</view>
					<view class="name-list">
						<view class="med" v-for="(item,index) in med(item2.drugNames)">
							{{item}}
						</view>
					</view>


				</view>


			</view>
		</view>
		<view class="up-item">
			<view class="mid">

				<view class="msg">
					<view class="date">
						历史诊断
					</view>
					<view class="name">
						{{item2.diagnosis}}
					</view>


				</view>
				<view class="msg2">
					<view class="date">
						病情描述
					</view>
					<view class="name">
						{{item2.question}}
					</view>


				</view>


			</view>
		</view>

		<view class="down-item">
			<view class="mid">

				<view class="msg2">
					<view class="date">
						病情图片
					</view>
					<view class="name-list">
						<view v-for="(item,index) in med(item2.photoIds)">

							<image class="logo" :src="'/static/'+item" @click="clickImg(item)"></image>
							
						</view>
					</view>


				</view>
			</view>
		</view>


		<view class="bot" v-if="item2.consultStatus==2">
			<view class="btn " @click="pres()">
				处方
			</view>
			<view class="btn2" @click="submit()">
				完成接诊
			</view>
		</view>
		<view class="bot" v-else>
			<view class="btn" style="width: 100%;">
				查看处方
			</view>
		</view>
		<u-modal v-model="show" @confirm="quit()" :content="content" :mask-close-able="true" :show-cancel-button="true">
		</u-modal>


	</view>

</template>

<script>
	export default {
		data() {
			return {
				show: false,
				content: "您确定完成接诊吗？完成后不得再次进行修改",
				item2: {},
				cid: 0,

			}
		},
		computed: {

			

			time() {

				return function(cellval) {

					return this.format(cellval);


				}
			},

		


		},

		onLoad(option) {
			this.getData(option.id);
		},
		methods: {
			med(e) {
				if(e!=null)
					return e.split(',')
			},
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

			getData(id) {


				uni.request({
					url: 'http://192.168.43.70:8080/consult/findById', //仅为示例，并非真实接口地址。
					data: {
						consult: id
					},
					success: (res) => {
						if (res.data.rspCode == 200) {

							this.item2 = res.data.data;
							console.log(this.item2)

						} else {
							uni.showToast({
								title: res.data.rspMsg,
								duration: 2000
							});

						}

					}
				});
			},
			pres() {
				uni.navigateTo({
					url: "../prescription/prescription?id=" + this.item2.consultId
				})
			},

			submit() {
				this.show = true;
			},
			quit() {
				uni.navigateBack({
					delta: 1
				});
			},
			clickImg(item) {
				var url = '/static/' + item
				wx.previewImage({
					urls: [url], //需要预览的图片http链接列表，多张的时候，url直接写在后面就行了
					current: '', // 当前显示图片的http链接，默认是第一个
					success: function(res) {},
					fail: function(res) {},
					complete: function(res) {},
				})
			},

		}
	}
</script>

<style>
	.btn:active {
		width: 50%;
		height: 100%;
		display: flex;
		flex-flow: row;
		justify-content: center;
		align-items: center;
		background-color: #077bc3;
		color: white;
		font-size: 34rpx;
	}

	.btn2:active {
		width: 50%;
		height: 100%;
		display: flex;
		flex-flow: row;
		justify-content: center;
		align-items: center;
		background-color: #f7f7f7;

		font-size: 34rpx;
	}



	.btn {
		width: 50%;
		height: 100%;
		display: flex;
		flex-flow: row;
		justify-content: center;
		align-items: center;
		background-color: #098ade;
		color: white;
		font-size: 34rpx;
	}

	.btn2 {
		width: 50%;
		height: 100%;
		display: flex;
		flex-flow: row;
		justify-content: center;
		align-items: center;
		background-color: white;
		color: #999999;
		font-size: 34rpx;
	}

	.bot {
		height: 100rpx;
		width: 100%;
		background-color: white;
		box-shadow: #cccccc 1rpx 1rpx 10rpx;
		position: fixed;
		bottom: 0;
		display: flex;
		flex-flow: row;

	}

	.msg2 {
		color: #666666;
		width: 100%;
		display: flex;
		flex-flow: column;
		justify-content: center;
		padding-bottom: 20rpx;
		align-items: flex-start;



	}


	.logo {
		height: 200rpx;
		width: 200rpx;
		border-radius: 10rpx;
		margin: 10rpx;


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

	.med {
		margin: 10rpx 0;
		color: #1ab394;
		border-radius: 20rpx;

		border: #1ab394 1rpx solid;
		padding: 5rpx 10rpx;
		margin-right: 10rpx;
		;



	}

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


	.down-item {
		box-shadow: #cccccc 1rpx 1rpx 10rpx;
		width: 100%;
		background-color: white;
		display: flex;
		flex-flow: row;
		justify-content: center;
		align-items: center;
		margin-bottom: 30rpx;

	}


	.name-list {

		display: flex;
		flex-flow: row;
		flex-wrap: wrap;
		justify-content: flex-start;
		align-items: flex-start;

	}

	.name {
		font-size: 32rpx;
		color: #000000;

	}

	.msg {
		color: #666666;
		width: 100%;
		display: flex;
		flex-flow: row;
		justify-content: space-between;
		height: 100rpx;
		align-items: center;
		border-bottom: 1rpx #CCCCCC solid;



	}



	.mid {
		width: 90%;
		display: flex;
		flex-flow: column;
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
		line-height: 100rpx;
		font-weight: 400;


	}

	.status {
		font-size: 30rpx;
		color: #ffc48a;
	}
</style>
