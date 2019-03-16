<template>
  <div>
    <input type="file" ref="file">
    <button @click='up'>bbbbbb</button>
    {{ percentage }}
  </div>
</template>

<script>
import SparkMD5 from 'spark-md5'
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
        fatherMD5: 'aa6197d394ed1bf888a15b466e693713',
        splitNo: 0
      }
      this.upFile(this.$refs.file.files[0], data, 'http://localhost:8081/upload/upload', this.updateProgress, function () { console.log('success') }, function () { console.log('error') })
    },
    updateProgress (progress) {
      this.percentage = progress
    },
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
      computeMD5(file, preUpload, splitFun)
      // upSplit(this.$refs.file.files[0], data, 'http://localhost:8081/test/test', this.updateProgress, function () {console.log("success")}, function () {console.log("error")})
      function combine () {
        that.axios.post('http://localhost:8081/upload/combine', that.qs.stringify({ md5: md5 })).then((res) => {})
      }
      function splitFun (md5) {
        if (splitNo >= split) {
          console.log(totalLoaded)
          console.log('next step is combine')
          combine()
        } else {
          var fileslice = file.slice(index, index + step)
          fileslice = new File([fileslice], splitNo + name, {type: file.type})
          index += step
          isExist(md5, fileslice, splitFun, function () {})
          // upSplit(file, data)
        }
      }
      function isExist (md5, fileslice, exist, notExist) {
        that.axios.post('http://localhost:8081/upload/isexists', that.qs.stringify({ fatherMD5: md5, splitNo: splitNo })).then((res) => {
          if (res.data.isexists === true) {
            console.log('@isExist ' + splitNo + ' status == true')
            complete = 100
            complete = complete * (step * splitNo + fileslice.size) / size
            updateProgress(complete)
            splitNo++
            splitFun(md5)
            // success(md5)
          } else {
            console.log('@isExist ' + splitNo + ' status == false')
            upSplit(fileslice, { fatherMD5: md5, splitNo: splitNo })
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
            md5 = spark.end()
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
      function preUpload (md5, success, error) {
        var preUploadData = {
          fatherMD5: md5,
          fileName: name,
          split: split,
          size: size,
          userid: 1,
          noticeid: 15,
          splitsize: 10485670
        }
        that.axios.post('http://localhost:8081/upload/preupload', that.qs.stringify(preUploadData)).then((res) => {
          if (res.data.status === '1') {
            console.log('@preupload status == 1')
            success(md5)
          } else {
            console.log('@preupload status != 1')
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
            complete = (progressEvent.loaded / progressEvent.total * 100 | 0)
            complete = complete * (step * splitNo + file.size) / size
            updateProgress(complete)
          }
        }
        that.axios.post(url, filedata, config).then((res) => {
          if (res.data.status === '1') {
            splitNo++
            splitFun(md5)
            // success()
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

</style>
