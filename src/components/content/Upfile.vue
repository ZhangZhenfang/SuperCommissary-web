<template>
  <div id="upfile-div">
    <div id="upfile-left">
      <el-collapse @change="handleChange">
        <el-collapse-item v-for="notice in notices" :name="notice.noticeid" :key="notice.noticeid">
          <template slot="title">{{ notice.notice }}</template>
          <el-form label-width="80px">
            <div class="notice-info-div">
                发布人：{{ notice.user.name }}<br>
                时间：{{ notice.starttime }} -- {{ notice.deadline }}<br>
                注意事项：{{ notice.description }}<br>
                我的提交：{{ notice.mysubmt == null ? '未提交' : notice.mysubmt.filename }}
                <UploadFile :noticeId="notice.noticeid"/>
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
import UploadFile from '../UploadFile.vue'
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
    handleChange (val) {
    },
    getNoticesFromFriend () {
      this.axios.post(
        'http://www.the15373.com/notices/getNoticesFromFriends',
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
  }
}
</script>

<style>
#upfile-div {
  width: 100%;
  height: 500px;
}
#upfile-left {
  float: left;
  width: 59%;
  border: 1px solid black;
}
#upfile-right {
  float: left;
  width: 40%;
  height: 100%;
  border: 1px solid black;
}
#upfile-right-top {
  width: 99%;
  height: 30%;
  border: 1px solid black;
}
#upfile-right-botton {
  width: 99%;
  height: 70%;
  border: 1px solid black;
}
.notice-info-div {
  background-color: rgb(216, 218, 217);
  padding: 20px 20px 20px 20px;
  width: 100%;
}
</style>
