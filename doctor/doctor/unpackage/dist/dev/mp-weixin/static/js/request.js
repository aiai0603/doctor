const baseUrl = "http://192.168.43.70:8088";//这里放置url域名
export function request(options){//封装的requset
	let { url,data,method } = options;
	data = data || {},
	
	uni.showToast({//请求数据时的loading
	    title: '加载中',
	    duration: 200,
		icon:"loading"
	});
	return new Promise((resolve,rejext)=>{
		uni.request({//这里是uniapp网络请求的api
		    url: baseUrl + url, //仅为示例，并非真实接口地址。
		    data,
			method:method||"GET",//默认请求方式是get
		    success: (res) => {
				resolve(res)
		    }
		});
	})
}

export function showToast(options){//封装Toast
	let { title,duration,icon } = options;
	uni.showToast({
	    title:title,
	    duration: 2000,
		icon:icon || "none"
	});
}

