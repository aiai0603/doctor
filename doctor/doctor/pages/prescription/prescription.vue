<template>
	<view>
		<u-tabs-swiper :current="swiperCurrent" ref="uTabs" :list="list" :is-scroll="false" @change="changeIndex"
			active-color="#098ade" inactive-color="#aaaaaa" bar-width="360" bar-height="10" height="100" fontSize="32">
		</u-tabs-swiper>
		<view class="need">
			<view>
				患者需要药品
			</view>
			<view class="drug" v-for="(item,index) in med">
				{{item}}
			</view>
		</view>
		<swiper :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish"
			:style="{height:swiperheight}" class="swiperss">
			<swiper-item class="swiper-item" v-for="(item, index) in list" :key="index">
				<scroll-view scroll-y @scrolltolower="onreachBottom" :style="{height:swiperheight}">
					<view class="list">


						<view :class=" choose==item2.prescriptionId?'cho':'' " class="list-item"
							v-for="(item2,index2) in data">
							<view class="list-title" @click="cho(item2.prescriptionId)">
								<view class="logo">
									<image src="../../static/img/med.png" mode=""></image>
									<view class="name">
										{{type(item2.prescriptionType)}}
									</view>
								</view>
								<view class="add" @click.stop="addmed(item.prescriptionId)">+新增药品</view>
							</view>
							<view class="list-med-item" v-for="(item3,index3) in item2.drugs">
								<view class="med-name">
									<view style="width: 50%;">
										{{item3.drugName}}
									</view>
									<view class="med-right">
										<view>
											{{item3.quantity}}{{item3.packUnit}}
										</view>
										<u-icon name="trash" color="red" size="34" style="margin-left:40rpx;"
											@click="del(index3,item3)"></u-icon>

									</view>

								</view>
								<view class="specification">
									{{item3.specification}}
								</view>
								<view class="usage">
									{{"用法 "+item3.frequencyName+" "+item3.usageName}}
								</view>

							</view>

						</view>

					</view>

				</scroll-view>
			</swiper-item>
		</swiper>
		<view class="bot" v-if="swiperCurrent==0">
			<view class="btn2 " @click="add()">
				＋新增药方
			</view>
			<view @click="submit()" :class="choose!=-1?'btn':'una-btn'">
				提交药方
			</view>
		</view>
		<u-modal v-model="show" @confirm="quit()" title="药方类型" :mask-close-able="true" :show-cancel-button="true">
			<u-radio-group v-model="value" @change="radioGroupChange" class="pop">
				<u-radio @change="radioChange" v-for="(item, index) in listme" :key="index" :name="item.name"
					:disabled="item.disabled">
					{{item.name}}
				</u-radio>
			</u-radio-group>

		</u-modal>


	</view>


</template>

