<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> 实习 </el-breadcrumb-item>
                <el-breadcrumb-item>申报实习</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form label-width="100px">
                    <el-form-item label="实习单位来源">
                        <el-radio v-model="query.states" label="0" border @change="pop"  :disabled="editable">实习库</el-radio>
                        <el-radio v-model="query.states" label="1" border @change="pop" :disabled="editable">其他</el-radio>
                    </el-form-item>
                    <el-form-item label="实习单位">
                        <el-select v-model="query.company" filterable placeholder="请选择" v-if="query.states == 0" :disabled="editable">
                            <el-option v-for="item in options" :key="item.internshipId" :label="item.internshipName" :value="item.internshipName"> </el-option>
                        </el-select>
                        <el-input v-model="query.company" v-else placeholder="请输入公司名称" :disabled="editable"></el-input>
                    </el-form-item>
                    <el-form-item label="实习导师" >
                        <el-select v-model="query.teacher" filterable placeholder="请选择" :disabled="editable">
                            <el-option v-for="item in options2" :key="item.tId" :label="item.teacherName" :value="item.tId"> </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="实习岗位">
                        <el-input v-model="query.position"  placeholder="请输入实习岗位" :disabled="editable"></el-input>
                    </el-form-item>
                    <el-form-item label="实习日期">
                        <el-date-picker :disabled="editable"
                            v-model="date"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            value-format="yyyy-MM-dd hh:mm:ss"
                        >
                        </el-date-picker>
                        <div>注意：实习日期不少于90天</div>
                    </el-form-item>
                      <el-form-item label="导出协议书">
                        
                        <el-button type="primary" @click="exportWord()">下载实习协议书</el-button>
                         <div>注意：请将纸质版协议书完成后上交教学办</div>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="onSubmit()" :disabled="editable">完成</el-button>
                        <el-button @click="exit()">取消</el-button>
                       
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import docxtemplater from 'docxtemplater'
import JSZipUtils from 'jszip-utils'
import { saveAs } from 'file-saver'
import JSZip from 'jszip'

