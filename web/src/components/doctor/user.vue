<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> <i class="el-icon-lx-cascades"></i> 用户信息 </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" class="button" style="margin-right: 10px" @click="exportExcel">导出数据</el-button>
                <el-input v-model="name" placeholder="手机号码" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
            </div>


               <el-table
                id="alldata"
                style="display:none"
                :data="tableDataAll"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
               
            >
              
               <el-table-column prop="userId" label="ID" width="55" align="center"></el-table-column>
                 <el-table-column prop="miniOpenId" label="openID"></el-table-column>
               
                <el-table-column prop="phoneNo" label="手机号码"></el-table-column>
                 <el-table-column prop="createTime" label="创建时间"></el-table-column>
               
             
             
            </el-table>

            <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
                <el-table-column prop="userId" label="ID" width="55" align="center"></el-table-column>
                 <el-table-column prop="miniOpenId" label="openID"></el-table-column>
               
                <el-table-column prop="phoneNo" label="手机号码"></el-table-column>
                 <el-table-column prop="createTime" label="创建时间"></el-table-column>
               
               
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" class="green" icon="el-icon-view" @click="handleView(scope.$index, scope.row)">查看</el-button>
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
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
    name: 'company',
    data() {
        return {
            query: {
                pageIndex: 1,
                pageSize: 10
            },
            name:'',

            tableData: [],
            tableDataAll: [],
            pageTotal: 0,

            idx: -1,
            id: -1
        };
    },

    created() {
        this.getData();
    },
    methods: {
            exportExcel() {
  
                      let time = new Date();
                      let year = time.getFullYear();
                      let month = time.getMonth() + 1;
                      let day = time.getDate();
                      let name = year + "" + month + "" + day+"-用户信息";
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

       handleView(index, row){
             this.$router.push("/consult?id="+row.userId+"&type=2");
        },

        
        search(){
            
            this.query.pageIndex=1,
            this.getData();
        },
    
        // 分页导航
        load(val){
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        },

      
        getData() {
            this.$axios
                .get('/accout/findAll', {
                    params: {
                        start: this.query.pageIndex ,
                        condition:this.name,
                        
                    },
                    headers: {
                        token: localStorage.getItem('token'),
                        'Content-Type': 'application/json;charset=utf-8' //头部信息
                    }
                })
                .then((response) => {
                    if (response.rspCode == '200') {
                        this.tableData = response.data.list;
                        this.pageTotal = response.data.total;
                    } else{
                        this.$message.error(response.rspMsg);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });



                this.$axios
                .get('/accout/findAll', {
                    params: {
                        start: this.query.pageIndex ,
                        condition:this.name,
                        size:10000000
                        
                    },
                    headers: {
                        token: localStorage.getItem('token'),
                        'Content-Type': 'application/json;charset=utf-8' //头部信息
                    }
                })
                .then((response) => {
                    if (response.rspCode == '200') {
                        this.tableDataAll = response.data.list;
        
                    } else{
                        this.$message.error(response.rspMsg);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

        // 分页导航
        load(val) {
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
