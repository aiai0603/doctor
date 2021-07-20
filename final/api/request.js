const baseUrl = "http://47.97.158.11:8088";//这里放置url域名
export function request(options){//封装的requset
	let { url,data,method,headers } = options;
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
			headers: headers || {},
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

