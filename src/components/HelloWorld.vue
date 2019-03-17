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
      msg: 'Welcome to SuperCommissary!'
    }
  },
  methods: {
    gotoLogin () {
      this.$router.push('/main/login')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
