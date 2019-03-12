<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <el-button @click='gotoLogin()'>登录</el-button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to dochub!'
    }
  },
  methods: {
    gotoLogin () {
      this.$router.push('/login')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
