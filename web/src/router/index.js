import Vue from 'vue';
import Router from 'vue-router';
import VueCookies from 'vue-cookies';

Vue.use(VueCookies)
Vue.use(Router);

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
    routes: [
        {
            path: '/login',
        //    component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            component:resolve => require(['../components/pages/Login.vue'],resolve),
            meta: { title: '登录' }
        },
        {
            path: '*',
            component:resolve => require(['../components/pages/404.vue'],resolve),
            meta: { title: '404' }
        },
        {
            path:'/'  ,
            redirect:'/index' 
        },
        {
            path: '/',
          //  component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            component:resolve => require(['../components/common/Home.vue'],resolve),
            meta: { title: '首页' },
            children: [
             
                {
                    path: '/index',
               //     component: () => import(/* webpackChunkName: "table" */ '../components/page/company.vue'),
                    component:resolve => require(['../components/pages/index.vue'],resolve),
                    meta: { title: '首页' }
                },  {
                    path: '/user',
               //     component: () => import(/* webpackChunkName: "table" */ '../components/page/company.vue'),
                    component:resolve => require(['../components/doctor/user.vue'],resolve),
                    meta: { title: '用户管理' }
                }, {
                    path: '/doctor',
               //     component: () => import(/* webpackChunkName: "table" */ '../components/page/company.vue'),
                    component:resolve => require(['../components/doctor/doctor.vue'],resolve),
                    meta: { title: '医生管理' }
                },{
                    path: '/medic',
               //     component: () => import(/* webpackChunkName: "table" */ '../components/page/company.vue'),
                    component:resolve => require(['../components/doctor/medic.vue'],resolve),
                    meta: { title: '药品库' }
                },{
                    path: '/addMedic',
               //     component: () => import(/* webpackChunkName: "table" */ '../components/page/company.vue'),
                    component:resolve => require(['../components/doctor/addMedic.vue'],resolve),
                    meta: { title: '编辑药品' }
                },,{
                    path: '/ill',
               //     component: () => import(/* webpackChunkName: "table" */ '../components/page/company.vue'),
                    component:resolve => require(['../components/doctor/ill.vue'],resolve),
                    meta: { title: '疾病库' }
                },{
                    path: '/addIll',
               //     component: () => import(/* webpackChunkName: "table" */ '../components/page/company.vue'),
                    component:resolve => require(['../components/doctor/addIll.vue'],resolve),
                    meta: { title: '编辑疾病' }
                },{
                    path: '/consult',
               //     component: () => import(/* webpackChunkName: "table" */ '../components/page/company.vue'),
                    component:resolve => require(['../components/doctor/consult.vue'],resolve),
                    meta: { title: '接诊信息' }
                },{
                    path: '/prescription',
               //     component: () => import(/* webpackChunkName: "table" */ '../components/page/company.vue'),
                    component:resolve => require(['../components/doctor/prescription.vue'],resolve),
                    meta: { title: '药方信息' }
                },{
                    path: '/addDoctor',
               //     component: () => import(/* webpackChunkName: "table" */ '../components/page/company.vue'),
                    component:resolve => require(['../components/doctor/addDoctor.vue'],resolve),
                    meta: { title: '新增医生' }
                }
                
                
                
                
               
            ]
        },
        
    ]
});
