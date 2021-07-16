<script>
	export default {
		onLaunch: function() {

		




			this.goeasy.connect({
				id: "001", //pubsub选填，im必填
				data: {
					"avatar": "/www/xxx.png",
					"nickname": "Neo"
				}, //必须是一个对象，pubsub选填，im必填，用于上下线提醒和查询在线用户列表时，扩展更多的属性
				onSuccess: function() { //连接成功
					console.log("GoEasy connect successfully.") //连接成功
				},
				onFailed: function(error) { //连接失败
					console.log("Failed to connect GoEasy, code:" + error.code + ",error:" + error
						.content);
				},
				onProgress: function(attempts) { //连接或自动重连中
					console.log("GoEasy is connecting", attempts);
				}
			});


			var pubsub = this.goeasy.pubsub;

			pubsub.subscribe({
				channel: uni.getStorageSync("doctorId").toString(),
				onMessage: function(message) {
					uni.showModal({
						title: '提示',
						content: message.content,
						success: function(res) {
							if (res.confirm) {
								uni.reLaunch({
									url: '../index/index'
								})
							} else if (res.cancel) {

							}
						}
					});

				},
				onSuccess: function() {
					console.log("Subscribe successfully.")
				},
				onFailed: function() {
					console.log("Subscribe successfully.")
				}

			});

			if (uni.getStorageSync('doctorId') == undefined || uni.getStorageSync('doctorId') == '') {

				uni.reLaunch({
					url: 'pages/enter/enter',
				})
			} else {

				uni.reLaunch({
					url: 'pages/index/index',

				})
			}



		},
		onShow: function() {

		},
		onHide: function() {

		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
</style>
