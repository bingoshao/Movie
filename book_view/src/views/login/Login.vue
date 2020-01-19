<template>
    <div class="smj-login">
        <el-form 
        :model="ruleForm" 
        status-icon 
        :rules="rules" 
        ref="ruleForm" 
        label-width="auto"
        size="small"
        class="demo-ruleForm">
            <el-form-item label="用户" prop="name">
                <el-input v-model="ruleForm.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item class="smj-login-submit">
                <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                <el-button @click="resetForm('ruleForm')">注册</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
      var validateName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
            name:'admin',
            password: 'admin',
        },
        rules: {
          name: [
            { validator: validateName, trigger: 'blur' }
          ],
          checpasskPass: [
            { validator: validatePass, trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            sessionStorage.setItem("token",'11111111')
            this.$router.push('/home')
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
};
</script>

<style lang="less">
.smj-login {
    position: absolute;
    text-align: center;
    left: 50%;
    top: 300px;
    width: 400px;
    margin-left: -200px;
    padding: 10px;
    background: @color-white;
    border-radius: 10px;
    border: 1px solid @color-border-light;
    &-submit {
        margin-bottom: 0 !important;
         .el-form-item__content {
            margin-left: 0 !important;
        }
    }
}

</style>
