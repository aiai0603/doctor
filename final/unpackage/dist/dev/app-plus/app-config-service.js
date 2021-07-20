
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/enter","test/test","pages/login","pages/doctor/doctorIndex","pages/resident/residentIndex","pages/resident/details","pages/resident/record","pages/resident/medicineList","pages/resident/doctorList","pages/resident/diagnosisList","pages/resident/recipel","pages/cache","pages/doctor/check","pages/doctor/med","pages/doctor/method","pages/doctor/person","pages/doctor/prescription"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8","background":"#efeff4"},"nvueCompiler":"uni-app","nvueStyleCompiler":"weex","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"resident","compilerVersion":"3.1.18","entryPagePath":"pages/doctor/check","entryPageQuery":"","realEntryPagePath":"pages/enter","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/enter","meta":{"isQuit":true},"window":{"titleNView":false}},{"path":"/test/test","meta":{},"window":{"navigationStyle":"custom","navigationBarTextStyle":"white","enablePullDownRefresh":false}},{"path":"/pages/login","meta":{},"window":{"navigationBarTitleText":"登录","navigationBarBackgroundColor":"#0a88df","navigationBarTextStyle":"white","enablePullDownRefresh":false}},{"path":"/pages/doctor/doctorIndex","meta":{},"window":{"navigationBarTitleText":"复诊配药","navigationBarBackgroundColor":"#1ab394","navigationBarTextStyle":"white","enablePullDownRefresh":false}},{"path":"/pages/resident/residentIndex","meta":{},"window":{"navigationBarTitleText":"首页","navigationBarBackgroundColor":"#0a88df","navigationBarTextStyle":"white","enablePullDownRefresh":false}},{"path":"/pages/resident/details","meta":{},"window":{"navigationBarTitleText":"复诊配药详情","navigationBarBackgroundColor":"#0a88df","navigationBarTextStyle":"white","enablePullDownRefresh":false}},{"path":"/pages/resident/record","meta":{},"window":{"navigationBarTitleText":"配药记录","navigationBarBackgroundColor":"#0a88df","navigationBarTextStyle":"white","enablePullDownRefresh":false}},{"path":"/pages/resident/medicineList","meta":{},"window":{"navigationBarTitleText":"新增药品","navigationBarBackgroundColor":"#0a88df","navigationBarTextStyle":"white","enablePullDownRefresh":false}},{"path":"/pages/resident/doctorList","meta":{},"window":{"navigationBarTitleText":"选择医生","navigationBarBackgroundColor":"#0a88df","navigationBarTextStyle":"white","enablePullDownRefresh":false}},{"path":"/pages/resident/diagnosisList","meta":{},"window":{"navigationBarTitleText":"选择诊断","navigationBarBackgroundColor":"#0a88df","navigationBarTextStyle":"white","enablePullDownRefresh":false}},{"path":"/pages/resident/recipel","meta":{},"window":{"navigationBarTitleText":"电子处方","navigationBarBackgroundColor":"#21bd64","navigationBarTextStyle":"white","enablePullDownRefresh":false}},{"path":"/pages/cache","meta":{},"window":{"navigationBarTitleText":"网上医生","enablePullDownRefresh":false,"titleNView":false}},{"path":"/pages/doctor/check","meta":{},"window":{"navigationBarTitleText":"电子处方","navigationBarBackgroundColor":"#1ab394","navigationBarTextStyle":"white","enablePullDownRefresh":false}},{"path":"/pages/doctor/med","meta":{},"window":{"navigationBarTitleText":"新增药品","navigationBarBackgroundColor":"#098ade","navigationBarTextStyle":"white","enablePullDownRefresh":false}},{"path":"/pages/doctor/method","meta":{},"window":{"navigationBarTitleText":"药品设置","navigationBarBackgroundColor":"#098ade","navigationBarTextStyle":"white","enablePullDownRefresh":false}},{"path":"/pages/doctor/person","meta":{},"window":{"navigationBarTitleText":"患者详情","navigationBarBackgroundColor":"#098ade","navigationBarTextStyle":"white","enablePullDownRefresh":false}},{"path":"/pages/doctor/prescription","meta":{},"window":{"navigationBarTitleText":"处方","navigationBarBackgroundColor":"#098ade","navigationBarTextStyle":"white","enablePullDownRefresh":false}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
