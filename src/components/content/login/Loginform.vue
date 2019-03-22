<template>
  <div id="login-form-div">
    <el-tabs type="border-card"  size="large">
      <el-tab-pane label="用户登录">
        <div id="login-form-login-div">
          <el-form :model="loginForm" status-icon :rules="rules2" ref="loginForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="账 号" prop="account">
              <el-input prefix-icon="el-icon-date" size="large" minlength="100" autofocus type="text"
                v-model="loginForm.account" autocomplete="off"  style="width: 350px">
              </el-input>
            </el-form-item>
            <el-form-item label="密 码" prop="password">
              <el-input prefix-icon="el-icon-date" size="large" minlength="100" type="password" v-model="loginForm.password"
                autocomplete="off" style="width: 350px">
              </el-input>
            </el-form-item>
            <el-form-item size="mini">
              {{ loginStatus }}
            </el-form-item>
            <el-form-item>
              <el-button size="large" type="primary" @click="submitForm('loginForm')">登录</el-button>
              <el-button size="large" type="primary" @click="resetForm('loginForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="用户注册">
        <div id="login-form-regist-div">
          <el-form :model="registForm" :rules="registFormRules" ref="registForm" label-width="100px">
            <el-form-item label="学号" prop="studentnumber">
              <el-input v-model="registForm.studentnumber"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
              <el-input v-model="registForm.name"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="registForm.password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkpassword">
              <el-input v-model="registForm.checkpassword"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="regist('registForm')">立即注册</el-button>
              <el-button type="primary" @click="resetForm('registForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import REGS from '../../../common/regs.js'
export default {
  name: 'Loginform',
  props: ['username', 'updateUsername'],
  data () {
    function validate (value, reg, callback) {
      if (value === '') {
        callback(new Error(reg.blankMsg))
      } else if (!reg.reg.test(value)) {
        callback(new Error(reg.msg))
      } else {
        callback()
      }
    }
    var validateAccount = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账号'))
      } else {
        callback()
      }
    }
    var validatePassword = (rule, value, callback) => {
      validate(value, REGS.password, callback)
    }
    var validateStudentnumber = (rule, value, callback) => {
      validate(value, REGS.studentnumber, callback)
    }
    var validateName = (rule, value, callback) => {
      validate(value, REGS.name, callback)
    }
    var validateCheckPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入确认密码'))
      } else if (value !== this.registForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
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
      },
      registFormRules: {
        name: [
          { required: true, validator: validateName, trigger: 'blur' }
        ],
        studentnumber: [
          { required: true, validator: validateStudentnumber, trigger: 'blur' }
        ],
        password: [
          { required: true, validator: validatePassword, trigger: 'blur' }
        ],
        checkpassword: [
          { required: true, validator: validateCheckPassword, trigger: 'blur' }
        ]
      },
      registForm: {
        account: '',
        name: '',
        studentnumber: '',
        password: '',
        checkpassword: '',
        phonenumber: 123,
        email: 123,
        school: 123,
        institute: 123,
        major: 123,
        sex: 'f'
      }
    }
  },
  methods: {
    regist (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.registForm.account = this.registForm.studentnumber
          this.axios.post(this.URLS.dochubapi + '/users/regist', this.qs.stringify(this.registForm)).then((response) => {
            if (response.data.status === '1') {
              this.$message('注册成功')
            } else {
              this.$message(response.data.errors)
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios.get(this.URLS.dochubapi + '/users/auth', { params: this.loginForm }).then((response) => {
            console.log(response)
            if (response.data.status !== '1' && response.data.status !== '2') {
              this.loginStatus = '用户名或密码错误'
            } else {
              this.loginStatus = ''
              /** 修改父组件的值 */
              this.$emit('updateUsername', response.data.name)
              this.$router.push('/main/upfile')
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
  },
  mounted () {
  }
}
</script>

<style>
#login-form-div {
  padding-top: 0px;
  width: 500px;
  height: 600px;
  margin: 0 auto;
  background-color: aquamarine;
}
#login-form-login-div {
  padding-top: 100px;
  padding-right: 50px;
  height: 420px;
}
#login-form-regist-div {
  padding-top: 100px;
  padding-right: 50px;
  height: 420px;
}
#login-form-div .el-form-item__label {
  font-size: 20px;
}
#login-form-div .el-tabs__item {
  height: 50px;
  width: 250px;
  font-size: 20px !important;
}
#login-form-div .el-button {
  font-size: 20px;
}
</style>
