<template>
  <div id="friends-div">
    <div id="addfriend-div">
      输入学号：
      <el-input v-model="friendaccount" placeholder="请输入学号"></el-input>
      <el-button type="primary" @click="addfriend">添加关注</el-button>
    </div>
    <div id="friendstable-div">
      <el-table :data="friends" border style="width: 100%">
        <el-table-column prop="studentnumber" label="学号" width="130">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="90">
        </el-table-column>
        <el-table-column prop="sex" label="性别" width="60">
          <!-- 插槽 -->
          <template slot-scope="scope">
            <!-- 过滤性别数据 -->
            {{scope.row.sex | sexfilter}}
          </template>
        </el-table-column>
        <el-table-column prop="school" label="学校" width="160">
        </el-table-column>
        <el-table-column prop="institute" label="学院" width="200">
        </el-table-column>
        <el-table-column prop="major" label="专业" width="200">
        </el-table-column>
        <el-table-column label="操作" width="50">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="mini">取关</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Friends',
  data () {
    return {
      friendaccount: '',
      friends: []
    }
  },
  methods: {
    addfriend () {
      if (this.friendaccount === '') {
        this.$message('请输入正确的学号')
      } else {
        this.axios.post(this.URLS.dochubapi + '/relations/addRelationship', this.qs.stringify({
          account: this.friendaccount
        })).then((response) => {
          if (response.data.status === '1') {
            this.getMyFriends()
            this.$message('关注成功')
            this.getMyFriends()
          } else {
            this.$message('关注失败,' + response.data.errors)
          }
        })
      }
    },
    handleClick (row) {
      console.log(row)
      this.axios.post(this.URLS.dochubapi + '/relations/deleRelationship', this.qs.stringify({
        account: row.account
      })).then((response) => {
        if (response.data.status === '1') {
          this.getMyFriends()
          this.$message('取关成功')
        } else {
          this.$message('取关失败')
        }
      })
    },
    getMyFriends () {
      this.axios.get(this.URLS.dochubapi + '/users/getFriends').then((response) => {
        if (response.data.status === '1') {
          this.friends = response.data.data
        } else {
          this.$message('获取我的关注失败')
        }
      })
    }
  },
  mounted () {
    this.getMyFriends()
  },
  /** 过滤器 */
  filters: {
    /** 对性别数据进行过滤 */
    sexfilter: function (sex) {
      return '未知'// sex === 'f' ? '女' : '男'
    }
  }
}
</script>

<style>
#addfriend-div {
  padding-top: 10px;
  padding-left: 10px;
  padding-bottom: 10px;
}
</style>
