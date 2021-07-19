<template>
    <div class="sidebar">
        <el-menu 
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="#324157"
            text-color="#bfcbd9"
            active-text-color="#20a0ff"
            unique-opened
            router
        >
        
        <template >
            <template v-for="item in items"  >
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu
                                v-if="subItem.subs"
                                :index="subItem.index"
                                :key="subItem.index"
                            >
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item
                                    v-for="(threeItem,i) in subItem.subs"
                                    :key="i"
                                    :index="threeItem.index"
                                >{{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item
                                v-else
                                :index="subItem.index"
                                :key="subItem.index"
                            >{{ subItem.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </template>
        
            
           
        </el-menu>


      

        
    </div>
</template>

<script>
import { Slider } from 'element-ui';
import bus from '../common/bus';
export default {
    data() {
        return {
            collapse: false,
            items: [
               
                {
                    icon: 'el-icon-user',
                    index: 'user',
                    title: '用户管理',
                    subs: [ 
                         
                        {
                            index: 'user',
                            title: '用户管理',
                        },
                       
                        {
                            index: 'doctor',
                            title: '医生管理',
                        },
                        
                        
                     ]
                    
                }, {
                    icon: 'el-icon-suitcase',
                   index: 'ill',
                    title: '疾病管理',
                    subs: [ 
                         
                        {
                            index: 'ill',
                            title: '疾病库',
                        },
                       
                        {
                            index: 'addIll',
                            title: '新增疾病',
                        },
                        
                        
                     ]
                    
                },{
                    icon: 'el-icon-s-custom',
                    index: 'medic',
                    title: '药品管理',
                     subs: [ 
                         
                        {
                            index: 'medic',
                            title: '药品库',
                        },
                       
                        {
                            index: 'addMedic',
                            title: '新增药品',
                        },
                        
                        
                     ]
                }



              
            ],  
          
        };
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
        
    },
    created() {
        this.role = localStorage.getItem("role");
       
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', msg => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });
      
    },
  


    
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
</style>
