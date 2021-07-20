<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> 药品管理 </el-breadcrumb-item>
                <el-breadcrumb-item>新增药品</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="100px" :rules="rules" >
                    <el-form-item label="药品名" prop="drugName">
                        <el-input v-model="form.drugName" placeholder="请输入药品名"></el-input>
                    </el-form-item>
                    <el-form-item label="商品名" prop="tradeName">
                        <el-input v-model="form.tradeName" placeholder="请输入商品名"></el-input>
                    </el-form-item>
                    <el-form-item label="拼音码" prop="pinyinCode">
                        <el-input v-model="form.pinyinCode" placeholder="请输入拼音码"></el-input>
                    </el-form-item>
                    <el-form-item label="规格" prop="specification">
                        <el-input v-model="form.specification" placeholder="请输入规格"></el-input>
                    </el-form-item>
                    <el-form-item label="单价" prop="price">
                        <el-input-number v-model="form.price" :precision="2" :step="0.1" :max="10000"></el-input-number>
                    </el-form-item>
                    <el-form-item label="剂量" prop="dose">
                        <el-input-number v-model="form.dose" :precision="2" :step="0.1" :max="10000"></el-input-number>
                    </el-form-item>
                    <el-form-item label="剂量单位" prop="doseUnit">
                        <el-input v-model="form.doseUnit" placeholder="请输入包装单位"></el-input>
                    </el-form-item>
                      <el-form-item label="包装单位" prop="packUnit">
                        <el-input v-model="form.packUnit" placeholder="请输入包装单位"></el-input>
                    </el-form-item>
                    <el-form-item label="产地" prop="factoryName">
                        <el-input v-model="form.factoryName" placeholder="请输入产地"></el-input>
                    </el-form-item>
                    <el-form-item label="批准文号" prop="approvalNumber">
                        <el-input v-model="form.approvalNumber" placeholder="请输入批准文号"></el-input>
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
                drugName: '',
                tradeName: '',
                pinyinCode: '',
                specification: '',
                packUnit: '',
                price: '',
                dose: '',
                doseUnit: '',
                factoryName: '',
                approvalNumber: ''
            },

            rules: {
                drugName: [{ required: true, message: '请填写药品名', trigger: 'blur' }],
                tradeName: [{ required: true, message: '请填写商品名', trigger: 'blur' }],
                pinyinCode: [{ required: true, message: '请填写拼音码', trigger: 'blur' }],
                specification: [{ required: true, message: '请填写规格', trigger: 'blur' }],
                price: [{ type: 'number', required: true, message: '请填写价格', trigger: 'blur' }],
                dose: [{ type: 'number', required: true, message: '请填写剂量', trigger: 'blur' }],
                  packUnit: [{ required: true, message: '请填写包装单位', trigger: 'blur' }],
                doseUnit: [{ required: true, message: '请填写剂量单位', trigger: 'blur' }],
                factoryName: [{ required: true, message: '请填写生产地址', trigger: 'blur' }],
                approvalNumber: [{ required: true, message: '请填写批准文号', trigger: 'blur' }]
            }
        };
    },
    methods: {
        onSubmit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let params = this.form;
                    this.$axios
                        .post('/drug/addDrug', params, {
                            headers: { 'Content-Type': 'application/json;charset=utf-8', token: localStorage.getItem('token') } //头部信息
                        })
                        .then((response) => {
                            if (response.rspCode == '200') {
                                this.$message.success(response.rspMsg);
                                this.$router.push('/medic');
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
            this.$router.push('/medic');
        }
    },
    created() {
        let id = this.$route.query.id?this.$route.query.id:-1;
        this.$axios
            .get('/drug/index', {
                params: {
                    drugId: id
                },
                headers: {
                    token: localStorage.getItem('token'),
                    'Content-Type': 'application/json;charset=utf-8' //头部信息
                }
            })
            .then((response) => {
                if (response.rspCode == '201') {
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
