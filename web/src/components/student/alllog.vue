<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 实习日志
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">  
               
                 <el-button type="primary" icon="el-icon-plus" @click="gotoadd">添加</el-button>
            </div>

            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header">
                <el-table-column  prop="id" label="ID" width="55" align="center"></el-table-column>
                <el-table-column  prop="logTitle" label="标题"></el-table-column>
               
                
               
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.deleteFlag!=1"
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button v-if="scope.row.deleteFlag===0"
                            type="text"
                            icon="el-icon-close"
                            class="green"
                            @click="handledelete(scope.$index, scope.row)"
                        >移除</el-button>
                       
                    </template>
                </el-table-column>
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

export default {
    name: 'company',
    data() {
        return {
          
            query: {
           
                pageIndex: 1,
                pageSize: 10
            },
           
            tableData: [],
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

        
         handleEdit(index, row) {
            
             this.$router.push('editlog?id='+row.id)
         
                
        },



         handledelete(index, row) {
            
         
         
                    this.$axios.get('/deleteMyLog',{
							params: {
                                id:row.id
							},headers: {
                                "token":localStorage.getItem("token"),
								"Content-Type": "application/json;charset=utf-8" //头部信息
							}
						})
						.then(response => {
                                if(response.rspCode!="200")
                                {
                                    this.$message.error(response.rspMsg);
                                }else  if(response.rspCode=="200"){
                                    this.$message.success('操作成功');
                                    this.getData();
                                }
                           
                        })
                        .catch(function(error) {
							console.log(error);
						})
            },


             gotoadd(){
                    this.$router.push('/addlog');
                },

    
        getData() {
         
          	this.$axios.get('/listMyLog',{
								params: {
                                 
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
