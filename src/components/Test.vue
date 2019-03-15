<template>
  <div>
    <input type="file" ref="file">    
    <button @click='up'>bbbbbb</button>
    {{ percentage }}
  </div>
</template>

<script>
export default {
  name: 'Test',
  data () {
    return {
      percentage: 0
    }
  },
  methods: {
    up () {
      var data = {
        a: 'a',
        b: 'b'
      }
      this.upFile(this.$refs.file.files[0], data, 'http://localhost:8081/test/test', this.updateProgress, function () {console.log("success")}, function () {console.log("error")})
    },
    updateProgress (progress) {
      this.percentage = progress
    },
    upFile (file, data, url, updateProgress, success, error) {
      var that = this
      var size = file.size
      var name = file.name
      var index = 0
      var step = 10485670
      var split = Math.ceil(size / step)
      computeMD5(file, preUpload, splitFun)
      // upSplit(this.$refs.file.files[0], data, 'http://localhost:8081/test/test', this.updateProgress, function () {console.log("success")}, function () {console.log("error")})
      function splitFun (md5) {
        upSplit(file, data)
      }
      function up (md5, index) {
        if (index >= split) {
          return 
        } else {
          isExist(md5, index, function () {}, upSplit)
        }
      }
      function isExist(md5, splitNo, exist, notExist) {
        that.axios.post("http://localhost:8081/upload/isexists", { fatherMD5: md5, splitNo: splitNo}).then((res) => {
          if (res.data.isexists == 'true') {
            console.log("@isExist " + splitNo + " status == true")
            success(md5)
          } else {
            console.log("@isExist " + splitNo + " status == false")
            error()
          }
        })
      }
      function computeMD5 (file, preUpload, splitFun) {
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
            var md5 = spark.end()
            preUpload(md5, splitFun, error)
            // console.log('computed hash', md5)
          }
        }
        fileReader.onerror = function () {
          console.warn('FileReader error.')
        }
        function loadNext () {
          let start = currentChunk * chunkSize
          let end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize
          fileReader.readAsArrayBuffer(blobSlice.call(file, start, end))
        }
        loadNext()
      }
      function preUpload(md5, success, error) {
        var preUploadData = {
          fatherMD5: md5,
          fileName: name,
          split: split,
          size: size,
          userid: 1,
          noticeid: 15,
          splitsize: 10485670
        }
        that.axios.post("http://localhost:8081/upload/preupload", that.qs.stringify(preUploadData)).then((res) => {
          if (res.data.status === '1') {
            console.log("@preupload status == 1")
            success(md5)
          } else {
            console.log("@preupload status != 1")
            error()
          }
        })
      }
      function upSplit (file, data) {
        var filedata = new FormData()
        for (var x in data) {
          filedata.append(x, data[x])
        }
        filedata.append('filedata', file)
        var config = {
          onUploadProgress: progressEvent => {
            var complete = (progressEvent.loaded / progressEvent.total * 100 | 0)
            updateProgress(complete)
          }
        }
        that.axios.post(url, filedata, config).then((res) => {
          if (res.data.status === '1') {
            success()
          } else {
            error()
          }
        })
      }
    },
  }
}
</script>

<style>

</style>
