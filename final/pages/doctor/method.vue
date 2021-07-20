<template>
	<view class="form">
		<u-form :model="form" ref="uForm" :label-style="type" class="form">
			<u-form-item label="药品" prop="name" class="fitem" label-width="'auto'">
				<view class="name" @click="back()">
					<view>
						{{form.drugName}} {{form.specification}}
					</view>
					<u-icon name="arrow-right" size="32" color="#b3b3b3"></u-icon>
				</view>
			</u-form-item>
			<u-form-item :label="'计量('+form.doseUnit+')'" prop="intro" label-width="'auto'">
				<view class="name">
					<u-number-box v-model="form.dose" :min="1" :max="100"></u-number-box>
				</view>
			</u-form-item>
			<u-form-item label="用药天数(天)" prop="intro" label-width="'auto'">
				<view class="name">
					<u-number-box v-model="form.takeDays" :min="1" :max="120"></u-number-box>
				</view>
			</u-form-item>
			<u-form-item label="频次" prop="intro" label-width="'auto'">
				<view class="name" @click="show = true">
					<view>
						{{form.frequencyName}}
					</view>
					<u-icon name="arrow-right" size="32" color="#b3b3b3"></u-icon>
				</view>

			</u-form-item>
			<u-form-item label="用法" prop="intro" label-width="'auto'">
				<view class="name" @click="show2 = true">
					<view>
						{{form.usageName}}
					</view>
					<u-icon name="arrow-right" size="32" color="#b3b3b3"></u-icon>
				</view>
			</u-form-item>
			<u-form-item :label="'总量('+form.packUnit+')'" prop="intro" label-width="'auto'">
				<view class="name">
					<u-number-box v-model="form.quantity" :min="1" :max="100"></u-number-box>
				</view>
			</u-form-item>
			<u-form-item label="" prop="intro" label-width="'auto'">
				<u-input type="textarea" v-model="form.remark" placeholder="请输入备注(选填)" class="input"
					:customStyle="inputo" />
			</u-form-item>
		</u-form>
		<u-select v-model="show" :list="list" value-name="itemCode" label-name="itemName" @confirm="confirm"></u-select>

		<u-select v-model="show2" :list="list2" value-name="itemCode" label-name="itemName" @confirm="confirm2">
		</u-select>

		<view class="bot">
			<view class="btn2 " @click="back()">
				取消
			</view>
			<view class="btn" @click="submit()">
				确定
			</view>
		</view>
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
				show: false,
				show2: false,
				type: {
					color: "#aaa",
					fontSize: "32rpx",
					padding: "20rpx 40rpx",
					width: "90%"
				},
				inputo: {
					paddingTop: "30rpx",
					paddingLeft: "40rpx",
					fontSize: "32rpx"
				},
				form: {
					drugId: 0,
					prescriptionId: 0,
					packUnit: "",
					doseUnit: '',
					drugName: '',
					specification: '',
					dose: 1,
					takeDays: 1,
					remake: "",
					frequencyCode: 0,
					frequencyName: "请选择频次",
					usageCode: 0,
					usageName: "请选择用法",
					quantity: 1,
					price: 0
				},
				list: [],
				list2: [],
			}
		},
		methods: {
			back() {
				uni.navigateBack({
				})
			},
			getData() {
				request({
					url: '/drug/allFrequency', //仅为示例，并非真实接口地址。
					data: {

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

				request({
					url: '/drug/index', //仅为示例，并非真实接口地址。
					data: {
						drugId: this.form.drugId
					}
				}).
				then(res => {
					if (res.data.rspCode == 201) {
						this.form.drugName = res.data.data.drugName;
						this.form.specification = res.data.data.specification;
						this.form.doseUnit = res.data.data.doseUnit;
						this.form.packUnit = res.data.data.packUnit;
						this.form.price = res.data.data.price;
					} else {
						uni.showToast({
							icon: 'none',
							title: res.data.data ? res.data.data : '网络异常',
							duration: 2000
						});
					}
				})

				request({
					url: '/drug/allUsage', //仅为示例，并非真实接口地址。
					data: {

					}
				}).
				then(res => {
					if (res.data.rspCode == 200) {
						this.list2 = res.data.data;
					} else {
						uni.showToast({
							icon: 'none',
							title: res.data.data ? res.data.data : '网络异常',
							duration: 2000
						});

					}

				})
			},
			confirm(e) {

				this.form.frequencyCode = e[0].value
				this.form.frequencyName = e[0].label;
			},

			confirm2(e) {

				this.form.usageCode = e[0].value;
				this.form.usageName = e[0].label;
			},
			submit() {

				if (this.form.drugId == undefined || this.form.prescriptionId == undefined) {
					uni.showToast({
						icon: 'none',
						title: '药物错误',
						duration: 2000
					});
					return;
				} else if (this.form.frequencyCode == 0) {
					uni.showToast({
						icon: 'none',
						title: '请选择频次',
						duration: 2000
					});
					return;
				} else if (this.form.usageCode == 0) {
					uni.showToast({
						icon: 'none',
						title: '请选择用法',
						duration: 2000
					});
					return;
				}

				request({
					method: "POST",
					url: '/prescription/addDrug', //仅为示例，并非真实接口地址。
					data: this.form
				}).
				then(res => {

					if (res.data.rspCode == 200) {

						uni.navigateBack({

						})


					} else {
						uni.showToast({
							icon: 'none',
							title: res.data.data ? res.data.data : '网络异常',
							duration: 2000
						});

					}

				})
			}
		},
		onLoad(option) {
			this.form.drugId = option.id;
			this.form.prescriptionId = option.pid;
			this.getData();
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		}
	}
</script>

<style>
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
		width: 50%;
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


	.name {
		width: 95%;
		height: 100%;
		display: flex;
		flex-flow: row;
		justify-content: flex-end;
		align-items: center;
		font-size: 32rpx;
	}

	.name view {
		margin-left: 10rpx;
	}

	page {
		background-color: #f3f8fb;
	}

	.u-form {
		background-color: white;


	}
</style>
