<template>
  <div>
    <el-form ref="form" :model="userinfo" label-width="80px" size="mini">
      <el-form-item label="姓名">
        <el-input v-model="userinfo.name"></el-input>
      </el-form-item>
      <el-form-item label="学号">
        <el-input v-model="userinfo.studentnumber"></el-input>
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      userinfo: {
        name: '张振方',
        studentnumber: '11503070303'
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    }
  }
}
</script>

<style>

</style>
