<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 实习库单位信息
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">  
                <el-button  @click="exportExcel" type="primary" class="button" style="margin-right:10px">导出数据</el-button>
                <el-input v-model="name" placeholder="单位名" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
            </div>

            
            <el-table
                id="alldata"
                style="display:none"
                :data="tableData2"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
               
            >
              
                <el-table-column  prop="internshipId" label="ID" width="55" align="center"></el-table-column>
                <el-table-column  prop="internshipName" label="单位名"></el-table-column>
                <el-table-column prop="internshipAddress" label="单位地址"></el-table-column>
                <el-table-column prop="consultationName" label="单位联系人"></el-table-column>
                 <el-table-column prop="consultationDuty" label="联系人职务"></el-table-column>
                <el-table-column prop="consultationSmartphone" label="联系人电话"></el-table-column>
                <el-table-column  prop="consultationFixedphone" label="单位电话" ></el-table-column>
                <el-table-column prop="consultationMail" label="邮箱"></el-table-column>
               
             
             
            </el-table>

            <el-table  id="alldata"
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
               
            >
              
                <el-table-column  prop="internshipId" label="ID" width="55" align="center"></el-table-column>
                <el-table-column  prop="internshipName" label="单位名"></el-table-column>
                <el-table-column prop="internshipAddress" label="单位地址"></el-table-column>
                <el-table-column prop="consultationName" label="单位联系人"></el-table-column>
                 <el-table-column prop="consultationDuty" label="联系人职务"></el-table-column>
                <el-table-column prop="consultationSmartphone" label="联系人电话"></el-table-column>
                <el-table-column  prop="consultationFixedphone" label="单位电话" ></el-table-column>
                <el-table-column prop="consultationMail" label="邮箱"></el-table-column>
               
             
             
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    :total="pageTotal"
                    @current-change="load"
                    >
            </el-pagination>
               
            </div>
        </div>

    </div>
</template>

<script>
import FileSaver from "file-saver";
import XLSX from "xlsx";

export default {
    name: 'company',
    data() {
        return {
        radio:false,
        value: '选项1',
            query: {
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
            name:'',
            tableData: [],
              tableData2: [],
            tableDataAll:[],
            pageTotal:0,
           
            idx: -1,
            id: -1,
        };
    },
    created() {
         		this.$axios.get('/token',{
								params: {
                                   
								},headers: {
                                        "token":localStorage.getItem("token"),
										"Content-Type": "application/json;charset=utf-8" //头部信息
									}
							})
							 .then(response => {
                                if(response.rspCode=="403"){                                
                                    this.$message.error(response.rspMsg);
                                    this.$router.push('/login');
                                }else if(response.rspCode=="200"){
                                   this.getData();
                                }
                           
                            
                            })
                            .catch(function(error) {
								console.log(error);
                            });    
     
    },
    methods: {
          exportExcel() {
  
                      let time = new Date();
                      let year = time.getFullYear();
                      let month = time.getMonth() + 1;
                      let day = time.getDate();
                      let name = year + "" + month + "" + day+"-单位信息";
                      var xlsxParam = { raw: true }
                      var wb = XLSX.utils.table_to_book(document.getElementById("alldata"),xlsxParam);
                        var wbout = XLSX.write(wb, {
                               bookType: "xlsx",
                               bookSST: true,
                            type: "array"
                           });
                        try {
                            FileSaver.saveAs(
                             new Blob([wbout], { type: "application/octet-stream" }),
                            name + ".xlsx"
                               );
                      } catch (e) {
                            if (typeof console !== "undefined") console.log(e, wbout);
                        }
                        return wbout;
                       
    },
    
        getData() {
         
          	this.$axios.get('/company/list',{
								params: {
                                    name: this.query.name,
                                    pageIndex: this.query.pageIndex-1,
                                    pageSize: this.query.pageSize
								},headers: {
                                    "token":localStorage.getItem("token"),
									"Content-Type": "application/json;charset=utf-8" //头部信息
								}
							})
							 .then(response => {
                            
                                  if(response.rspCode=="200"){ 
                                    this.tableData = response.data.content;
                                    this.pageTotal=response.data.totalElements;
                                }else if(response.rspCode=="403"){                                
                                    this.$message.error(response.rspMsg);
                                    
                                }
                            })
                            .catch(function(error) {
								console.log(error);
                            });


                            	this.$axios.get('/company/list',{
								params: {
                                    name: this.query.name,
                                    pageIndex: 0,
                                    pageSize: 100000
								},headers: {
                                    "token":localStorage.getItem("token"),
									"Content-Type": "application/json;charset=utf-8" //头部信息
								}
							})
							 .then(response => {
                            
                                  if(response.rspCode=="200"){ 
                                    this.tableData2 = response.data.content;
                                  
                                }else if(response.rspCode=="403"){                                
                                    this.$message.error(response.rspMsg);
                                    
                                }
                            })
                            .catch(function(error) {
								console.log(error);
                            });
           
        },

        search(){
            this.query.name=this.name;
            this.query.pageIndex=1,
            this.getData();
        },
    
        // 分页导航
        load(val){
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        }
       

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
.green{
    color: green;
}
.grey{
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
