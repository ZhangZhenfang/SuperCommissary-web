<template>
  <el-container>
    <el-header>Header</el-header>
    <el-main>main</el-main>
    <el-footer>Footer</el-footer>
</el-container>
</template>

<script>
export default {
  name: 'Test'
}
</script>

<style>
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
  min-height: 300px;
}

body > .el-container {
  margin-bottom: 40px;
}
</style>
