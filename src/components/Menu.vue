<template>
  <div id="top-div">
    <div id="top-left-div" class="top-div">
      <h2>SuperCommissary</h2>
    </div>
    <div id="top-mid-div" class="top-div">
      <el-menu size="large" :default-active="menuActiveIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">上传文件</el-menu-item>
        <el-menu-item index="2">我的公告</el-menu-item>
        <el-menu-item index="3">上传表格</el-menu-item>
        <el-menu-item index="4">填写表格</el-menu-item>
      </el-menu>
    </div>
    <div id="top-right-div" class="top-div">
      <el-dropdown>
        <span class="el-dropdown-link">
          <span @click="clickUserName()">{{ username }}</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>注销</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  props: ['menuActiveIndex'],
  data () {
    return {
      username: '请登录'
    }
  },
  mounted () {
    this.axios.get(
      'http://www.the15373.com/users/getUserinfo'
    ).then((response) => {
      console.log(response)
      if (response.data.status === 0) {
        this.username = '请登录'
        this.$router.push('/main/login')
      } else {
        this.username = response.data.data.name
      }
    }).catch((error) => {
      console.log(error)
    })
  },
  methods: {
    clickUserName () {
      if (this.username === '请登录') {
        this.$router.push('/main/login')
      }
    },
    handleSelect (key, keyPath) {
      console.log(key)
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
  #menu-div {
    font-size: 50px;
  }
  #top-left-div {
    width: 30%;
    text-align: center;
  }
  #top-right-div {
    width: 20%;
    margin-top: 19px;
  }
  #top-mid-div {
    width: 49%;
  }
  .top-div {
    margin-bottom: 20px;
    float: left;
    height: 60px;
    padding: 30px 0px 0px 0px;
    border: 1px solid black;
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
