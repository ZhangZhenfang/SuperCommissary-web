<template>
  <div id="upfile-div" ref="upfile-div">
    <div id="upfile-left">
      <el-collapse @change="handleChange">
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
      <div id="upfile-right-top"></div>
      <div id="upfile-right-bottom"></div>
    </div>
  </div>
</template>

<script>
import UploadFile from './UploadFile.vue'
import URLS from '../../json/urls.json'

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
      ]
    }
  },
  methods: {
    download (notice) {
      if (notice.mysubmt != null) {
        var a = document.createElement('a')
        a.href = URLS.fileserver + '/download/downloadFile?md5=' + notice.mysubmt.md5
        this.$refs['upfile-div'].append(a)
        a.click()
        a.remove()
      }
    },
    handleChange (val) {
    },
    getNoticesFromFriend () {
      console.log(URLS['dochubapi'])
      this.axios.post(
        URLS.dochubapi + '/notices/getNoticesFromFriends',
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
    this.$emit('updateActivindex', '1');
  }
}
</script>

<style>
#upfile-div {
  background-color: aliceblue;
  width: 100%;
  float: left;
  /* border: 2px solid pink; */
}
#upfile-left {
  float: left;
  width: 59%;
  /* border: 1px solid black; */
}
#upfile-right {
  float: left;
  width: 40%;
  height: 900px;
  border: 1px solid black;
}
#upfile-right-top {
  width: 99%;
  height: 30%;
  float: left;
  border: 1px solid rgb(69, 37, 209);
}
#upfile-right-bottom {
  width: 99%;
  height: 70%;
  float: left;
  border: 1px solid rgb(187, 26, 26);
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
</style>
