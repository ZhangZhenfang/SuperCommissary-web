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
              <el-button :disabled='disableface' size="large" type="primary" @click="verifyface('loginForm')">刷脸登录</el-button>
            </el-form-item>
          </el-form>
          <el-dialog title="验证人脸" :visible.sync="videodialogVisible" width="400px" :before-close="handleCloseVideo">
            <VerifyVideo :stream="videoStream" :username="loginForm.account" v-on:handleResponse="handleResponse"></VerifyVideo>
        </el-dialog>
        </div>
      </el-tab-pane>
      <el-tab-pane label="用户注册">
        <div id="login-form-regist-div">
          <el-form :model="registForm" :rules="registFormRules" ref="registForm" label-width="120px">
            <el-form-item label="学号" prop="studentnumber">
              <el-input v-model="registForm.studentnumber"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
              <el-input v-model="registForm.name"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="registForm.password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkpassword">
              <el-input type="password" v-model="registForm.checkpassword"></el-input>
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
import { setTimeout } from 'timers'
import VerifyVideo from './VerifyVideo.vue'
export default {
  components: { VerifyVideo },
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
      disableface: false,
      videoStream: null,
      videodialogVisible: false,
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
              this.$message('注册成功，已自动登录')
              this.loginForm.account = this.registForm.account
              this.loginForm.password = this.registForm.password
              this.submitForm('loginForm')
              var that = this
              setTimeout(function () {
                that.axios.post(that.URLS.dochubapi + '/relations/addRelationship', that.qs.stringify({
                  account: '11503070303'
                })).then((response) => {
                  if (response.data.status === '1') {
                    that.$message('已关注用户11503070303，可在个人中心我的关注页面取关')
                  } else {
                    // this.$message('关注失败,' + response.data.errors)
                  }
                })
              }, 1000)
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
          var formData = new FormData()
          formData.append('account', this.loginForm.account)
          formData.append('password', this.loginForm.password)
          this.axios.post(this.URLS.dochubapi + '/users/auth', formData).then((response) => {
            this.handleResponse(response)
          }).catch((error) => {
            console.log(error)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleResponse (response) {
      console.log(response)
      if (response.data.status !== '1' && response.data.status !== '2') {
        this.loginStatus = '用户名或密码错误'
      } else {
        // this.handleCloseVideo()
        if (this.videoStream !== null) {
          this.videoStream.getTracks()[0].stop()
        }
        this.videoStream = null
        this.videodialogVisible = false
        this.loginStatus = ''
        /** 修改父组件的值 */
        this.$emit('updateUsername', response.data.name)
        this.$router.push('/main/upfile')
      }
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.$refs[formName].$children[0].$children[0].focus()
    },
    verifyface (formName) {
      console.log(this.loginForm)
      if (this.loginForm.account !== '') {
        this.videodialogVisible = true
        navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then(stream => {
          this.videoStream = stream
        })
      } else {
        this.$message('请先输入账号')
      }
    },
    handleCloseVideo (done) {
      console.log(this.videoStream)
      if (this.videoStream !== null) {
        this.videoStream.getTracks()[0].stop()
      }
      this.videoStream = null
      this.videodialogVisible = false
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
