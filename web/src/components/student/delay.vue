<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> 实习 </el-breadcrumb-item>
                <el-breadcrumb-item>延期申请</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
           
         
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
                states: '0',
                company: '',
                teacher: '',
                date: ''
            },
            options: [
                {
                    value: '选项1',
                    label: '黄金糕'
                },
                {
                    value: '选项2',
                    label: '双皮奶'
                },
                {
                    value: '选项3',
                    label: '蚵仔煎'
                },
                {
                    value: '选项4',
                    label: '龙须面'
                },
                {
                    value: '选项5',
                    label: '北京烤鸭'
                }
            ]
        };
    },
    methods: {
        pop() {
            this.query.company = '';
        },
        getData() {
            this.$axios
                .get('/select', {
                    params: {
                        id: this.$route.query.id
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
        },
        onSubmit() {
            this.$axios
                .post('/editCompany', params, {
                    headers: { 'Content-Type': 'application/json;charset=utf-8', token: localStorage.getItem('token') } //头部信息
                })
                .then((response) => {
                    console.log(response);
                    if (response.rspCode == '200') {
                        this.$message.success(response.rspMsg);
                        this.$router.go(-1);
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
            console.log(this.query.date)
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
                    ..._this.form,
                    table: _this.tableData
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
