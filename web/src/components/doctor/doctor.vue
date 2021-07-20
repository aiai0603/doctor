<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> <i class="el-icon-lx-cascades"></i> 医生信息 </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" class="button" style="margin-right: 10px" @click="exportExcel">导出数据</el-button>
                <el-input v-model="name" placeholder="请输入姓名或科室" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
                <el-button type="primary" icon="el-icon-plus" @click="add">增加</el-button>
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
              
               <el-table-column prop="doctorId" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="doctorName" label="姓名"></el-table-column>

                <el-table-column prop="deptName" label="科室"></el-table-column>

                <el-table-column label="职称" prop="levelName"> </el-table-column>
               
             
             
            </el-table>



            <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
                <el-table-column prop="doctorId" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="doctorName" label="姓名"></el-table-column>

                <el-table-column prop="deptName" label="科室"></el-table-column>

                <el-table-column label="职称" prop="levelName"> </el-table-column>
                <el-table-column label="头像" align="center">
                    <template slot-scope="scope" >
                        <el-image :src="scope.row.avatarUrl"  style="width: 100px; height: 100px"
                        :preview-src-list="[scope.row.avatarUrl]"></el-image>
                    </template>
                </el-table-column>

                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                         <el-button type="text" class="red" icon="el-icon-delete" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
            name: '',

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
                      let name = year + "" + month + "" + day+"-医生信息";
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


    
        add(){
            this.$router.push("/addDoctor");
        },

        handleEdit(index,row){
            this.$router.push("/addDoctor?id="+row.doctorId);
        },
        handleView(index, row){
             this.$router.push("/consult?id="+row.doctorId+"&type=1");
        },
        search() {
            (this.query.pageIndex = 1), this.getData();
        },

        // 分页导航
        load(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        },

        getData() {
            this.$axios
                .get('/doctor/queryAll', {
                    params: {
                        start: this.query.pageIndex,
                        condition: this.name,
                        size: 10
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
                    } else {
                        this.$message.error(response.rspMsg);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });



                   this.$axios
                .get('/doctor/queryAll', {
                    params: {
                        start: this.query.pageIndex,
                        condition: this.name,
                        size: 1000000
                    },
                    headers: {
                        token: localStorage.getItem('token'),
                        'Content-Type': 'application/json;charset=utf-8' //头部信息
                    }
                })
                .then((response) => {
                    if (response.rspCode == '200') {
                        this.tableDataAll = response.data.list;
                      
                    } else {
                        this.$message.error(response.rspMsg);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

          handleDelete(index, row) {

         this.$confirm('你确定要删除这个医生吗', '警告', {
          confirmButtonText: '确定',
         
         
          cancelButtonText: '取消',}).then(() => {
                 this.$axios
                .post('/doctor/deleteDoctor', {doctorId:row.doctorId}, {
                    headers: { 'Content-Type': 'application/json;charset=utf-8', token: localStorage.getItem('token') } //头部信息
                })
                .then((response) => {
                    if (response.rspCode != '200') {
                        this.$message.error(response.rspMsg);
                    } else if (response.rspCode == '200') {
                        this.$message.success('操作成功');
                        this.getData();
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
               
            
          })
          .catch(action => {
          
              if(action != 'cancel')
               {
                    this.$axios
                 .post('/doctor/deleteDoctor', {doctorId:row.doctorId}, {
                    headers: { 'Content-Type': 'application/json;charset=utf-8', token: localStorage.getItem('token') } //头部信息
                })
                .then((response) => {
                    if (response.rspCode != '200') {
                        this.$message.error(response.rspMsg);
                    } else if (response.rspCode == '200') {
                        this.$message.success('操作成功');
                        this.getData();
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
               }
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
