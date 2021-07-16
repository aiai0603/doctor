import Vue from 'vue'
import App from './App'
import uView from 'uview-ui';
import GoEasy from './static/js/goeasy-2.0.13.min.js';
Vue.prototype.goeasy = GoEasy.getInstance({
    host:"hangzhou.goeasy.io",  
    appkey:"BC-a904c0f55e454600be7a7bb181d9a4be",
    modules:['pubsub'],//根据需要，传入‘pubsub’或'im’，或数组方式同时传入
	allowNotification:true
});
Vue.use(uView);

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
