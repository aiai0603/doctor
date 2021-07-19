<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> 医生管理 </el-breadcrumb-item>
                <el-breadcrumb-item>新增医生</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="100px" :rules="rules">
                    <el-form-item label="医生名" prop="doctorName">
                        <el-input v-model="form.doctorName" placeholder="请输入医生姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号" prop="phone">
                        <el-input v-model="form.phone" placeholder="请输入医生手机号"></el-input>
                    </el-form-item>

                    <el-form-item label="医生科室" prop="deptName">
                        <el-input v-model="form.deptName" placeholder="请输入医生科室"></el-input>
                    </el-form-item>

                    <el-form-item label="医生职称" prop="levelCode">
                        <el-select v-model="form.levelCode" placeholder="请选择" @change="change()">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="用户头像" prop="avatarUrl">
                        <el-upload
                            style="width: 178px"
                            class="avatar-uploader"
                            action="http://10.67.128.25:8088/api/upload"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload"
                            :limit="1"
                        >
                            <img v-if="form.avatarUrl" :src="form.avatarUrl" class="avatar" />
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
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
                doctorName: '',
                avatarUrl: '',
                deptName: '',
                levelCode: '',
                levelName: '',
                phone: ''
            },

            options: [
                {
                    value: '1',
                    label: '主任医师'
                },
                {
                    value: '2',
                    label: '副主任医师'
                },
                {
                    value: '3',
                    label: '主治医师'
                },
                {
                    value: '4',
                    label: '医师'
                },
                {
                    value: '5',
                    label: '医士'
                }
            ],

            rules: {
                doctorName: [{ required: true, message: '请填写医生姓名', trigger: 'blur' }],
                avatarUrl: [{ required: true, message: '请上传头像', trigger: 'blur' }],
                deptName: [{ required: true, message: '请填写科室名称', trigger: 'blur' }],
                levelCode: [{ required: true, message: '请填写医生职称', trigger: 'blur' }],
                phone: [
                    { required: true, message: '请填写医生手机', trigger: 'blur' },
                    { min: 11, max: 11, message: '请输入11位手机号', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        handleAvatarSuccess(res, file) {
            this.form.avatarUrl = res.data[0];
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },

        change(e) {
            console.log(e);
        },
        onSubmit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let params = this.form;
                    this.$axios
                        .post('/doctor/addDoctor', params, {
                            headers: { 'Content-Type': 'application/json;charset=utf-8', token: localStorage.getItem('token') } //头部信息
                        })
                        .then((response) => {
                            if (response.rspCode == '200') {
                                this.$message.success(response.rspMsg);
                                this.$router.push('/doctor');
                            } else {
                                this.$message.error(response.data);
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
            this.$router.push('/doctor');
        }
    },
    created() {
        let id = this.$route.query.id ? this.$route.query.id : -1;
        this.$axios
            .get('/doctor/findDoctor', {
                params: {
                    doctorId: id
                },
                headers: {
                    token: localStorage.getItem('token'),
                    'Content-Type': 'application/json;charset=utf-8' //头部信息
                }
            })
            .then((response) => {
                console.log(response.data)
                if (response.rspCode == '200') {
                    if (id != -1) {
                        var temp = response.data.doctor 
                        temp.phone = response.data.phone
                        this.form = temp
                      
                    }
                } else {
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
};
</script>
<style>
.el-upload {
    width: 178px !important;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409eff;
    width: 178px !important;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>

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
