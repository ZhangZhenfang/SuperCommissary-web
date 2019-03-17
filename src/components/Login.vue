<template>
  <div id="login">
    <div id="advertisement">
      <el-carousel height="150px">
      <el-carousel-item v-for="item in ads" :key="item.id">
        <img :src="item.url">
        <!-- <h3>{{ item }}</h3> -->
      </el-carousel-item>
    </el-carousel>
    </div>
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
      ads: [
        {
          id: 1,
          url:'https://s2.best-wallpaper.net/wallpaper/1920x1200/1201/Two-pink-chrysanthemum_1920x1200.jpg'
        },
        {
          id: 2,
          url:'../assets/img2.jpg'
        }
      ],
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
  }
}
</script>
<style scoped>
#login {
  width: 100%;
  height: 500px;
  background-color: whitesmoke;
  margin-top: 30px;
}
#advertisement {
  width: 60%;
  float: left;
  border: 1px solid red;
}
#login-div {
  padding-top: 150px;
  padding-right: 60px;
  height: 350px;
  width: 35%;
  float: left;
  border: 1px solid rgb(0, 0, 0);
  text-align: center;
  background-color: white;
}
</style>
