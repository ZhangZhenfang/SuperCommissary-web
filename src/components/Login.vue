<template>
  <div id="login">
    <div id="advertisement">
      <Advertisement></Advertisement>
    </div>
    <div id="login-div">
      <Loginform :username="username" v-on:updateUsername="updateMainUsername"></Loginform>
    </div>
  </div>
</template>
<script>
import Loginform from './content/login/Loginform'
import Advertisement from './content/login/Advertisement'
export default {
  name: 'Login',
  props: ['username', 'updateUsername'],
  components: { Loginform, Advertisement },
  data () {
    return {
      ruleForm2: {
        account: '',
        password: ''
      }
    }
  },
  methods: {
    updateMainUsername (username) {
      this.$emit('updateUsername', username)
    }
  },
  mounted () {
    this.updateMainUsername('请登录')
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
  /* border: 1px solid red; */
}
#login-div {
  height: 600px;
  width: 39%;
  float: left;
  border: 1px solid rgb(0, 0, 0);
  text-align: center;
  background-color: rgb(255, 236, 151);
}
</style>
