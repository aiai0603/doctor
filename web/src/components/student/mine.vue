<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> 实习 </el-breadcrumb-item>
                <el-breadcrumb-item>我的实习</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form label-width="100px">
                    
                    <el-form-item label="学号" >
                            {{query.studentId}}
                            
                      
                    </el-form-item>
                    <el-form-item label="姓名">
                          {{query.studentName}}
                       
                    </el-form-item>
                    <el-form-item label="班级">
                         {{query.studentClass}}
                       
                    </el-form-item>
                    <el-form-item label="实习状态">
                        {{ status }}
                    </el-form-item>
                    <el-form-item label="申报实习">
                         <el-button type="primary" @click="goto1()" >前往申报</el-button>
                         <div v-if="query.tripleAgreement" class="green"> <i class="el-icon-check"></i> 已完成</div>
                    </el-form-item>
                    <el-form-item label="实习单位">
                         {{query.studentWorkplace}}
                    </el-form-item>
                    <el-form-item label="实习导师">
                        {{query.studentTeacher}}
                    </el-form-item>
                    <el-form-item label="实习岗位">
                        {{query.studentInternship}}
                    </el-form-item>
                    <el-form-item label="实习日志">
                        <el-button type="primary" @click="goto2()">前往完善</el-button>
                        <div v-if="query.studentLog" class="green"><i class="el-icon-check"></i> 已完成</div>

                    </el-form-item>
                    <el-form-item label="实习报告">
                        <el-button type="primary" @click="goto3()" >前往填写</el-button>
                        <div v-if="query.appraisalForm" class="green"> <i class="el-icon-check"></i> 已完成</div>
                    </el-form-item>
                    <el-form-item label="实习成绩">
                         {{score}}
                    </el-form-item>
                   

                   
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            query: {
               
            },
            
        };
    },
    computed:{
            status(){
                
                let state = this.query.state
                if(state == 0){
                    return "等待开始"
                }else  if(state == 1){
                    return "审核退回"
                }else if(state == 2){
                    return "导师审核"
                }else  if(state == 3){
                    return "开始实习"
                }else  if(state == 4){
                    return "实习结束"
                }else  if(state == 5){
                    return "等待结果"
                }else  if(state == 6){
                    return "实习完成"
                }else  if(state == 7){
                    return "报告退回"
                }else  if(state == 8){
                    return "等待管理员确认"  
                }
            },

            score(){
                
                let state = this.query.studentGrade
               
                if(state == 1){
                    return "不及格"
                }else if(state == 2){
                    return "及格"
                }else  if(state == 3){
                    return "中等"
                }else  if(state == 4){
                    return "良好"
                }else  if(state == 5){
                    return "优秀"
                }else {
                    return "暂无"
                }
            }
    },
    methods: {
     
        getData() {
         
            this.$axios .get('/listmyinfo', {
                    params: {
                       
                    },
                    headers: {
                        token: localStorage.getItem('token'),
                        'Content-Type': 'application/json;charset=utf-8' //头部信息
                    }
                })
                .then((response) => {
                    if (response.rspCode == '200') {
                           console.log(response.data)
                        this.query = response.data;
                    } else {
                        this.$message.error(response.rspMsg);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
      
        goto1() {
            this.$router.push('/choose');
        },
        goto2() {
            this.$router.push('/log');
        },
        goto3() {
            this.$router.push('/report');
        },
       
    },
    created() {
        this.$axios.get('/token', {
                params: {},
                headers: {
                    token: localStorage.getItem('token'),
                    'Content-Type': 'application/json;charset=utf-8' //头部信息
                }
            })
            .then((response) => {
                if (response.rspCode == '403') {
                    this.$message.error(response.rspMsg);
                    this.$router.push('/login');
                } else if (response.rspCode == '200') {
                    this.getData();
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 200px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.green {
    color: green;
}
.grey {
    color: grey;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
