<template>
  <div id="excel-div" ref="excel-div">
    <el-input placeholder="请输入内容">
      <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input>
    <el-button @click="newTable">上传表格</el-button>
    <el-collapse v-model="activeNames" @change="handleChange">
      <!-- 可能版本不一样下标和值得为之不一样 -->
      <el-collapse-item v-for="(excel, index) in excels" :name="excel.excelid" :key="excel.excelid">
        <template slot="title">
            <div id="uptable-title-left-div">
              <p class="el-collpase-item-title">{{ excel.filename }}</p>
            </div>
            <div id="uptable-title-right-div">
              <span>截止时间：{{ excel.deadline }}</span>
            </div>
        </template>
        <div :ref="'exceltotable' + excel.excelid">
          <el-button @click="excelToTable(index, excel)">查看</el-button>
          <el-button @click="downloadExcel(excel.excelid)">下载</el-button>
          <el-button @click="deleteExcel(excel.excelid)">删除</el-button>
          <!-- 根据show[index]的值进行组件的加载和渲染 -->
          <template v-if="show[index]">
            <!-- Exceltotable组件标签里添加属性可以把当前组件的值传递给Exceltotable组件 -->
            <Exceltotable :excelid="excel.excelid"></Exceltotable>
          </template>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import Exceltotable from './Exceltotable'

export default {
  name: 'Uptable',
  components: { Exceltotable },
  data () {
    return {
      activeNames: [],
      excels: [],
      /** 控制是否渲染表格的数据，vue可以根据对象属性控制渲染但是监听不到深层次的对象属性或者数组值得改变进而进行响应 */
      show: []
    }
  },
  methods: {
    excelToTable (index, excel) {
      /**
       * 一种解决vue不能监听到深层次的对象属性改变所引起的不能正确及时渲染的方法，
       * Vue最独特的特性之一是非侵入性的响应式系统。数据模型仅仅是普通的JavaScript对象。当你修改他们时，视图会进行更新。
       * 受现代 JavaScript 的限制 (而且 Object.observe 也已经被废弃)，Vue 不能检测到对象属性的添加或删除。
       * 由于 Vue 会在初始化实例时对属性执行 getter/setter 转化过程，所以属性必须在 data 对象上存在才能让 Vue 转换它，
       * 这样才能让它是响应的。
       */
      this.vue.set(this.show, index, true)
    },
    handleChange (val) {
      console.log(val)
    },
    getMyExcel () {
      this.axios.post(this.URLS.dochubapi + '/excels/getMyExcels',
        this.qs.stringify(), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      ).then(function (res) {
        this.excels = res.data.data
      }.bind(this)).catch(function (err) {
        if (err.response) {
          console.log(err.response)
        }
      })
    },
    newTable () {
      this.$router.push('/main/uptable/newtable')
    },
    downloadExcel (excelid) {
      if (excelid !== null && excelid !== undefined) {
        window.location.href = this.URLS.dochubapi + '/excels/downloadExcel?excelid=' + excelid
      } else {
        this.$message('下载失败！')
      }
    },
    deleteExcel (excelid) {
      this.$confirm('确定删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios.post(this.URLS.dochubapi + '/excels/deleteExcel', this.qs.stringify({
          excelId: excelid
        })).then((res) => {
          if (res.data.status === '1') {
            console.log('success')
            this.$message('删除表格成功！')
          } else {
            this.$message('删除表格失败！')
            console.log('error')
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },
  mounted () {
    this.getMyExcel()
    this.$emit('updateActivindex', '3')
  }
}
</script>

<style>
.el-excel-item-title {
  width: 50%;
}
#excel-div a:hover {
  color: rgb(25, 0, 255);
  text-decoration: none;
  cursor: pointer;
}
#excel-div a {
  color: rgb(0, 0, 0);
  text-decoration: none;
}
#excel-div {
  width: 90%;
  margin: 0 auto;
}
#uptable-title-left-div {
  width: 45%;
  float: left;
}
#uptable-title-right-div {
  width: 45%;
  float: left;
}
.el-excel-item-div {
  border: 1px solid red;
  width: 95%;
  background-color: whitesmoke;
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
}
.el-input {
  width: 500px;
}
</style>
