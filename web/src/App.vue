
<template>
    
    <div id="app">
        <router-view v-if="isRouterAlive"></router-view>
    </div>
</template>
<script>

export default {
    mounted: function () {


    let beginTime = 0; //开始时间
    let differTime = 0; //时间差
    window.onunload = function() {
      differTime = new Date().getTime() - beginTime;
      if (differTime <= 5) {
        localStorage.removeItem('token');
      
        console.log("这是关闭");
      } else {
        console.log("这是刷新");
      }
    };

    window.onbeforeunload = function() {
      beginTime = new Date().getTime();
    };
    },


      provide(){
      return{
        reload:this.reload
      }
    },
    data(){
      return {
        isRouterAlive:true,
      }
    },
    methods:{
      reload(){
        this.isRouterAlive = false;
        this.$nextTick(function () {
          this.isRouterAlive = true
        });
      },
    },

}
</script>
<style>
    @import "./assets/css/main.css";
    @import "./assets/css/color-dark.css";     
   
</style>
