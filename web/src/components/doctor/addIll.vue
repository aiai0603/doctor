<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> 疾病管理 </el-breadcrumb-item>
                <el-breadcrumb-item>编辑疾病</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="100px" :rules="rules">
                    <el-form-item label="疾病名" prop="diseasesName">
                        <el-input v-model="form.diseasesName" placeholder="请输入疾病名"></el-input>
                    </el-form-item>
                    <el-form-item label="疾病代号" prop="diseasesCode">
                        <el-input v-model="form.diseasesCode" placeholder="请输入疾病代号"></el-input>
                    </el-form-item>
                    <el-form-item label="拼音码" prop="pinyinCode">
                        <el-input v-model="form.pinyinCode" placeholder="请输入拼音码"></el-input>
                    </el-form-item>
                    <el-form-item label="疾病代码" prop="diseasesId">
                        <el-input-number v-model="form.diseasesId" :min="10001" :max="999999"></el-input-number>
                    </el-form-item>
                    <el-form-item label="疾病类型" prop="diagnosisType">
                        <el-select v-model="form.diagnosisType" placeholder="请选择">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="onSubmit('form')">完成</el-button>
                        <el-button @click="exit()">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import bus from '../common/bus.js';
export default {
    name: 'baseform',
    data() {
        return {
            form: {
                diseasesCode: '',
                diagnosisType: '',
                diseasesId: '',
                diseasesName: '',
                pinyinCode: ''
            },

            options: [
                {
                    value: '1',
                    label: '中医'
                },
                {
                    value: '2',
                    label: '西医'
                }
            ],

            rules: {
                diagnosisType: [{ required: true, message: '请填写疾病类别', trigger: 'blur' }],
                diseasesCode: [{ required: true, message: '请填写疾病代号', trigger: 'blur' }],
                pinyinCode: [{ required: true, message: '请填写拼音码', trigger: 'blur' }],
                diseasesName: [{ required: true, message: '请填写疾病名称', trigger: 'blur' }],
                diseasesId: [{ type: 'number', required: true, message: '请填写疾病代码', trigger: 'blur' }]
            }
        };
    },
    methods: {

        
        onSubmit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let params = this.form;
                    this.$axios
                        .post('/diagnosis/addDiagnosis', params, {
                            headers: { 'Content-Type': 'application/json;charset=utf-8', token: localStorage.getItem('token') } //头部信息
                        })
                        .then((response) => {
                            if (response.rspCode == '200') {
                                this.$message.success(response.rspMsg);
                                this.$router.push('/ill');
                            } else {
                                this.$message.error(response.rspMsg);
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                } else {
                    return false;
                }
            });
        },
        exit() {
            this.$router.push('/ill');
        }
    },
    created() {
        let id = this.$route.query.id ? this.$route.query.id : -1;
        this.$axios
            .get('/diagnosis/findDiagnose', {
                params: {
                    diagnosis: id
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