<script>
	export default {
		data() {
			return {
				data: [{
					prescriptionId: 12,
					prescriptionType: 1,
					prescriptionStatus: 0,
					drugs: [{
						prescriptionDrugId: 12,
						drugId: 8,
						drugName: "测试药品",
						specification: "34*0.5g",
						frequencyCode: 1,
						frequencyName: "bid",
						usageCode: 2,
						usageName: "口服",
						quantity: 1,
						packUnit: "盒"
					}, {
						prescriptionDrugId: 13,
						drugId: 8,
						drugName: "测试药品2",
						specification: "34*0.5g",
						frequencyCode: 1,
						frequencyName: "bid",
						usageCode: 2,
						usageName: "口服",
						quantity: 1,
						packUnit: "盒"
					}, {
						prescriptionDrugId: 13,
						drugId: 8,
						drugName: "测试药品2测试药品2测试药品2",
						specification: "34*0.5g",
						frequencyCode: 1,
						frequencyName: "bid",
						usageCode: 2,
						usageName: "口服",
						quantity: 1,
						packUnit: "盒"
					}]
				}],
				listme: [{
						name: '西药',
						disabled: false
					},
					{
						name: '中成药',
						disabled: false
					},
					{
						name: '中草药',
						disabled: false
					}
				],
				// u-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
				value: '西药',



				show: false,
				swiperCurrent: 0,
				swiperheight: 200,
				list: [{
					name: '待提交'
				}, {
					name: '已开方'
				}],
				choose: -1,

				person: {
					consultId: 3,
					question: "这个是一个非常非常非常非常非常非常非常非常非常发吃饭吃饭吃饭非常非常非常非常非常从非常非常非常非常非常非常非常非常非常长的",
					diagnosis: "感冒",
					consultId: 0,
					consultStatus: 1,
					personName: "张伟",
					personGenderCode: 2,
					personGenderName: "男",
					drugNames: "测试药剂1，测试药剂2，测试药剂3，测试药剂1，测试药剂2，测试药剂3",
					personAge: 54,
					createTime: "2020-01-23 12:21:00",
					photoIds: "c1.png，c2.png，logo.png"

				}
			}
		},
		onReady() {
			//swiper高度自适应
			this.getElementHeight('.swiperss')
		},
		computed: {

			type() {
				return function(id) {
					if (id == 1)
						return "西药方";
					else if (id == 2)
						return "中成药方";
					else
						return "中草药方";
				}
			},
			med() {
				return this.person.drugNames.split('，')
			},

		},

		methods: {

			cho(e) {
				if (this.choose != e)
					this.choose = e;
				else {
					this.choose = -1;
				}
			},
			del(index, item) {

			},

			radioChange(e) {
				// console.log(e);
			},
			// 选中任一radio时，由radio-group触发
			radioGroupChange(e) {
				// console.log(e);
			},
			addmed(e) {
				uni.navigateTo({
					url:"../med/med?id="+e
				})
				
			},


			add() {
				this.show = true;
			},

			submit() {

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


			getData(e) {
				//this.medicalList = this.dlist[e]
			},

			onreachBottom() {

			}
		}
	}
</script>

<style>
	.cho {
		border: #007AFF 1rpx solid;
	}

	.med-right {
		display: flex;
		flex-flow: row;
		justify-content: center;
		align-items: center;
	}

	.med-name {
		line-height: 60rpx;
		display: flex;
		flex-flow: row;
		justify-content: space-between;
		align-items: center;
		width: 100%;
	}

	.specification {

		line-height: 50rpx;
	}

	.usage {
		font-size: 30rpx;
		color: #a8a8a8;
		line-height: 50rpx;
	}

	.list-med-item:last-child {
		border-bottom: none;
	}

	.list-med-item {
		border-bottom: #cccccc 1rpx solid;
		display: flex;
		flex-flow: column;
		justify-content: center;
		align-items: flex-start;
		font-size: 34rpx;
		padding: 3% 7%;

	}

	.add {
		color: #098ade;
	}

	.list-item {
		margin: 30rpx 0;
		width: 90%;
		border-radius: 20rpx;
		box-shadow: #cccccc 1rpx 1rpx 10rpx;
	}

	.logo {
		display: flex;
		flex-flow: row;
		justify-content: center;
		align-items: center;
	}

	.list-title {
		font-size: 32rpx;
		border-radius: 20rpx 20rpx 0 0;
		line-height: 100rpx;
		background-color: #eaf1f7;
		display: flex;
		flex-flow: row;
		width: 100%;
		padding: 0 7%;
		justify-content: space-between;
		align-items: center;

	}

	.list-title image {
		width: 50rpx;
		height: 50rpx;
		margin-right: 20rpx;
	}

	.list {
		box-shadow: #cccccc 1rpx 1rpx 10rpx;
		width: 100%;
		background-color: white;
		display: flex;
		flex-flow: column;
		justify-content: center;
		align-items: center;
	}

	.pop {
		width: 100%;
		display: flex;
		flex-flow: row;
		justify-content: center;
		align-items: center;
		height: 200rpx;
	}

	.btn:active {

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

		height: 100%;
		display: flex;
		flex-flow: row;
		justify-content: center;
		align-items: center;
		background-color: #f7f7f7;

		font-size: 34rpx;
	}



	.btn {
		flex: 1;
		height: 100%;
		display: flex;
		flex-flow: row;
		justify-content: center;
		align-items: center;
		background-color: #098ade;
		color: white;
		font-size: 34rpx;
	}

	.una-btn {
		flex: 1;
		height: 100%;
		display: flex;
		flex-flow: row;
		justify-content: center;
		align-items: center;
		background-color: #91d2f8;
		color: white;
		font-size: 34rpx;
	}

	.btn2 {
		width: 35%;
		height: 100%;
		display: flex;
		flex-flow: row;
		justify-content: center;
		align-items: center;
		background-color: white;
		color: #666666;
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

	page {
		background-color: #f2f6f7;
	}

	.drug {
		color: #19BE6B;
		margin-left: 15rpx;
	}

	.need {
		width: 100%;
		display: flex;
		flex-flow: row;
		justify-content: start;
		line-height: 50rpx;
		flex-wrap: wrap;
		align-items: center;
		background-color: #fef4e8;
		padding: 0 5%;
	}
</style>
