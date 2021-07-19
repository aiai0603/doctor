<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> <i class="el-icon-lx-cascades"></i> 接诊信息 </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button class="button" style="margin-right: 10px" @click="back">返回</el-button>
                <el-select v-model="value" style="margin-right: 10px" placeholder="请选择" @change="search">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                </el-select>
                <el-button type="primary" class="button" style="margin-right: 10px" @click="exportExcel">导出数据</el-button>
            </div>

            <el-table
                id="alldata"
                style="display: none"
                :data="tableDataAll"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
            >
             
                   
                       
                          
                  
                    
                <el-table-column prop="personName" label="问诊人" ></el-table-column>
                <el-table-column prop="personGenderName" label="问诊人性别" ></el-table-column>
                <el-table-column prop="personAge" label="问诊人年龄"  ></el-table-column>
                <el-table-column prop="doctorName" label="接诊人" ></el-table-column>
                <el-table-column prop="personPhoneNo" label="问诊人手机" ></el-table-column>
                <el-table-column prop="personCardId " label="问诊人身份证" ></el-table-column>
                <el-table-column prop="diagnosis" label="历史诊断" ></el-table-column>
                <el-table-column prop="question" label="病情" ></el-table-column>
                <el-table-column prop="drugNames" label="药品需求" ></el-table-column>

                <el-table-column prop="personName" label="申请者"></el-table-column>
                <el-table-column prop="doctorName" label="接诊人"></el-table-column>
                <el-table-column prop="diagnosis" label="诊断"></el-table-column>

                <el-table-column prop="createTime" label="创建时间"></el-table-column>
                <el-table-column prop="finishTime" label="结束时间" v-if="value == 3"></el-table-column>
            </el-table>

            <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="问诊人">
                                <span>{{
                                    props.row.personName + ' ' + props.row.personGenderName + ' ' + props.row.personAge + '岁 '
                                }}</span>
                            </el-form-item>
                            <el-form-item label="接诊医生">
                                <span>{{ props.row.doctorName }}</span>
                            </el-form-item>
                            <el-form-item label="问诊人手机">
                                <span>{{ props.row.personPhoneNo }}</span>
                            </el-form-item>
                            <el-form-item label="问诊人身份证">
                                <span>{{ props.row.personCardId }}</span>
                            </el-form-item>

                            <el-form-item label="历史诊断">
                                <span>{{ props.row.diagnosis }}</span>
                            </el-form-item>
                            <el-form-item label="病情描述">
                                <span>{{ props.row.question }}</span>
                            </el-form-item>
                            <el-form-item label="需求药品">
                                <span>{{ props.row.drugNames }}</span>
                            </el-form-item>
                            <el-form-item label="创建时间">
                                <span>{{ props.row.createTime }}</span>
                            </el-form-item>
                            <el-form-item label="接诊时间">
                                <span>{{ props.row.acceptTime }}</span>
                            </el-form-item>
                            <el-form-item label="完成时间">
                                <span>{{ props.row.finishTime }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column prop="consultId" label="ID" width="55" align="center"></el-table-column>

                <el-table-column prop="personName" label="申请者"></el-table-column>
                <el-table-column prop="doctorName" label="接诊人"></el-table-column>
                <el-table-column prop="diagnosis" label="诊断"></el-table-column>

                <el-table-column prop="createTime" label="创建时间"></el-table-column>
                <el-table-column prop="finishTime" label="结束时间" v-if="value == 3"></el-table-column>

                <el-table-column label="操作" width="180" align="center" v-if="value == 3">
                    <template slot-scope="scope">
                        <el-button type="text" class="red" icon="el-icon-delete" @click="handleDelete(scope.$index, scope.row)"
                            >驳回</el-button
                        >
                        <el-button type="text" class="green" icon="el-icon-view" @click="handleView(scope.$index, scope.row)"
                            >查看药方</el-button
                        >
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
import FileSaver from 'file-saver';
import XLSX from 'xlsx';

export default {
    name: 'company',
    data() {
        return {
            options: [
                {
                    value: 3,
                    label: '已完成'
                },
                {
                    value: 2,
                    label: '待完成'
                }
            ],
            value: 3,
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
            let name = year + '' + month + '' + day + '-诊断信息';
            var xlsxParam = { raw: true };
            var wb = XLSX.utils.table_to_book(document.getElementById('alldata'), xlsxParam);
            var wbout = XLSX.write(wb, {
                bookType: 'xlsx',
                bookSST: true,
                type: 'array'
            });
            try {
                FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), name + '.xlsx');
            } catch (e) {
                if (typeof console !== 'undefined') console.log(e, wbout);
            }
            return wbout;
        },

        handleView(index, row) {
            this.$router.push('/prescription?id=' + row.consultId);
        },

        handleDelete(index, row) {
            this.$confirm('你确定要驳回这个诊断吗', '警告', {
                confirmButtonText: '确定',

                cancelButtonText: '取消'
            })
                .then(() => {
                    this.$axios
                        .post(
                            '/consult/rejectConsult',
                            { consult: row.consultId },
                            {
                                headers: { 'Content-Type': 'application/json;charset=utf-8' } //头部信息
                            }
                        )
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
                .catch((action) => {
                    if (action != 'cancel') {
                        this.$axios
                            .post(
                                '/consult/rejectConsult',
                                { consult: row.consultId },
                                {
                                    headers: { 'Content-Type': 'application/json;charset=utf-8' } //头部信息
                                }
                            )
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
            if (this.$route.query.type == 1) {
                this.$axios
                    .get('/consult/findAll', {
                        params: {
                            start: this.query.pageIndex,
                            doctorId: this.$route.query.id,
                            size: 10,
                            type: this.value
                        },
                        headers: {
                            token: localStorage.getItem('token'),
                            'Content-Type': 'application/json;charset=utf-8' //头部信息
                        }
                    })
                    .then((response) => {
                        if (response.rspCode == '201') {
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
                    .get('/consult/findAll', {
                        params: {
                            start: this.query.pageIndex,
                            doctorId: this.$route.query.id,
                            size: 1000000,
                            type: this.value
                        },
                        headers: {
                            token: localStorage.getItem('token'),
                            'Content-Type': 'application/json;charset=utf-8' //头部信息
                        }
                    })
                    .then((response) => {
                        if (response.rspCode == '201') {
                            this.tableDataAll = response.data.list;
                        } else {
                            this.$message.error(response.rspMsg);
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            } else {
                this.$axios
                    .get('/consult/showConsult', {
                        params: {
                            start: this.query.pageIndex,
                            userId: this.$route.query.id,
                            size: 10,
                            type: this.value
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
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

                this.$axios
                    .get('/consult/showConsult', {
                        params: {
                            start: this.query.pageIndex,
                            userId: this.$route.query.id,
                            size: 100000,
                            type: this.value
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
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
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
