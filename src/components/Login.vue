<template>
  <div id="login-div">
    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
      <el-form-item label="账号" prop="account">
        <el-input size="medium" autofocus type="text" v-model="ruleForm2.account" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input size="medium" type="password" v-model="ruleForm2.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="medium" type="primary" @click="submitForm('ruleForm2')">登录</el-button>
        <el-button size="medium" @click="resetForm('ruleForm2')">重置</el-button>
      </el-form-item>
    </el-form>
    {{ loginStatus }}
  </div>
</template>
<script>
export default {
  name: 'Login',
  data () {
    var validateAccount = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账号'))
      } else {
        callback()
      }
    }
    var validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      ruleForm2: {
        account: '',
        password: ''
      },
      loginStatus: '',
      rules2: {
        account: [
          { validator: validateAccount, trigger: 'blur' }
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios.get(
            'http://www.the15373.com/users/auth',
            {
              params: this.ruleForm2
            }
          ).then((response) => {
            console.log(response)
            if (response.data.status !== '1' && response.data.status !== '2') {
              // alert('用户名或密码错误')
              this.loginStatus = '用户名或密码错误'
            } else {
              this.loginStatus = ''
              this.$router.push('/main')
            }
          }).catch((error) => {
            console.log(error)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.$refs[formName].$children[0].$children[0].focus()
    }
  }
}
</script>
<style scoped>
#login-div {
  position:absolute;
  top:50%;
  left:50%;
  margin-top:-150px;
  margin-left:-225px;
  padding:20px 40px 0px 0px;
  height:300px;
  width:450px;
  border:1px solid rgb(0, 0, 0);
  text-align: center;
}
</style>
