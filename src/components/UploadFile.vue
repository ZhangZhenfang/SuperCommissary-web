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
