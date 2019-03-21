<template>
  <div id="updatepassword-div">
    <div id="updatepassword-form">
      <el-form size="large" :model="updatepassword" status-icon :rules="updatepasswordrules" ref="updatepasswordform" label-width="100px" class="demo-ruleForm">
        <el-form-item label="原密码" prop="password">
          <el-input type="password" v-model.number="updatepassword.password"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="pass">
          <el-input type="password" v-model="updatepassword.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="checkPass">
          <el-input type="password" v-model="updatepassword.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">修改密码</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Updatepassword',
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
        /** 此处正则式应该定义为常量，这种方法不可取 */
      } else if (!/^[a-zA-Z0-9]{6,16}$/.test(value)) {
        callback(new Error('密码必须为6-16位字母、数字'))
      } else {
        if (this.updatepassword.checkPass !== '') {
          this.$refs['updatepasswordform'].validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.updatepassword.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      updatepassword: {
        password: '',
        pass: '',
        checkPass: ''
      },
      updatepasswordrules: {
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm () {
      this.$refs['updatepasswordform'].validate((valid) => {
        if (valid) {
          this.axios.post(this.URLS.dochubapi + '/users/updatePassword', this.qs.stringify({
            oldpassword: this.updatepassword.password,
            newpassword: this.updatepassword.pass
          })).then((response) => {
            if (response.data.status === '1') {
              this.$message('密码修改成功')
            } else {
              this.$message('密码修改失败')
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm () {
      this.$refs['updatepasswordform'].resetFields()
    }
  }
}
</script>

<style>
#updatepassword-div {
  width: 100%;
  height: 100%;
}
#updatepassword-form {
  padding-top: 30px;
  padding-left: 30px;
}
</style>
