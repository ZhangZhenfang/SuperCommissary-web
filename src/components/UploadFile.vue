<template>
  <div id="uploadfile-div">
    <el-upload :onChange="handleChange" :auto-upload="false" class="upload-demo" action="action" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="1" :on-exceed="handleExceed" :file-list="fileList">
      <el-button slot="trigger" size="mini" type="primary">选择文件</el-button>
      <el-button @click="handleUploadFile" size="mini" type="primary">提交文件</el-button>
    </el-upload>
    <div id="uploadfile-process-div">
      <el-progress :text-inside="true" :stroke-width="18" :percentage="98"></el-progress>
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
      fileToUpload: null
    }
  },
  props: ['noticeId'],
  methods: {
    handleUploadFile () {
      if (this.fileToUpload == null) {
        this.$message.error('未选择任何文件，无法上传！')
      } else {
        this.uploadfilefunction(this.fileToUpload)
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
    uploadfilefunction (file) {
      let blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice
      let fileReader = new FileReader()
      let chunkSize = 2097152
      let chunks = Math.ceil(file.size / chunkSize)
      let currentChunk = 0
      let spark = new SparkMD5()
      fileReader.onload = function (e) {
        spark.append(e.target.result)
        currentChunk++
        if (currentChunk < chunks) {
          loadNext()
        } else {
          console.log('computed hash', spark.end())
        }
      }
      fileReader.onerror = function () {
        console.warn('FileReader error.')
      }
      function preUpload() {
        var form = new FormData(); // FormData 对象
        form.append("mf", fileObj); // 文件对象
        
        xhr = new XMLHttpRequest();  // XMLHttpRequest 对象
        xhr.open("post", url, true); //post方式，url为服务器请求地址，true 该参数规定请求是否异步处理。
        xhr.onload = uploadComplete; //请求完成
        xhr.onerror =  uploadFailed; //请求失败
        xhr.upload.onprogress = progressFunction;//【上传进度调用方法实现】
        xhr.upload.onloadstart = function(){//上传开始执行方法
            ot = new Date().getTime();   //设置上传开始时间
            oloaded = 0;//设置上传开始时，以上传的文件大小为0
        };
        xhr.send(form); //开始上传，发送form数据
      }
      function loadNext () {
        let start = currentChunk * chunkSize
        let end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize
        fileReader.readAsArrayBuffer(blobSlice.call(file, start, end))
      }
      loadNext()
    }
  }
}
</script>
<style>
#uploadfile-div {
  /* margin: 0px 10px 10px 10px; */
}
#uploadfile-process-div {
  margin-top: 10px;
  width: 80%;
}
</style>

