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
            <el-form-item label="用户" prop="username">
                <el-input v-model="ruleForm.username" autocomplete="off"></el-input>
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
            username:'admin',
            password: 'admin',
        },
        rules: {
          username: [
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
        let self = this
        self.$refs[formName].validate((valid) => {
          if (valid) {
           self.$api.loginApi.login(self.ruleForm)
            .then(res => {
              if(res.data.code<=0) {
                window.localStorage.setItem("token",res.data.data.token)
              }
            })
            // this.$router.push('/home')
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
