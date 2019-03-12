<template>
  <div id="main">
    <div class="main-div"><Menu></Menu></div>
    <div class="main-div"><router-view/></div>
    <div class="main-div"><Footer></Footer></div>
  </div>
</template>
<script>
import Menu from './Menu.vue'
import Footer from './Footer.vue'

export default {
  name: 'Main',
  components: { Menu, Footer },
  data () {
    return {
      message: 'This is content.'
    }
  }
}
</script>

<style>
#main {
  margin: 10px 150px 60px 150px;
}
.main-div {
  width: 100%;
  float: left;
}
</style>
