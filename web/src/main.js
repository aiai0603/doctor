import Vue from 'vue';
//import Vue from 'https://cdn.bootcdn.net/ajax/libs/vue/2.6.9/vue.common.dev.js';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
//import ElementUI from 'https://cdn.bootcdn.net/ajax/libs/element-ui/2.9.2/index.js';
import VueI18n from 'vue-i18n';
import { messages } from './components/common/i18n';
import 'element-ui/lib/theme-chalk/index.css'; 
import './assets/css/icon.css';
import './components/common/directives';
import 'babel-polyfill';
import service from './utils/request'
//import axios from 'https://cdn.bootcdn.net/ajax/libs/axios/0.20.0/axios.min.js'
import md5 from 'js-md5';
Vue.prototype.$md5 = md5;


Vue.prototype.$axios = service
Vue.config.productionTip = false;
Vue.use(VueI18n);
Vue.use(ElementUI, {
    size: 'small'
});
const i18n = new VueI18n({
    locale: 'zh',
    messages
});

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | 网上医生管理系统`;
   
        if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        } else {
            next();
        }
    
});

new Vue({
    router,
    i18n,
    render: h => h(App)
}).$mount('#app');
