<template>
  <div id="top-div">
    <div id="top-left-div" class="top-div">
      <p>SuperCommissary</p>
    </div>
    <div id="top-mid-div" class="top-div">
      <el-menu size="small" :default-active="menuActiveIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">上传文件</el-menu-item>
        <el-menu-item index="2">我的公告</el-menu-item>
        <el-menu-item index="3">我的表格</el-menu-item>
        <el-menu-item index="4">填写表格</el-menu-item>
      </el-menu>
    </div>
    <div id="top-right-div" class="top-div">
      <el-dropdown>
        <span class="el-dropdown-link">
          <!-- @click的值加不加括号问题 -->
          <span @click="clickUserName()">{{ innerusername }}</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item><p @click="gotoUsercenter()">个人中心</p></el-dropdown-item>
          <el-dropdown-item><p @click="logout()">注销</p></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import UserApi from '../api/UserApi'
export default {
  name: 'Menu',
  props: ['menuActiveIndex', 'username'],
  data () {
    return {
      innerusername: this.username
    }
  },
  /** 监听父组件'username'改动后修改自己的属性值 */
  watch: {
    username: function (newV, oldV) {
      // console.log(newV, oldV)
      this.innerusername = newV
    }
  },
  mounted () {
    this.axios.get(this.URLS.dochubapi + '/users/getUserinfo').then((response) => {
      if (response.data.status === 0) {
        this.innerusername = '请登录'
        this.$router.push('/main/login')
      } else {
        this.innerusername = response.data.data.name
      }
    }).catch((error) => {
      console.log(error)
    })
  },
  methods: {
    logout () {
      /** 此处传this给过去有些不妥 */
      UserApi.logout(this)
    },
    gotoUsercenter () {
      this.$router.push('/main/usercenter')
    },
    clickUserName () {
      if (this.innerusername === '请登录') {
        this.$router.push('/main/login')
      }
    },
    handleSelect (key, keyPath) {
      // console.log(key)
      switch (key) {
        case '1':
          this.$router.push('/main/upfile')
          break
        case '2':
          this.$router.push('/main/notice')
          break
        case '3':
          this.$router.push('/main/uptable')
          break
        case '4':
          this.$router.push('/main/mytable')
          break
        default:
          this.$router.push('/main/upfile')
      }
    }
  }
}
</script>
<style>
  #top-div {
    height: 100%;
    width: 100%;
  }
  #top-left-div {
    width: 25%;
    text-align: center;
    font-size: 18px;
  }
  #top-right-div {
    width: 15%;
    margin-top: 19px;
  }
  #top-mid-div {
    width: 59%;
  }
  .top-div {
    margin-bottom: 20px;
    float: left;
    height: 60px;
    padding: 30px 0px 0px 0px;
    /* border: 1px solid black; */
  }
  .el-dropdown-link {
    cursor: pointer;
    color: rgb(0, 0, 0);
  }
  .el-icon-arrow-down {
    font-size: 16px;
  }
  .el-menu-item {
    font-size: 18px;
  }
</style>
