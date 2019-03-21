<template>
  <div id="userinfo-div">
    <el-form ref="userinfoform" :model="userinfo" label-width="80px" size="large" :rules="userinforules">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="userinfo.name" v-bind:disabled="readonly"></el-input>
      </el-form-item>
      <el-form-item label="学校" prop="school">
        <el-input v-model="userinfo.school" v-bind:disabled="readonly"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="phonenumber">
        <el-input v-model="userinfo.phonenumber" v-bind:disabled="readonly"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="userinfo.email" v-bind:disabled="readonly"></el-input>
      </el-form-item>
      <el-form-item label="学院" prop="institute">
        <el-input v-model="userinfo.institute" v-bind:disabled="readonly"></el-input>
      </el-form-item>
      <el-form-item label="专业" prop="major">
        <el-input v-model="userinfo.major" v-bind:disabled="readonly"></el-input>
      </el-form-item>
      <el-form-item size="large">
        <el-button @click="edit">编辑</el-button>
        <!--
          @click得值加与不加括号的区别在于事件对象参数 event 的处理。
          不加括号时，函数第一个参数为 event，加了括号后，需要手动传入 $event 才能获得事件对象
        -->
        <el-button type="primary" @click="onSubmit" v-bind:disabled="readonly">提交</el-button>
        <el-button @click="cancleEdit" v-bind:disabled="readonly">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      readonly: true,
      userinfo: {
        name: '',
        school: '',
        email: '',
        institute: '',
        phonenumber: '',
        major: ''
      },
      userinforules: {
        name: [
          { required: true, message: '姓名不能为空', trigger: 'change' }
        ],
        school: [
          { required: true, message: '学校不能为空', trigger: 'change' }
        ],
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'change' }
        ],
        institute: [
          { required: true, message: '学院不能为空', trigger: 'change' }
        ],
        phonenumber: [
          { required: true, message: '电话不能为空', trigger: 'change' }
        ],
        major: [
          { required: true, message: '专业不能为空', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    edit () {
      this.readonly = false
    },
    cancleEdit () {
      this.readonly = true
      this.getUserinfo()
    },
    onSubmit () {
      this.$refs['userinfoform'].validate((valid) => {
        if (valid) {
          this.axios.post(this.URLS.dochubapi + '/users/updateUserinfo', this.qs.stringify({
            name: this.userinfo.name,
            email: this.userinfo.email,
            school: this.userinfo.school,
            institute: this.userinfo.institute,
            phonenumber: this.userinfo.phonenumber,
            major: this.userinfo.major
          })).then((response) => {
            if (response.data.status === 0) {
              this.innerusername = '请登录'
              this.$router.push('/main/login')
            } else if (response.data.status === '1') {
              this.$message('修改成功')
              this.readonly = true
            } else {
              this.$message('修改失败')
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
    getUserinfo () {
      this.axios.get(this.URLS.dochubapi + '/users/getUserinfo'
      ).then((response) => {
        console.log(response)
        if (response.data.status === 0) {
          this.innerusername = '请登录'
          this.$router.push('/main/login')
        } else {
          this.userinfo = response.data.data
        }
      }).catch((error) => {
        console.log(error)
      })
    }
  },
  mounted () {
    this.getUserinfo()
  }
}
</script>

<style>
#userinfo-div {
  padding-top: 30px;
  padding-left: 30px;
  /* border: 1px solid yellowgreen; */
}
.el-input {
  width: 500px;
}
</style>
