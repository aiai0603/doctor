<script>
	export default {
		onLaunch: function() {
			
				
			   
			    if (uni.getStorageSync('doctorId') == undefined || uni.getStorageSync('doctorId') == '') {
			    
			    	uni.reLaunch({
			    		url: 'pages/enter/enter',
			    	})
			    }
			    else {
			
					uni.reLaunch({
						url: 'pages/index/index',
						
					})
			    }
			 
			
			
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
@import "uview-ui/index.scss";
</style>
