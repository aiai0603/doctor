<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> <i class="el-icon-lx-cascades"></i> 药方信息 </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button class="button" style="margin-right: 10px" @click="back">返回</el-button>
                <el-button type="primary" class="button" style="margin-right: 10px">导出数据</el-button>
            </div>

            <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand" v-for="(item,index) in props.row.drug" v-bind:key="index">

                            <el-form-item label="药品">
                                <span>{{item.drugName}}</span>
                            </el-form-item>
                             <el-form-item label="用法">
                                <span>{{item.dose}}{{item.doseUnit+'/次 '}}{{item.frequencyName}}{{' '+item.usageName}}</span>
                            </el-form-item>
                            <el-form-item label="天数">
                                <span>{{item.takeDays+"天"}}</span>
                            </el-form-item>
                             <el-form-item label="数量">
                                <span>{{item.quantity}}{{item.packUnit}}</span>
                            </el-form-item>
                            
                        
                        </el-form>
                    </template>
                </el-table-column>
              

                <el-table-column prop="index" label="名称"></el-table-column>
            
                <el-table-column prop="type" label="类别"></el-table-column>
                <el-table-column prop="sum" label="总价"></el-table-column>


                </el-table-column>
            </el-table>

           
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
        back() {
            this.$router.go(-1);
        },
        search() {
            this.query.pageIndex = 1;
            this.getData();
        },

        // 分页导航
        load(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        },

        getData() {
           
            this.$axios
                .get('prescription/showPrescription', {
                    params: {
                        consult: this.$route.query.id,
                    },
                    headers: {
                        token: localStorage.getItem('token'),
                        'Content-Type': 'application/json;charset=utf-8' //头部信息
                    }
                })
                .then((response) => {
                    if (response.rspCode == '200') {
                        console.log(response.data);
                        this.tableData = response.data;
                        
                    } else {
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
.demo-table-expand {
    border-bottom: 1px solid black;
    font-size: 0;
}
.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}
.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 100%;
}
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
