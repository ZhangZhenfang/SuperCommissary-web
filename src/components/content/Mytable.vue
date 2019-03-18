<template>
  <div>
    <el-collapse>
      <el-collapse-item v-for="table in tables" :name="table.excelid" :key="table.excelid">
        <template slot="title"><p class="el-collpase-item-title">{{ table.excelid }}</p></template>
        {{ table.description }}
        <el-table :data="tableData" ref="ttttt" border style="width: 100%">
          <el-table-column prop="date" label="日期" width="180">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="180">
          </el-table-column>
          <el-table-column prop="address" label="地址">
          </el-table-column>
        </el-table>
        <el-button @click="bbbbb">bbbbb</el-button>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  name: 'Mytable',
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      tables: [
        {
          excelid: 1,
          description: 'ddddd'
        },
        {
          excelid: 2,
          description: 'ffffff'
        }
      ]
    }
  },
  methods: {
    bbbbb () {
      console.log(this.$refs['ttttt'])
    }
  }
}
</script>

<style>

</style>