import bus from '../common/bus.js';
export default {
    data() {
        return {
            query: {
                states: "0",
                company: '',
                teacher: '',
                date1: '',
                date2: '',
                position:''
                
            },
            form:[],
            date:'',
            options: [
              
            ], 
            options2: [
              
            ],
          
            
        };
    },
    computed:{
        editable(){
           if(this.form.state==0||this.form.state==1)
                return false;
           else
                return true;
        }
    },
    methods: {
        pop() {
            this.query.company = '';
           
        },
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
                        this.form = response.data;
                    } else {
                        this.$message.error(response.rspMsg);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        
             
            
          	this.$axios.get('/company/list',{
								params: {
                                    name: '',
                                    pageIndex: 0,
                                    pageSize: 100000
								},headers: {
                                    "token":localStorage.getItem("token"),
									"Content-Type": "application/json;charset=utf-8" //头部信息
								}
							})
							 .then(response => {
                            
                                  if(response.rspCode=="200"){ 
                                    this.options = response.data.content;
                                 
                                }else if(response.rspCode=="403"){                                
                                    this.$message.error(response.rspMsg);
                                    
                                }
                            })
                            .catch(function(error) {
								console.log(error);
                            });

           
          	            this.$axios.get('/liststudentteacher',{
								params: {
                                  
								},headers: {
                                    "token":localStorage.getItem("token"),
									"Content-Type": "application/json;charset=utf-8" //头部信息
								}
							})
							 .then(response => {
                                if(response.rspCode=="200"){ 
                                    this.options2 = response.data;
                                 
                                }else if(response.rspCode=="403"){                                
                                    this.$message.error(response.rspMsg);   
                                }
                            })
                            .catch(function(error) {
								console.log(error);
                            });
                    
                    this.$axios.get('/listPracticeInfo', {
                        params: {
                       
                        },
                    headers: {
                        token: localStorage.getItem('token'),
                        'Content-Type': 'application/json;charset=utf-8' //头部信息
                    }
                })
                .then((response) => {
                    if (response.rspCode == '200') {
                        if(response.data.result != null)
                        {
                             this.query = response.data.result;
                           this.date = [response.data.result.date1,response.data.result.date2]
                        }
                       
                    } else {
                        this.$message.error(response.rspMsg);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
           
        
         
        },
        onSubmit() {
         
            if(this.query.company == '')
            {
                    this.$message.error("请填写/选择实习单位");
                    return false;
            }else if(this.query.teacher == '')
            {
                    this.$message.error("请填写/选择实习导师");
                    return false;
            }else if(this.query.position == '')
            {
                    this.$message.error("请填写实习岗位");
                    return false;
            }else if(this.date == '' || this.date == []||this.date == null)
            {
                    this.$message.error("请选择实习起止日期");
                    return false;
            }
           
          
            var dateBegin = new Date(this.date[0].replace(/-/g, "/")); 
            var endBegin = new Date(this.date[1].replace(/-/g, "/")); 
          if(endBegin- dateBegin  < 3*30*24*60*60*1000 ){
                this.$message.error("实习日期不能少于90天！");
                return false;
          }
            this.query.date1=this.date[0];
            this.query.date2=this.date[1];
            let params = this.query

         
            
            this.$axios.post('/askPractice', params, {
                    headers: { 'Content-Type': 'application/json;charset=utf-8', token: localStorage.getItem('token') } //头部信息
                })
                .then((response) => {
                    console.log(response);
                    if (response.rspCode == '200') {
                        this.$message.success(response.rspMsg);
                        this.$router.push('/mine');
                    } else {
                        this.$message.error(response.rspMsg);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
                
        },
        exit() {
            this.$router.push('/');
        },
        exportWord: function () {
            
            if(this.query.company == '')
            {
                    this.$message.error("请填写/选择实习单位");
                    return false;
            }else if(this.query.teacher == '')
            {
                    this.$message.error("请填写/选择实习导师");
                    return false;
            }else if(this.query.position == '')
            {
                    this.$message.error("请填写实习岗位");
                    return false;
            }else if(this.date == '' || this.date == [] || this.date == null)
            {
                    this.$message.error("请选择实习起止日期");
                    return false;
            }
            var dateBegin = new Date(this.date[0].replace(/-/g, "/")); 
            var endBegin = new Date(this.date[1].replace(/-/g, "/")); 
          if(endBegin- dateBegin  < 3*30*24*60*60*1000 ){
                this.$message.error("实习日期不能少于90天！");
                return false;
          }

           
         
            let _this = this;
            // 读取并获得模板文件的二进制内容
            JSZipUtils.getBinaryContent('test.docx', function (error, content) {
                // input.docx是模板。我们在导出的时候，会根据此模板来导出对应的数据
                // 抛出异常
                if (error) {
                    throw error;
                }

                // 创建一个JSZip实例，内容为模板的内容
                let zip = new JSZip(content);
                // 创建并加载docxtemplater实例对象
                let doc = new docxtemplater().loadZip(zip);
                // 设置模板变量的值
                doc.setData({
                     ... _this,
                    studentId:_this.form.studentId,
                    studentName:_this.form.studentName,
                    studentClass:_this.form.studentClass,
                    company:_this.query.company

                });

                try {
                    // 用模板变量的值替换所有模板变量
                    doc.render();
                } catch (error) {
                    // 抛出异常
                    let e = {
                        message: error.message,
                        name: error.name,
                        stack: error.stack,
                        properties: error.properties
                    };
                    console.log(JSON.stringify({ error: e }));
                    throw error;
                }

                // 生成一个代表docxtemplater对象的zip文件（不是一个真实的文件，而是在内存中的表示）
                let out = doc.getZip().generate({
                    type: 'blob',
                    mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                });
                // 将目标文件对象保存为目标类型的文件，并命名
                saveAs(out, '实习鉴定表.docx');
            });
        }
    },
    created() {
        this.$axios
            .get('/token', {
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
