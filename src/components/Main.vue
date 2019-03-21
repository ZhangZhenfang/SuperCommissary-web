<template>
  <div id="main">
    <div id="main-div-menu">
      <Menu :menuActiveIndex="menuActiveIndex" :username="username"></Menu>
    </div>
    <div id="main-div-router">
      <router-view  v-on:updateUsername="updateUsername" v-on:updateActivindex="updateActivindex"/>
    </div>
    <div id="main-div-footer">
      <Footer></Footer>
    </div>
  </div>
</template>
<script>
import Menu from './Menu.vue'
import Footer from './Footer.vue'

export default {
  name: 'Main',
  components: { Menu, Footer },
  mounted () {
  },
  methods: {
    updateUsername (username) {
      this.username = username
    },
    updateActivindex (index) {
      this.menuActiveIndex = index
    }
  },
  data () {
    return {
      username: '请登录',
      message: 'This is content.',
      /** computed和watch的区别 */
      menuActiveIndex: '1'
    }
  }
}
</script>

<style>
#main {
  margin: 0 auto;
  height: 100%;
  width: 95%;
  border: 1px solid green;
}
#main-div-menu {
  width: 100%;
  float: left;
  height: 75px;
}
#main-div-router {
  width: 100%;
  float: left;
  margin-top: 30px;
  min-height: 750px;
}
#main-div-footer {
  margin-top: 40px;
  width: 100%;
  float: left;
  line-height: 85px;
  height: 85px;
}
</style>
