<template>
  <div id="usercenter-div">
    <div id="usercenter-left-div">
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo">
        <el-menu-item index="1" @click="select(1)">
          <i class="el-icon-menu"></i>
          <span slot="title">个人信息</span>
        </el-menu-item>
        <el-menu-item index="2" @click="select(2)">
          <i class="el-icon-menu"></i>
          <span slot="title">我的关注</span>
        </el-menu-item>
        <el-menu-item index="3" @click="select(3)">
          <i class="el-icon-document"></i>
          <span slot="title">修改密码</span>
        </el-menu-item>
        <el-menu-item index="4" @click="select(4)">
          <i class="el-icon-setting"></i>
          <span slot="title">注销登录</span>
        </el-menu-item>
      </el-menu>
      </div>
    <div id="usercenter-right-div">
      <component v-bind:is="currentTabComponent"></component>
    </div>
  </div>
</template>

<script>
import Userinfo from './usercenter/Userinfo'
import Updatepassword from './usercenter/Updatepassword'
import Friends from './usercenter/Friends'
export default {
  name: 'Usercenter',
  components: { Userinfo, Updatepassword, Friends },
  data () {
    return {
      currentTabComponent: Userinfo
    }
  },
  methods: {
    select (index) {
      console.log(index)
      if (index === 1) {
        this.currentTabComponent = Userinfo
      } else if (index === 2) {
        this.currentTabComponent = Friends
      } else if (index === 3) {
        this.currentTabComponent = Updatepassword
      } else if (index === 4) {
        console.log(4)
      }
    }
  }
}
</script>

<style>
#usercenter-div {
  height: 600px;
  width: 90%;
  margin: 30px auto;
}
#usercenter-left-div {
  width: 20%;
  height: 100%;
  float: left;
  border: 1px solid yellow;
}
#usercenter-right-div {
  width: 79%;
  height: 100%;
  float: left;
  border: 1px solid purple;
}
</style>
