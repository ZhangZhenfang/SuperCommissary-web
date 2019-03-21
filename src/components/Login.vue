<template>
  <div id="login">
    <div id="advertisement">
      <el-carousel height="500px">
      <el-carousel-item v-for="item in ads" :key="item.id">
        <a :href="item.linkUrl" target="_blank">
          <p>{{ item.title }}</p>
          <img :src="item.url">
        </a>
        <!-- <h3>{{ item }}</h3> -->
      </el-carousel-item>
    </el-carousel>
    </div>
    <div id="login-div">
      <div id="login-form-div">
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
          <el-form-item label="账 号" prop="account">
            <el-input prefix-icon="el-icon-date" size="large" minlength="100" autofocus type="text" v-model="ruleForm2.account"
              autocomplete="off">
            </el-input>
          </el-form-item>
          <el-form-item label="密 码" prop="password">
            <el-input prefix-icon="el-icon-date" size="large" minlength="100" type="password" v-model="ruleForm2.password"
              autocomplete="off">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="large" type="primary" @click="submitForm('ruleForm2')">登录</el-button>
            <el-button size="large" @click="resetForm('ruleForm2')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      {{ loginStatus }}
    </div>
  </div>
</template>
<script>
import URLS from '../json/urls.json'
export default {
  name: 'Login',
  props: ['username', 'updateUsername'],
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
          url: 'http://www.cqut.edu.cn/__local/E/57/C6/54ED068355A1FE57D7095772D75_C0BCB19D_1418E.jpg',
          title: '《重庆理工大学学报（社会科学）》在“2018年度人大复印报刊资料精选佳作（上）”获得佳绩',
          linkUrl: 'http://www.cqut.edu.cn/info/1008/18582.htm'
        },
        {
          url: 'http://www.cqut.edu.cn//__local/A/61/AC/C76B4F3FC38A4B9031143004660_A5E58530_15079.jpg',
          title: '我校举办两性健康生理卫生讲座',
          linkUrl: 'http://www.cqut.edu.cn/info/1008/18578.htm'
        },
        {
          id: 3,
          url: 'http://www.cqut.edu.cn//__local/6/03/27/61EB6B24CD73CFD0C1E79B3501C_1E7BE098_13947.jpg',
          title: '我校成功举办2019届毕业生（财会、经管类）双选会',
          linkUrl: 'http://www.cqut.edu.cn/info/1008/18577.htm'
        },
        {
          id: 4,
          url: 'http://www.cqut.edu.cn//__local/3/26/B8/D07566CAA1C06B4B966AAE9CA4F_E9B98530_14204.jpg',
          title: '校第三届教职工代表大会暨工会会员代表大会第三次会议胜利闭幕',
          linkUrl: 'http://www.cqut.edu.cn/info/1008/18572.htm'
        },
        {
          id: 5,
          url: 'http://www.cqut.edu.cn//__local/0/30/E7/9BEDA4D5BB87038EC27B31CD726_C060D2BE_1104C.jpg',
          title: '副校长廖林清一行到药学与生物工程学院调研',
          linkUrl: 'http://www.cqut.edu.cn/info/1008/18570.htm'
        },
        {
          id: 6,
          url: 'http://www.cqut.edu.cn//__local/8/02/65/FA388D12D261F87C2F951CA7181_5003CCD5_340CE.jpg',
          title: '学校选派4名干部赴万州区担任贫困村第一书记',
          linkUrl: 'http://www.cqut.edu.cn/info/1008/18569.htm'
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
            URLS.dochubapi + '/users/auth',
            {
              params: this.ruleForm2
            }
          ).then((response) => {
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
  }
}
</script>
<style scoped>
#login {
  width: 100%;
  height: 600px;
  background-color: gainsboro;
  margin-top: 60px;
}
#advertisement {
  padding-top: 10px;
  width: 60%;
  height: 590px;
  float: left;
  text-align: center;
  border: 1px solid red;
}
#advertisement a:hover {
  color: rgb(25, 0, 255);
  text-decoration: none;
}
#advertisement a {
  color: rgb(0, 0, 0);
  text-decoration: none;
}
#advertisement p {
  height: 15px;
}

#advertisement img {
  height: 480px;
  width: 96%;
}
#login-div {
  height: 600px;
  width: 39%;
  float: left;
  border: 1px solid rgb(0, 0, 0);
  text-align: center;
  background-color: rgb(255, 236, 151);
  line-height: 600px;
}
#login-form-div {
  padding-top: 200px;
  width: 450px;
  height: 400px;
  margin: 0 auto;
  border: 1px solid green;
  background-color: wheat;
}
#login-form-div .el-form-item__label {
  font-size: 25px;
}
.el-input {
  width:350px;
}
</style>
