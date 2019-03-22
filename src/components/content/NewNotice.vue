<template>
  <div id="newnotice-div">
    <div id="newnotice-advertisement-div">
      <Advertisement></Advertisement>
    </div>
    <div id="newnotice-form-div">
      <el-form ref="ruleForm" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="公告名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item prop="startdate" label="开始时间">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.startdate" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item prop="starttime">
        <el-col :span="11">
          <el-time-picker  prop="starttime" type="fixed-time" placeholder="选择时间" v-model="form.starttime" style="width: 100%;"></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item prop="deadlinedate" label="结束时间">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.deadlinedate" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item prop="deadlinetime">
        <el-col :span="11">
          <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.deadlinetime" style="width: 100%;"></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="注意事项" prop="desc">
        <el-input type="textarea" v-model="form.desc" placeholder="随便说点什么吧"></el-input>
      </el-form-item>
      <el-form-item>
        <!-- @click的值加不加括号的问题 -->
        <el-button type="primary" @click="onSubmit">立即新建</el-button>
        <el-button @click="goback">返回我的公告</el-button>
      </el-form-item>
    </el-form>
    </div>
  </div>
</template>

<script>
import Advertisement from './login/Advertisement'
import {formatDate} from '../../util/date.js'
export default {
  name: 'NewNotice',
  components: { Advertisement },
  data () {
    return {
      form: {
        name: '',
        startdate: '',
        starttime: '',
        deadlinedate: '',
        deadlinetime: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入公告名称', trigger: 'blur' }
        ],
        startdate: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        starttime: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        deadlinedate: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        deadlinetime: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '说点什么吧', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit () {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          var data = {
            notice: this.form.name,
            startdate: formatDate(this.form.startdate, 'yyyy-MM-dd'),
            starttime: formatDate(this.form.starttime, 'hh:mm:ss'),
            deadlinedate: formatDate(this.form.deadlinedate, 'yyyy-MM-dd'),
            deadlinetime: formatDate(this.form.deadlinetime, 'hh:mm:ss'),
            description: this.form.desc
          }
          this.newNotice(data)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    goback () {
      this.$router.push('/main/notice')
    },
    formatDate (time) {
      var date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    },
    newNotice (data) {
      this.axios.post(this.URLS.dochubapi + '/notices/newNotice', this.qs.stringify(data)).then((res) => {
        if (res.data.status === '1') {
          console.log('success')
          this.$message('新建公告成功！')
        } else {
          this.$message('新建公告失败！')
          console.log('error')
        }
      })
    }
  }
}
</script>

<style>
#newnotice-div {
  width: 100%;
  height: 100%;
  padding-top: 30px;
}
#newnotice-form-div {
  padding-top: 90px;
  width: 38%;
  height: 600px;
  float: left;
  margin-left: 30px;
}
#newnotice-advertisement-div {
  width: 55%;
  height: 600px;;
  float: left;
  /* border: 1px solid pink; */
}
</style>
