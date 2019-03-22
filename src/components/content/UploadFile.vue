<template>
  <div id="uploadfile-div">
    <el-upload :onChange="handleChange" :auto-upload="false" class="upload-demo" action="action"
      :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" multiple
      :limit="1" :on-exceed="handleExceed" :file-list="fileList">
      <el-button slot="trigger" size="mini" type="primary" v-bind:disabled="btnSwitcher">选择文件</el-button>
      <el-button @click="handleUploadFile" size="mini" type="primary" v-bind:disabled="btnSwitcher">提交文件</el-button>
    </el-upload>
    <div id="uploadfile-process-div">
      <el-progress :text-inside="true" :stroke-width="18" :percentage="percet" v-if="showPercent"></el-progress>
    </div>
  </div>
</template>

<script>
import SparkMD5 from 'spark-md5'
export default {
  name: 'UploadFile',
  data () {
    return {
      fileList: [],
      fileToUpload: null,
      percet: 0,
      showPercent: false,
      btnSwitcher: false
    }
  },
  props: ['noticeId', 'noticeUserId', 'notice'],
  methods: {
    handleUploadFile () {
      if (this.fileToUpload == null) {
        this.$message.error('未选择任何文件，无法上传！')
      } else {
        this.up()
      }
    },
    handleChange (file, fileList) {
      this.fileList = fileList
      this.fileToUpload = file.raw
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    handleExceed (files, fileList) {
      fileList[0] = {
        name: files[0].name
      }
      this.fileList = fileList
      this.fileToUpload = files[0]
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    up () {
      var data = {
        userid: this.noticeUserId,
        noticeid: this.noticeId
      }
      this.showPercent = true
      this.btnSwitcher = true
      this.percet = 0
      this.upFile(this.fileToUpload, data, this.URLS.fileserver + '/upload', this.updateProgress, this.success, this.error)
    },
    updateProgress (progress) {
      console.log(this.percet)
      this.percet = 100 * progress
    },
    error () {
      this.showPercent = false
      this.btnSwitcher = false
      this.$notify.error({ title: '错误', message: '上传失败' })
    },
    success (md5, data) {
      this.axios.post(this.URLS.dochubapi + '/files/uploadFile', this.qs.stringify({
        md5: md5,
        noticeid: data.noticeid,
        fileName: this.fileToUpload.name })).then((res) => {
        if (res.data.status === '1') {
          console.log('success')
          this.notice.mysubmt.filename = this.fileToUpload.name
          this.notice.mysubmt.md5 = md5
          this.$message('上传成功')
          this.fileList = []
        } else {
          this.$message('上传失败')
          console.log('error')
        }
        this.showPercent = false
        this.btnSwitcher = false
      })
    },
    /**
     * 上传文件，闭包问题
     * 上传文件函数里面有几个嵌套函数，在嵌套函数里面用到了上传文件函数的数据（包括变量和函数都有用到）
     * 闭包产生的条件：
     * 函数嵌套
     * 内部函数引用了外部函数的数据
     */
    upFile (file, data, url, updateProgress, success, error) {
      var totalLoaded = 0
      var complete = 0
      var md5
      var that = this
      var size = file.size
      var name = file.name
      var index = 0
      var step = 10485670
      var split = Math.ceil(size / step)
      var splitNo = 0
      /**
       * 计算文件的MD5
       */
      computeMD5(file)
      function combine () {
        that.axios.post(url + '/combine', that.qs.stringify({ md5: md5 })).then((res) => {
          if (res.data.status === '1') {
            success(md5, data)
          } else {
            error()
          }
        })
      }
      /**
       * 文件分片上传，如果该片已经在服务器上存在，则直接跳过，知道所有的分片上传完成后发送文件合并命令
       */
      function splitFun () {
        if (splitNo >= split) {
          console.log(totalLoaded)
          console.log('next step is combine')
          combine()
        } else {
          var fileslice = file.slice(index, index + step)
          fileslice = new File([fileslice], splitNo + name, {type: file.type})
          index += step
          isExist(fileslice, splitFun, function () {})
        }
      }
      /**
       * 判断文件是否在服务器上存在，如果存在则分割下一片，否则执行上传分片
       */
      function isExist (fileslice, exist, notExist) {
        that.axios.post(url + '/isexists', that.qs.stringify({ fatherMD5: md5, splitNo: splitNo })).then((res) => {
          if (res.data.isexists === true) {
            console.log('@isExist ' + splitNo + ' status == true')
            complete = 1
            console.log(step, splitNo, complete, fileslice.size, md5)
            complete = (step * splitNo + complete * fileslice.size) / size
            console.log(complete)
            updateProgress(complete)
            splitNo++
            splitFun()
          } else {
            console.log('@isExist ' + splitNo + ' status == false')
            upSplit(fileslice, { fatherMD5: md5, splitNo: splitNo })
          }
        })
      }
      /**
       * 计算文件的MD5
       */
      function computeMD5 (file) {
        var fileReader = new FileReader()
        var blobSlice = File.prototype.mozSlice || File.prototype.webkitSlice || File.prototype.slice
        var chunkSize = 2097152
        var chunks = Math.ceil(file.size / chunkSize)
        var currentChunk = 0
        var spark = new SparkMD5()
        fileReader.onload = function (e) {
          spark.appendBinary(e.target.result)
          currentChunk++
          if (currentChunk < chunks) {
            loadNext()
          } else {
            md5 = spark.end()
            preUpload()
          }
        }
        function loadNext () {
          var start = currentChunk * chunkSize
          var end = start + chunkSize >= file.size ? file.size : start + chunkSize
          fileReader.readAsBinaryString(blobSlice.call(file, start, end))
        }
        loadNext()
      }
      /**
       * 进行上传文件前的准备
       */
      function preUpload () {
        var preUploadData = {
          fatherMD5: md5,
          fileName: name,
          split: split,
          size: size,
          userid: data.userid,
          noticeid: data.noticeid,
          splitsize: 10485670
        }
        that.axios.post(url + '/preupload', that.qs.stringify(preUploadData)).then((res) => {
          if (res.data.status === '1') {
            console.log('@preupload status == 1')
            splitFun()
          } else {
            console.log('@preupload status != 1')
            error()
          }
        })
      }
      /**
       * 上传分片
       */
      function upSplit (file, data) {
        var filedata = new FormData()
        for (var x in data) {
          filedata.append(x, data[x])
        }
        filedata.append('filedata', file)
        var config = {
          onUploadProgress: progressEvent => {
            complete = (progressEvent.loaded / progressEvent.total)
            complete = (step * splitNo + complete * file.size) / size
            updateProgress(complete, that)
          }
        }
        that.axios.post(url + '/upload', filedata, config).then((res) => {
          if (res.data.status === '1') {
            splitNo++
            splitFun()
          } else {
            error()
          }
        })
      }
    }
  }
}
</script>
<style>
#uploadfile-process-div {
  margin-top: 10px;
  width: 80%;
}
</style>
