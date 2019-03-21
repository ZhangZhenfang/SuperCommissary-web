<template>
  <div id="table-div">
    <!-- v-html指令，把tableNode渲染为html，否则显示字符串 -->
    <div v-html="tableNode" :ref="'table-' + tableid">
    </div>
    <div id="table-op-div">
      <el-button size="small" @click="newLine(null)">新增一行</el-button>
      <el-button size="small" @click="delLine(null)">减少一行</el-button>
      <el-button size="small" @click="subrecord()">提交内容</el-button>
    </div>
  </div>
</template>

<script>
import URLS from '../../json/urls.json'
export default {
  name: 'Table',
  props: ['tablehtml', 'tableid', 'mysubmit', 'recordid'],
  data () {
    return {
      cells: 0,
      records: null,
      tableNode: null,
      row: 0
    }
  },
  methods: {
    renderHead () {
      var strs = this.tablehtml.split('::')
      this.tableNode = strs[0]
      this.cells = strs[2]
      this.row = strs[1]
      setTimeout(() => { this.reanderRecord() }, 500)
    },
    reanderRecord () {
      if (this.mysubmit != null) {
        this.records = JSON.parse(this.mysubmit.record)
        for (var i = 0; i < this.records.length; i++) {
          this.newLine(this.records[i])
        }
      } else {
        this.newLine()
      }
    },
    /**
     * 新建一行
     */
    newLine (record) {
      var table = this.$refs['table-' + this.tableid].childNodes[0]
      var tr = table.insertRow(table.rows.length)
      tr.setAttribute('class', 'excelrecord')
      for (var i = 0; i < this.cells; i++) {
        var td = tr.insertCell(i)
        if (record !== null && record !== undefined) {
          td.innerHTML = '<input type="text" class="table-input14" value="' + record['' + i] + '">'
        } else {
          td.innerHTML = '<input type="text" class="table-input14" value="">'
        }
      }
    },
    /**
     * 减少一行
     */
    delLine () {
      var table = this.$refs['table-' + this.tableid].childNodes[0]
      var row = table.rows.length
      var min = this.row
      if (row > (parseInt(min) + 1)) {
        table.deleteRow(row - 1)
      }
    },
    /**
     * 提交记录
     */
    subrecord () {
      var table = this.$refs['table-' + this.tableid].childNodes[0]
      var records = table.getElementsByClassName('excelrecord')
      var id = this.tableid
      if (records.length === 0) {
        this.insertOrUpdateExcelrecord(id, '[]')
        return
      }
      var data = '['
      for (var j = 0; j < records.length; j++) {
        var text = ''
        var flag = 0
        var inputs = records[j].getElementsByTagName('input')
        for (var i = 0; i < inputs.length; i++) {
          text += '"' + i + '":'
          text += '"' + inputs[i].value + '"'
          if (inputs[i].value.trim() !== '') {
            flag += 1
          }
          if (i <= inputs.length - 2) {
            text += ','
          }
        }
        if (flag === 0) {
          inputs[0].focus()
          return
        }
        data += '{' + text + '},'
      }
      data += ',,'
      data = data.replace(',,,', '')
      data += ']'
      this.insertOrUpdateExcelrecord(id, data)
    },
    insertOrUpdateExcelrecord (id, data) {
      console.log({ excelId: this.tableid, record: data })
      this.axios.post(URLS.dochubapi + '/excelrecords/insertOrUpdateExcelrecord', this.qs.stringify({ excelId: this.tableid, record: data })).then((res) => {
        if (res.data.status === '1') {
          this.$message('提交成功！')
        } else {
          this.$message('提交失败！')
        }
      })
    }
  },
  mounted () {
    this.renderHead()
  }
}
</script>

<style>
#table-div {
  height: 100%;
  width: 100%;
}
#table-op-div {
  width: 100%;
  text-align: center;
  margin-top: 10px;
}
.table {
  width:100%;
  border-collapse:collapse;
  text-align: center;
}
.table td, .table th {
  font-size:1em;
  border:1px solid #000000;
  padding:2px 7px 2px 7px;
  height: 40px;
}
.table input {
  text-align: center;
  border-bottom-width: 0;
  border-top-width: 0;
  border-left-width: 0;
  border-right-width: 0;
  padding: 10px;
  width: 90%;
}
</style>
