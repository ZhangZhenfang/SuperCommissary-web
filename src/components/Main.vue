<template>
  <div id="main">
    <div id="main-div-menu"><Menu :menuActiveIndex="menuActiveIndex"></Menu></div>
    <div id="main-wall"></div>
    <div id="main-div-router"><router-view  v-on:updateActivindex="updateActivindex"/></div>
    <div id="main-div-footer"><Footer></Footer></div>
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
    updateActivindex (index) {
      this.menuActiveIndex = index
    }
  },
  data () {
    return {
      message: 'This is content.',
      menuActiveIndex: '1'
    }
  }
}
</script>

<style>
#main {
  margin: 10px 150px 5px 150px;
  height: 98%;
  border: 1px solid green;
}
#main-div-menu {
  width: 100%;
  float: left;
  height: 12%;
}
#main-div-router {
  width: 99%;
  float: left;
}
#main-wall {
  width: 0%;
  float: left;
  height: 77%;
  border: 1px solid rgb(63, 0, 235);
}
#main-div-footer {
  margin-top: 40px;
  width: 100%;
  float: left;
  height: 85px;
}
</style>
