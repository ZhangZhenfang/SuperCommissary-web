<template>
  <div id="uptable-div">
    <div id="uptable-advertisement-div">
      <Advertisement></Advertisement>
    </div>
    <div id="uptable-form-div">
      <el-form ref="ruleForm" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="Excel文件" prop="name">
        <el-tooltip class="item" effect="light" placement="top-start">
          <div style="font-size:18px;" slot="content">只能解析.xls或者.xlsx文件，表格第一行不能为空行，否则解析错误</div>
          <el-input ref="excel-file-input" v-model="form.name" type="file" />
        </el-tooltip>
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
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button type="primary" @click="gobackMyTable">返回我的表格</el-button>
      </el-form-item>
    </el-form>
    </div>
  </div>
</template>

<script>
import Advertisement from './login/Advertisement'
import {formatDate} from '../../util/date.js'
export default {
  name: 'Newtable',
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
          { required: true, message: '请输入活动名称', trigger: 'blur' }
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
    gobackMyTable () {
      this.$router.push('/main/uptable')
    },
    onSubmit () {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          var data = {
            startdate: formatDate(this.form.startdate, 'yyyy-MM-dd'),
            starttime: formatDate(this.form.starttime, 'hh:mm:ss'),
            deadlinedate: formatDate(this.form.deadlinedate, 'yyyy-MM-dd'),
            deadlinetime: formatDate(this.form.deadlinetime, 'hh:mm:ss'),
            description: this.form.desc
          }
          var file = this.$refs['excel-file-input'].getInput().files[0]
          if (!/(.xls|.xlsx)$/.test(file.name)) {
            this.$message('只能上传以xls和xlsx结尾的文件！')
          } else {
            var formdata = new FormData()
            for (var x in data) {
              formdata.append(x, data[x])
            }
            formdata.append('filedata', file)
            this.newExcel(formdata)
          }
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
    newExcel (data) {
      this.axios.post(this.URLS.dochubapi + '/excels/uploadExcel', data).then((res) => {
        if (res.data.status === '1') {
          this.$refs['ruleForm'].resetFields()
          this.$message('上传成功！')
        } else {
          this.$refs['ruleForm'].resetFields()
          this.$message('上传失败！')
        }
      })
    }
  },
  mounted () {
    this.$emit('updateActivindex', '3')
  }
}
</script>

<style>
#uptable-div {
  width: 90%;
  margin: 0 auto;
  padding-top: 30px;
}
#uptable-form-div {
  padding-top: 90px;
  width: 38%;
  height: 600px;
  float: left;
  margin-left: 30px;
}
#uptable-advertisement-div {
  width: 55%;
  height: 600px;;
  float: left;
  /* border: 1px solid pink; */
}
</style>
