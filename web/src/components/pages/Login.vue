<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">ZUCC实习管理系统</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="param.username" placeholder="用户名" class="class1" tabindex="1">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        placeholder="密码"
                        class="class1"
                        v-model="param.password"
                        tabindex="2"
                        @keyup.enter.native="submitForm()"
                    >
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
               
                <div class="login-btn">
                    <el-button style="font-size: 12px; background: #dcdfe6; font-size: 13px" @click="submitForm()" tabindex="4"
                        >登录</el-button
                    >
                </div>
            </el-form>
        </div>
    </div>
</template>
<script>

export default {

    data: function() {
        return {
            param: {
                username: "",
                password: ""
            },
           
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
                role: [{ required: true, message: '请选择身份', trigger: 'blur' }],
            },
        };
    },
    methods: {
        focusNextInput(number) {
   if (window.event.keyCode == 65) {
     let inputArray = document.getElementsByClassName("class1" );  //通过class去获取
     let nextInput = inputArray[number + 1].childNodes;
      //去打印nextInput就会发行我们要的节点在第二个，所以去取nextInput[1]
     nextInput[1].focus();
   }
 },
        submitForm() {      
           
           if(this.param.username == ''){
                this.$message.error("用户名为空");
                return false
           }else  if(this.param.password == ''){
                this.$message.error("密码为空");
                return false
           }else{
                this.$message.success('登录成功');
                this.$router.push('/');
            }
            if(this.param.username == 'root' && this.param.password=="admin") {
                this.$message.success("登录成功！");
                this.$$router.push("/index")
            }
            
            
                                   
        },
    },
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/logo-bg.jpg);
    background-size: 100%;
    opacity: 1;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>