<template>
  <div id="mytable-div">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item v-for="table in tables" :name="table.excelid" :key="table.excelid">
        <template slot="title">
          <div id="mytable-title-left-div">
            <p class="el-collpase-item-title">{{ table.filename }}</p>
          </div>
          <div id="mytable-title-right-div">
            <span>文件所有者{{ table.user.name }}</span>
            <span>截止时间{{ table.deadline }}</span>
          </div>
        </template>
        <div id="mytable-table-div">
          <Table :tablehtml="table.head" :tableid="table.excelid" :mysubmit="table.mysubmit" :recordid="table.mysubmit == null ? null : table.mysubmit.recordid"></Table>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import Table from './Table.vue'
import URLS from '../../json/urls.json'
export default {
  name: 'Mytable',
  components: { Table },
  data () {
    return {
      activeNames: [],
      tables: [
      ]
    }
  },
  methods: {
    handleChange (val) {
      console.log(val)
    },
    renderTable (that, table) {
      document.getElementById('table1').innerHTML = table.head
    },
    getExcelList () {
      this.axios.post(URLS.dochubapi + '/excels/getExcelFromFriends').then((res) => {
        if (res.data.status === '1') {
          this.tables = res.data.data
        } else {
          this.$message('获取失败！')
        }
      })
    }
  },
  mounted () {
    this.getExcelList()
    this.$emit('updateActivindex', '4')
  }
}
</script>

<style>
#mytable-div {
  background-color: whitesmoke;
  width: 90%;
  margin: 0 auto;
}
#mytable-table-div {
  background-color: rgb(228, 228, 228);
}
#mytable-title-left-div {
  width: 45%;
  float: left;
}
#mytable-title-right-div {
  width: 45%;
  float: left;
}
#mytable-title-right-div span {
  padding-left: 30px;
}
</style>
