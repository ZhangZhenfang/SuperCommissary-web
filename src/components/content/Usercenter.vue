<template>
  <div id="usercenter-div">
    <div id="usercenter-left-div">
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo">
        <el-menu-item index="1" @click="select(1)">
          <i class="el-icon-info"></i>
          <span slot="title">个人信息</span>
        </el-menu-item>
        <el-menu-item index="2" @click="select(2)">
          <i class="el-icon-menu"></i>
          <span slot="title">我的关注</span>
        </el-menu-item>
        <el-menu-item index="3" @click="select(3)">
          <i class="el-icon-setting"></i>
          <span slot="title">修改密码</span>
        </el-menu-item>
        <el-menu-item index="4" @click="select(4)">
          <i class="el-icon-close"></i>
          <span slot="title">注销登录</span>
        </el-menu-item>
      </el-menu>
    </div>
    <!--
      这里采用vue的动态组件，可以方便的在不同组件之间进行动态切换，避免使用路由来进行组件之间的切换
      https://cn.vuejs.org/v2/guide/components.html#%E5%8A%A8%E6%80%81%E7%BB%84%E4%BB%B6
    -->
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
        this.axios.get(this.URLS.dochubapi + '/users/logout').then((response) => {
          if (response.data.status === '1') {
            this.$message('注销成功，即将跳转到登录页面')
            /** 这里采用箭头函数的方式，箭头函数和function定义的函数有些区别，this的指向不同 */
            setTimeout(() => this.$router.push('/main/login'), 1000)
          } else {
            this.$message('注销失败')
          }
        })
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
  /* border: 1px solid yellow; */
}
#usercenter-right-div {
  width: 79%;
  height: 100%;
  float: left;
  /* border: 1px solid purple; */
}
</style>
