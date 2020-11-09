<template>
  <div class="control-box clearfix">
    <div class="left">
      <i class="iconfont icon-icon-6" @click="preSong"></i>
      <i class="iconfont" :class="{'icon-icon-14': isPlay,'icon-icon-7':!isPlay}" @click="playSong"></i>
      <i class="iconfont icon-icon-4" @click="nextSong"></i>
    </div>
    <div class="center">
      <div class="music-info">
        {{ playmusic.song_name }}
      </div>
      <div class="play-time">{{getVolumeMin}}/{{ getAllMin }}</div>
      <div class="player-progress" >
        <div class="player-progress-outer"></div>
        <div class="player-progress-inter" :style="{width: getPlayDot}">
          <div class="player-dot" :style="{marginLeft: getPlayDot}">
          </div>
        </div>
        <div class="player-progress-bar" @click="playClick"></div>
      </div>
    </div>
    <div class="right" id="right">
      <i class="iconfont icon-icon-17"></i>
      <div class="voice-progress" id="vp">
        <div class="voice-progress-inner"></div>
        <div class="voice-progress-outer"  :style="{width:getVolumeWidth}">
          <div id="volume" class="voice-dot"   :style="{marginLeft:getVolumeDotWidth}">
          </div>
        </div>
        <div class="voice-progress-pot" @click="mouseClick"></div>
      </div>
    </div>
    <audio id="music"  @ended="toEnd" :src="playmusic.song_url"></audio>
  </div>
</template>

<script>
export default {
  name: 'control',
  data () {
    return {
      music: '',
      isPlay: false,
      volume: 80,
      isDown: false,
      currentTime: 0,
      timer: null
    }
  },
  computed: {
    getVolumeWidth () {
      return this.volume + '%'
    },
    getVolumeDotWidth () {
      return this.volume + 'px'
    },
    getVolumeMin () {
      var min = Math.floor(this.currentTime / 60)
      var s = this.currentTime - min * 60
      if (min < 10) {
        min = '0' + min
      }
      if (s < 10) {
        s = '0' + s
      }
      return min + ':' + s
    },
    getAllMin () {
      var min = Math.floor(this.playmusic.song_time / 60)
      var s = this.playmusic.song_time - min * 60
      if (min < 10) {
        min = '0' + min
      }
      if (s < 10) {
        s = '0' + s
      }
      return min + ':' + s
    },
    getPlayDot () {
      return this.currentTime / this.playmusic.song_time * 600 + 'px'
    },
    getPlayInner () {
      return this.currentTime / this.playmusic.song_time * 600 + 'px'
    }
  },
  props: {
    playmusic: {
      type: Object
    }
  },
  mounted () {
    // window.addEventListener('mouseup', this.mouseUp)
  },
  methods: {
    playSong () {
      this.music = document.getElementById('music')
      if (this.isPlay === true) {
        this.music.pause()
        clearInterval(this.timer)
      } else if (this.isPlay === false) {
        this.music.play()
        this.timer = setInterval(this.countMin, 1000)
      }
      this.isPlay = !this.isPlay
    },
    nextSong () {
      this.$emit('toAdd')
    },
    preSong () {
      this.$emit('toPre')
    },
    countMin () {
      this.currentTime++
      this.$emit('toCTime', this.currentTime)
    },
    mouseClick (event) {
      const a = event.offsetX
      this.volume = a
      document.getElementById('music').volume = this.volume / 100
    },
    playClick (event) {
      const a = event.offsetX
      document.getElementById('music').currentTime = Math.floor(a / 600 * this.playmusic.song_time)
      this.currentTime = Math.floor(a / 600 * this.playmusic.song_time)
      console.log(a)
    },
    toEnd () {
      clearInterval(this.timer)
    }
  },
  watch: {
    'playmusic.song_url': {
      handler: function () {
        console.log(4)
        clearInterval(this.timer)
        this.currentTime = 0
        console.log(5)
        this.timer = setInterval(this.countMin, 1000)
        document.getElementById('music').autoplay = 'autoplay'
        this.isPlay = true
      }
    }
  }
}
</script>

<style scoped>
.control-box {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: stretch;
  width: 100%;
}

.left,
.center,
.right {
  float: left;
  position: relative;
}

.left {
  width: 200px;
}

.left i {
  margin-left: 20px;
  font-size: 40px;
}

.center {
  width: 600px;
}

.right {
  width: 100px;
}

.right i {
  font-size: 40px;
  margin-left: 20px;
}

.player-progress {
  bottom: 8px;
  width: 600px;
  height: 10px;
  background-color: transparent;
  position: absolute;
}

.player-progress-bar,
.player-progress-outer,
.player-progress-inter {
  width: 100%;
  height: 2px;
  position: absolute;
  top: 50%;
  margin-top: -1px;
}

.player-progress-outer {
  background-color: black;
}

.player-progress-bar {
  height: 4px;
  margin-top: -2px;
  background-color: transparent;
}

.player-progress-inter {
  background-color: white;
  transition: 0.5s;
}

.player-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  position: absolute;
  background-color: white;
  top: 50%;
  transition: 0.5s;
  margin-top: -7px;
}

.play-time {
  position: absolute;
  top: 0;
  right: 0;
}

.music-info {
  position: absolute;
  top: 0;
  left: 0;
}

.voice-progress{
  height: 30px;
  width: 100px;
  color: white;
  position: absolute;
  top: 50%;
  margin-top: -15px;
  left: 70%;
}

.voice-progress-outer{
  height: 2px;
  width: 70%;
  background-color: white;
  position: absolute;
  top: 50%;
  transition: 0.5s;
}
.voice-progress-inner{
  height: 2px;
  width: 100%;
  background-color: black;
  position: absolute;
  top: 50%;
}
.voice-progress-pot{
  height: 2px;
  width: 100%;
  background-color: transparent;
  position: absolute;
  top: 50%;
}
.voice-dot{
  width: 10px;
  height: 10px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  margin-top: -5px;
  transition: 0.5s;
}
</style>
