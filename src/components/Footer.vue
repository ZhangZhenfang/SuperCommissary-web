<template>
  <div id='footer-div'>
    <p class="copyrigth">
      <img id="footer-github-img" src="../assets/github.png" />
      <a href="https://github.com/ZhangZhenfang/SuperCommissary-web" target="_Blank">
        {{ message }}
      </a>
      <br>
      <a href="http://www.miitbeian.gov.cn" target="_Blank">
        豫ICP备17042318号-1
      </a>
    </p>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {
      message: 'SuperCommissary'
    }
  }
}
</script>

<style>
#footer-div a:hover {
  color: rgb(180, 172, 255);
  text-decoration: underline;
}
#footer-div a {
  color: rgb(0, 0, 0);
  text-decoration: none;
}
#footer-github-img {
  width: 25px;
  height: 25px;
}
#footer-div {
  height: 86px;
  width: 100%;
  background-color: rgb(224, 224, 224);
  /* border: 1px solid black; */
}
.copyrigth {
  padding-top: 15px;
  height: 86px;
  text-align: center;
  font-size: 16px;
  line-height: 35px;
  color: #666697;
}
</style>
