<template>
  <div id="mytable-div">
    <el-collapse>
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
export default {
  name: 'Mytable',
  components: { Table },
  data () {
    return {
      tables: [
        // {
        //   excelid: 14,
        //   description: 'ddddd',
        //   mysubmit: {
        //     excel: null,
        //     record: '[{"0":"11503070303","1":"张振方","2":"17839911994","3":"1228436617","4":"男","5":"410221199411212711","6":"HTML5+JavaEE","7":"人工智能大数据","8":""}]',
        //     recordid: '10',
        //     time: '2018-10-14 03:26:57',
        //     user: null
        //   },
        //   head: "<table id='exceltotable14' class='table' border='1'><tr><td rowspan = '1' colspan = '1'>方向</td><td rowspan = '1' colspan = '2'>HTML5+JavaEE+Oracle</td><td rowspan = '1' colspan = '1'>HTML5+JavaEE</td><td rowspan = '1' colspan = '1'></td><td rowspan = '1' colspan = '1'>Python</td><td rowspan = '1' colspan = '1'>微信小程序</td><td rowspan = '1' colspan = '1'></td><td rowspan = '1' colspan = '1'>人工智能大数据分析</td></tr><tr><td rowspan = '1' colspan = '1'>学号</td><td rowspan = '1' colspan = '1'>姓名</td><td rowspan = '1' colspan = '1'>电话</td><td rowspan = '1' colspan = '1'>QQ</td><td rowspan = '1' colspan = '1'>性别</td><td rowspan = '1' colspan = '1'>身份证号</td><td rowspan = '1' colspan = '1'>技术方向1</td><td rowspan = '1' colspan = '1'>技术方向2</td><td rowspan = '1' colspan = '1'>备注</td></tr></table>::1::9"
        // }
      ]
    }
  },
  methods: {
    bbbbb () {
      console.log(this.$refs['ttttt'])
      document.getElementById('table-div').innerHTML = this.tables[0].head
    },
    renderTable (that, table) {
      document.getElementById('table1').innerHTML = table.head
    },
    getExcelList () {
      this.axios.post('http://www.the15373.com' + '/excels/getExcelFromFriends').then((res) => {
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
  }
}
</script>

<style>
#mytable-div {
  background-color: whitesmoke;
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
