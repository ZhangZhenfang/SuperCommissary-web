<template>
  <div id="exceltotable-div">
    <!-- vue v-html指令 -->
    <div v-html="tableNode" :ref="'exceltotable-' + excelid">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Exceltotable',
  props: ['excelid'],
  data () {
    return {
      exceltotablehtml: '',
      tableNode: null,
      row: 0,
      cells: 0
    }
  },
  methods: {
    excelToTable () {
      this.axios.post(this.URLS.dochubapi + '/excels/excelToTable', this.qs.stringify({ excelId: this.excelid })).then((response) => {
        if (response.data.status === '1') {
          this.exceltotablehtml = response.data.data
          console.log(response.data)
          this.renderTable()
        }
      })
    },
    renderTable () {
      var strs = this.exceltotablehtml.split('::')
      this.tableNode = strs[0]
      this.cells = strs[2]
      this.row = strs[1]
    }
  },
  mounted () {
    this.excelToTable()
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
  padding:2px 7px 2px 7px;
  height: 40px;
  /* border:1px solid #000000; */
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
