<template>
  <div id="upfile-div" ref="upfile-div">
    <div id="upfile-left">
      <el-collapse @change="handleChange">
        <!--
          为什么使用v-for指令的时候必须添加唯一的key?
          使用v-for更新已渲染的元素列表时,默认用就地复用策略;列表数据修改的时候,他会根据key值去判断某个值是否修改,
          如果修改,则重新渲染这一项,否则复用之前的元素;
          https://segmentfault.com/a/1190000013810844
        -->
        <el-collapse-item v-for="notice in notices" :name="notice.noticeid" :key="notice.noticeid">
          <template slot="title"><p class="el-collpase-item-title">{{ notice.notice }}</p></template>
          <el-form label-width="80px">
            <div class="notice-info-div">
                发布人：{{ notice.user.name }}<br>
                时间：{{ notice.starttime }} -- {{ notice.deadline }}<br>
                注意事项：{{ notice.description }}<br>
                我的提交：<a @click="download(notice)">{{ notice.mysubmt == null ? '未提交' : notice.mysubmt.filename }}</a>
                <UploadFile :notice="notice" :noticeId="notice.noticeid" :noticeUserId='notice.user.userid'/>
            </div>
          </el-form>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div id="upfile-right">
      <div id="upfile-right-top">
        <div id="upfile-right-top-inner">
          <el-input placeholder="请输入内容" ref="condition-input" v-model="condition" class="input-with-select">
            <el-select v-model="select" slot="prepend" placeholder="请选择">
              <el-option label="公告名" value="1"></el-option>
              <el-option label="用户名" value="2"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="getNoticesByCondition(select)"></el-button>
          </el-input>
          <el-button class="upfile-right-top-inner-btn" @click="getNoticesByCondition('3')">已提交的公告</el-button>
          <el-button class="upfile-right-top-inner-btn" @click="getNoticesByCondition('4')">未提交的公告</el-button>
        </div>
      </div>
      <div id="upfile-right-bottom">
        <div id="myfile">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>我的文件</span>
            </div>
            <div v-for="o in myfiles" :key="o.fileid" class="text item">
              <a @click="downloadFile(o.md5)">{{ o.filename }} ———— {{ o.noticeName }}</a>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UploadFile from './UploadFile.vue'
export default {
  name: 'Upfile',
  components: { UploadFile },
  data () {
    return {
      activeNames: ['0'],
      notices: [
        {
          noticeid: 1,
          notice: 'asdf',
          user: {
            name: 'a'
          }
        },
        {
          noticeid: 2,
          notice: 'asdfjhgf',
          user: {
            name: 'b'
          }
        }
      ],
      select: '1',
      condition: '',
      myfiles: [
      ]
    }
  },
  methods: {
    downloadFile (md5) {
      window.location.href = this.URLS.fileserver + '/download/downloadFile?md5=' + md5
    },
    getMyFiles () {
      this.axios.post(this.URLS.dochubapi + '/files/getMyFiles').then((response) => {
        if (response.data.status === '1') {
          this.myfiles = response.data.data
        }
      })
    },
    getNoticesByCondition (code) {
      if (this.condition === '' && (code === '1' || code === '2')) {
        this.$refs['condition-input'].focus()
        return
      }
      if (code === '1') {
        console.log(1, this.condition)
      } else if (code === '2') {
        console.log(2, this.condition)
      } else if (code === '3') {
        console.log(3)
      } else if (code === '4') {
        console.log(4)
      }
    },
    download (notice) {
      if (notice.mysubmt != null) {
        var a = document.createElement('a')
        a.href = this.URLS.fileserver + '/download/downloadFile?md5=' + notice.mysubmt.md5
        this.$refs['upfile-div'].append(a)
        a.click()
        a.remove()
      }
    },
    handleChange (val) {
    },
    getNoticesFromFriend () {
      this.axios.post(this.URLS.dochubapi + '/notices/getNoticesFromFriends',
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
    }
  },
  mounted () {
    this.getNoticesFromFriend()
    this.$emit('updateActivindex', '1')
    setTimeout(this.getMyFiles, 1000)
  }
}
</script>

<style>
#upfile-div {
  background-color: aliceblue;
  width: 90%;
  margin: 0 auto;
}
#upfile-left {
  float: left;
  width: 59%;
}
#upfile-right {
  float: left;
  width: 40%;
  height: 900px;
  /* border: 1px solid black; */
}
#upfile-right-top {
  width: 99%;
  height: 15%;
  float: left;
  /* border: 1px solid rgb(69, 37, 209); */
}
#upfile-right-top-inner {
  margin-top: 15px;
  margin-left: 30px;
  margin-right: 30px;
  text-align: center;
}
.upfile-right-top-inner-btn {
  margin-top: 30px;
}
#upfile-right-bottom {
  width: 99%;
  height: 60%;
  float: left;
  /* border: 1px solid rgb(187, 26, 26); */
}
.notice-info-div {
  background-color: rgb(236, 236, 236);
  padding: 20px 20px 20px 20px;
  width: 100%;
  line-height: 36px;
  font-size: 16px;
}
.el-collapse-item {
  font-size: 20px;
}
.el-collpase-item-title {
  font-size: 16px;
}
.el-select .el-input {
  width: 100px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
#myfile {
  margin-top: 20px;
  width: 90%;
  height: 600px;
  overflow-y: scroll;
  overflow-x: scroll;
  float: left;
  padding-left: 30px;
}
#myfile-label {
  font-size: 20px;
  width: 100%;
  text-align: center;
}
.myfile-a {
  font-size: 14px;
  color: black;
}
.myfile-a:hover {
  cursor: pointer;
}
.text {
  font-size: 14px;
}
.item {
  margin-bottom: 18px;
}
.clearfix:before, .clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
.box-card {
  width: 98%;
}
.box-card a {
  color: rgb(0, 0, 0);
  text-decoration: none;
}
.box-card a:hover {
  color: rgb(25, 0, 255);
  text-decoration: none;
  cursor: pointer;
}
</style>
