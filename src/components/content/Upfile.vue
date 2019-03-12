<template>
  <div id="upfile-div">
    <div id="upfile-left">
      <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item  v-for="notice in notices" :key="notice.noticeid" :name="notice.noticeid">
        <template slot="title">{{ notice.noticeid }}</template>
        {{ notice.notice }}
      </el-collapse-item>
    </el-collapse>
    </div>
    <div id="upfile-right">
      <div id="upfile-right-top"></div>
      <div id="upfile-right-bottom"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Upfile',
  data () {
    return {
      activeNames: ['0'],
      notices: [
        {
          noticeid: 1,
          notice: 'asdf'
        },
        {
          noticeid: 2,
          notice: 'asdfjhgf'
        }
      ],
      message: 'this is upfile.'
    }
  },
  methods: {
    handleChange (val) {
      console.log(val)
    }
  }
}
</script>

<style>
#upfile-div {
  width: 100%;
  height: 500px;
}
#upfile-left {
  float: left;
  width: 59%;
  border: 1px solid black;
}
#upfile-right {
  float: left;
  width: 40%;
  height: 100%;
  border: 1px solid black;
}
#upfile-right-top {
  width: 99%;
  height: 30%;
  border: 1px solid black;
}
#upfile-right-botton {
  width: 99%;
  height: 70%;
  border: 1px solid black;
}
</style>
