<template>
  <div id="addfacevideo-div">
    <div id="canvas-div">
      <video v-show="showVideo" id="video"></video>
      <canvas v-show="showCanvas" id="canvas"></canvas>
      <img v-show="showImg" id="img" width="320" height="240"/>
    </div>
  </div>
</template>

<script>
import { setTimeout } from 'timers'
export default {
  props: ['stream', 'username', 'handleResponse'],
  name: 'VerifyVideo',
  data () {
    return {
      currentPic: {},
      showVideo: true,
      showCanvas: false,
      showImg: false,
      addable: true,
      resetable: true,
      canvas: {},
      video: {},
      img: {},
      btn: {},
      context: {},
      width: 320,
      height: 240,
      streaming: false,
      interveal: {},
      loginCompleted: false
    }
  },
  methods: {
    reset () {
      this.addable = true
      this.resetable = true
      this.showVideo = true
      this.showImg = false
    },
    snapAndUpload () {
      var file = this.takecapture()
      this.currentPic = file
      var formData = new FormData()
      formData.append('data', file)
      formData.append('account', this.username)
      this.axios.post(this.URLS.dochubapi + '/users/auth', formData).then(response => {
        if (response.data.status === '1' || response.data.status === '2') {
          this.$emit('handleResponse', response)
        } else {
          setTimeout(this.snapAndUpload, 500)
        }
      })
    },
    takecapture () {
      if (this.streaming) {
        this.context.drawImage(this.video, 0, 0, 320, 240)
        return this.DataURL2Blob(this.canvas.toDataURL('img/png'), 'png')
      }
    },
    DataURL2Blob (dataURL, type) {
      var bytes = window.atob(dataURL.split(',')[1])
      var ab = new ArrayBuffer(bytes.length)
      var ia = new Uint8Array(ab)
      for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i)
      }
      return new Blob([ab], { type: 'image/' + type })
    }
  },
  watch: {
    'stream': function (val) {
      if (val === null) {
        clearInterval(this.interveal)
      } else {
        this.video.srcObject = this.stream
        this.video.play()
        setTimeout(this.snapAndUpload, 500)
        // this.interveal = setInterval(this.snapAndUpload, 300)
      }
    }
  },
  mounted () {
    this.canvas = document.getElementById('canvas')
    this.video = document.getElementById('video')
    this.img = document.getElementById('img')
    this.btn = document.getElementById('btn')
    this.context = this.canvas.getContext('2d')
    this.video.addEventListener('canplay', (ev) => {
      if (!this.streaming) {
        this.video.setAttribute('width', this.width)
        this.video.setAttribute('height', this.height)
        this.canvas.setAttribute('width', this.width)
        this.canvas.setAttribute('height', this.height)
        this.streaming = true
      }
      // this.snapAndUpload()
    }, false)
  }
}
</script>

<style>
#addfacevideo-div {
  text-align: center;
  width: 100%;
}
#canvas-div {
  text-align: center;
  width: 100%;
}
#canvas-div img {
  /* text-align: center; */
  padding-left: 0px;
  width: 320px;
}
</style>
