<template>
  <div id='footer-div'>
    {{ message }}
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {
      message: 'this is footer'
    }
  }
}
</script>

<style>
#footer-div {
  border: 1px solid black;
}
</style>
