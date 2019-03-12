<template>
  <div id="top-div">
    <div id="top-left-div" class="top-div">
      this is left
    </div>
    <div id="top-mid-div" class="top-div">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">处理中心</el-menu-item>
        <el-menu-item index="2">处理中心</el-menu-item>
        <el-menu-item index="3">消息中心</el-menu-item>
        <el-menu-item index="4">订单管理</el-menu-item>
      </el-menu>
    </div>
    <div id="top-right-div" class="top-div">
      <el-dropdown>
        <span class="el-dropdown-link">
          张振方<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>注销</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- this is right -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key)
      switch (key) {
        case '1':
          console.log()
          this.$router.push('/main/upfile')
          break
        case '2':
          console.log()
          this.$router.push('/main/notice')
          break
        case '3':
          console.log()
          this.$router.push('/main/mytable')
          break
        case '4':
          console.log()
          this.$router.push('/main/uptable')
          break
        default:
          console.log()
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
    font-size: 12px;
  }
</style>
