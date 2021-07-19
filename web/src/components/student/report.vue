<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> 实习 </el-breadcrumb-item>
                <el-breadcrumb-item>实习报告</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form label-width="100px">
                    <el-form-item label="学号">
                        {{ query.studentId }}
                    </el-form-item>
                    <el-form-item label="姓名">
                        {{ query.studentName }}
                    </el-form-item>
                    <el-form-item label="班级">
                        {{ query.studentClass }}
                    </el-form-item>

                    <el-form-item label="实习单位">
                        {{ query.studentWorkplace }}
                    </el-form-item>
                    <el-form-item label="实习导师">
                        {{ query.studentTeacher }}
                    </el-form-item>
                    <el-form-item label="实习岗位">
                        {{ query.studentInternship }}
                    </el-form-item>
                    <el-form-item label="实习日志">
                        <el-button type="primary" @click="goto2()">前往完善</el-button>
                        <div v-if="query.studentLog" class="green"><i class="el-icon-check"></i> 已完成</div>
                    </el-form-item>
                    <el-form-item label="实习总结">
                        <el-button type="primary" @click="exportWord()" style="margin-bottom: 10px">下载模板</el-button>
                        <el-input
                            type="textarea"
                            autosize
                            placeholder="请参照模板填写,不少于2500字"
                            v-model="content"
                            :disabled="query.state > 4 && query.state != 7"
                        >
                        </el-input>
                        <div>您已经写了{{ length }}字</div>
                    </el-form-item>
                    <el-form-item label="下载报告">
                        <el-button type="primary" @click="exportWord2()" style="margin-bottom: 10px">下载报告</el-button>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="ok" :disabled="!query.studentLog || (query.state > 4 && query.state != 7)"
                            >完成实习</el-button
                        >
                    </el-form-item>
                </el-form>

                <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
                    <span
                        >申请结束实习考核后，请尽快完善纸质版报告，并提醒导师及时在系统中进行评分，纸质版报告请及时上交教学办郦老师处</span
                    >
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible = false">我在想想</el-button>
                        <el-button type="primary" @click="upload">确认提交</el-button>
                    </span>
                </el-dialog>
            </div>
        </div>
    </div>
</template>

<script>
import docxtemplater from 'docxtemplater';
import JSZipUtils from 'jszip-utils';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';

export default {
    data() {
        return {
            ban: true,

            dialogVisible: false,
            query: {},
            content: '',
            log: []
        };
    },
    computed: {
        length() {
            let content1 = this.content.replace(/\s/g, '');
            return content1.length;
        }
    },

    methods: {
        exportWord: function () {
            let _this = this;
            // 读取并获得模板文件的二进制内容
            JSZipUtils.getBinaryContent('test2.docx', function (error, content) {
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
                saveAs(out, '实习报告模板.docx');
            });
        },

        exportWord2: function () {
            let _this = this;
            // 读取并获得模板文件的二进制内容
            JSZipUtils.getBinaryContent('test3.docx', function (error, content) {
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
                    ..._this,
                    studentid: _this.query.studentId,
                    studentname: _this.query.studentName,
                    studentclass: _this.query.studentClass,
                    company: _this.query.studentWorkplace,
                    work: _this.query.studentInternship,
                    sum: _this.content,
                    
                    t1: _this.log[0].logTitle,
                    log1: _this.log[0].studentLog,
                    t2: _this.log[1].logTitle,
                    log2: _this.log[1].studentLog,
                    t3: _this.log[2].logTitle,
                    log3: _this.log[2].studentLog,
                    t4: _this.log[3].logTitle,
                    log4: _this.log[3].studentLog,
                    t5: _this.log[4].logTitle,
                    log5: _this.log[4].studentLog,
                    t6: _this.log[5].logTitle,
                    log6: _this.log[5].studentLog,
                    t7: _this.log[6].logTitle,
                    log7: _this.log[6].studentLog,
                    t8: _this.log[7].logTitle,
                    log8: _this.log[7].studentLog,
                    t9: _this.log[8].logTitle,
                    log9: _this.log[8].studentLog,
                    t10: _this.log[9].logTitle,
                    log10: _this.log[9].studentLog,
                    t11: _this.log[10].logTitle,
                    log11: _this.log[10].studentLog,
                    t12: _this.log[11].logTitle,
                    log12: _this.log[11].studentLog
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
                saveAs(out, '浙大城市学院本科生实习鉴定表.docx');
            });
        },

        ok() {
            let content1 = this.content.replace(/\s/g, '');

            if (content1.length < 2500) {
                this.$message.error('字数不足');
            } else {
                this.dialogVisible = true;
            }
        },

        goto2() {
            this.$router.push('/log');
        },

        getData() {
            this.$axios
                .get('/listmyinfo', {
                    params: {},
                    headers: {
                        token: localStorage.getItem('token'),
                        'Content-Type': 'application/json;charset=utf-8' //头部信息
                    }
                })
                .then((response) => {
                    if (response.rspCode == '200') {
                        this.query = response.data;
                    } else {
                        this.$message.error(response.rspMsg);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });

            this.$axios
                .get('/listMyAppraisalForm', {
                    params: {},
                    headers: {
                        token: localStorage.getItem('token'),
                        'Content-Type': 'application/json;charset=utf-8' //头部信息
                    }
                })
                .then((response) => {
                    if (response.rspCode == '200') {
                        if (response.data != null) this.content = response.data;
                    } else {
                        this.$message.error(response.rspMsg);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });

            this.$axios
                .get('/listMyLog', {
                    params: {
                        pageIndex: 0,
                        pageSize: 30
                    },
                    headers: {
                        token: localStorage.getItem('token'),
                        'Content-Type': 'application/json;charset=utf-8' //头部信息
                    }
                })
                .then((response) => {
                    if (response.rspCode == '200') {
                        this.log = response.data.content;
                    } else if (response.rspCode == '403') {
                        this.$message.error(response.rspMsg);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        upload() {
            this.$axios
                .post('/submit', this.content, {
                    headers: { 'Content-Type': 'application/json;charset=utf-8', token: localStorage.getItem('token') } //头部信息
                })
                .then((response) => {
                    if (response.rspCode == '200') {
                        this.$message.success(response.rspMsg);
                        this.dialogVisible = false;
                        this.$router.push('/mine');
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
            this.$router.push('/result');
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
