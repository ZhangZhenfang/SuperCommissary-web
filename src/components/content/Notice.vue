<template>
  <div id="notice-div" ref="notice-div">
    <el-input placeholder="请输入内容">
      <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input>
    <el-button @click="newnotice">新建公告</el-button>
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item v-for="notice in notices" :name="notice.noticeid" :key="notice.noticeid">
        <template slot="title">
            <div class="el-notice-item-title">{{ notice.notice }}</div>
            <div class="el-notice-item-title">提交人数：{{ notice.files.length }}</div>
        </template>
        <div class="el-notice-item-div">
          <el-button size="small" @click="downloadNotice(notice.user.userid, notice.noticeid, notice.notice)">下载</el-button>
          <el-button size="small" @click="deleteNotice(notice.noticeid)">删除</el-button>
          <br>
          时间：{{ notice.starttime }} -- {{ notice.deadline }}<br>
          描述：{{ notice.description }}
          <el-table :data="notice.files" border style="width: 100%">
            <el-table-column prop="user.studentnumber" label="学号" width="180">
            </el-table-column>
            <el-table-column prop="user.name" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="filename" label="提交文件">
              <template slot-scope="scope">
                <a @click="download(scope.row.md5)">{{ scope.row.filename }}</a>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import URLS from '../../json/urls.json'
export default {
  name: 'Notice',
  data () {
    return {
      activeNames: [],
      notices: []
    }
  },
  methods: {
    handleChange (val) {
      console.log(val)
    },
    download (md5) {
      var a = document.createElement('a')
      a.href = URLS.fileserver + '/download/downloadFile?md5=' + md5
      this.$refs['notice-div'].append(a)
      a.click()
      a.remove()
    },
    getMyNotice () {
      this.axios.post(
        URLS.dochubapi + '/notices/getMyNotice',
        this.qs.stringify(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      ).then(function (res) {
        this.notices = res.data.data
      }.bind(this)).catch(function (err) {
        if (err.response) {
          console.log(err.response)
        }
      })
    },
    newnotice () {
      this.$router.push('/main/notice/newnotice')
    },
    downloadNotice (userid, noticeid, name) {
      window.location.href = URLS.fileserver + '/download/downloadZip?path=noticedata/' + userid + '/' + noticeid + '&name=' + name
    },
    deleteNotice (noticeid) {
      this.$confirm('此操作将失去对该公告下的所有文件的控制权, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios.post(URL.dochubapi + '/notices/deleteNotice', this.qs.stringify({
          noticeId: noticeid
        })).then((res) => {
          if (res.data.status === '1') {
            console.log('success')
            this.$message('删除公告成功！')
          } else {
            this.$message('删除公告失败！')
            console.log('error')
          }
        })
        this.$message('删除公告成功！' + noticeid)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },
  mounted () {
    this.getMyNotice()
    this.$emit('updateActivindex', '2')
  }
}
</script>

<style>
.el-notice-item-title {
  width: 50%;
}
#notice-div a:hover {
  color: rgb(25, 0, 255);
  text-decoration: none;
  cursor: pointer;
}
#notice-div a {
  color: rgb(0, 0, 0);
  text-decoration: none;
}
#notice-div {
  width: 90%;
  margin: 0 auto;
}
.el-notice-item-div {
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
