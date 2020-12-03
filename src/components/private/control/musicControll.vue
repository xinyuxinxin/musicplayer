<template>
  <div class="controll-box">
    <div class="musicPic-box">
      <el-image class="musicPic" :src="musicPic"></el-image>
    </div>
    <div class="musicTitle-box">
      <h3>{{musicname}}</h3>
      <p>{{artiname}}</p>
    </div>
    <div class="controll-base">
      <i class="iconfont iconpresong"></i>
      <i class="iconfont" @click="play" :class="{'iconzantingtingzhi':playIcon,'iconbofang':!playIcon}"></i>
      <i class="iconfont iconnextsong"></i>
    </div>
    <div class="current-time">{{getCurTime}}</div>
    <div class="music-progress">
      <div>
        <el-slider @change="musicChange"  v-model='currtime' :max="this.musicDetail.dt/1000" :show-tooltip="false"></el-slider>
      </div>
    </div>
    <div class="all-time">{{getAllTime}}</div>
    <div class="music-volum">
      <div class="volum-icon">
        <i class="iconfont iconvolume"></i>
      </div>
      <div class="volum-progerss">
        <el-slider  @change="saveVolume" @input="changeVolum" v-model='curvolum' :show-tooltip="false"></el-slider>
      </div>
    </div>
    <div class="controll-other">
      <i class="iconfont iconshunxu1"></i>
      <i class="iconfont iconlrc2" @click="showLyric"></i>
      <i class="iconfont icongedan" @click="showUserSongList"></i>
    </div>
    <transition name="slide-fade">
      <div class="user-song-list-box" v-if="isShowUserSongList">
        <ul>
          <li>我是歌单</li>
        </ul>
      </div>
    </transition>
    <transition name="slide-fade">
      <div class="song-lyric" v-if="isShowLyric">
        <div class="hidden-scoll">
          <ul>
            <template v-for="(item, index) in musicLyric">
              <li class="lyric-top" :class="{'lyric-active': curLyric === index}" v-if="item.words !== ''" :key="index">{{item.words}}</li>
              <li v-if="item.words !== ''" :class="{'lyric-active': curLyric === index}" :key="index + 'r'">{{item.twords}}</li>
            </template>
          </ul>
        </div>
      </div>
    </transition>
    <audio id="music" @pause="musicPlayIconPasue" @ended="musicPause" @playing="musicPlayIconPlay" :src="musicUrl.url"></audio>
  </div>
</template>

<script>
export default {
  name: 'musicControll',
  data () {
    return {
      musicDetail: '',
      musicUrl: '',
      musicPic: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1039718928,2287422245&fm=26&gp=0.jpg',
      musicname: '未知',
      artiname: '未知',
      currtime: 0,
      curvolum: 100,
      timer: '',
      musicLyric: [],
      playIcon: false,
      isShowUserSongList: false,
      isShowLyric: false,
      curLyric: 0
    }
  },
  watch: {
    '$store.state.playMusicId': {
      deep: true,
      handler: function (newValue, oldValue) {
        if (newValue === oldValue) {
          return 0
        } else {
          this.currtime = 0
          this.getMusicUrl()
          this.getMusicDetail()
          this.getMusicLyric()
          if (this.playIcon === true) {
          } else {
            this.playIcon = true
          }
          document.getElementById('music').autoplay = true
          clearInterval(this.timer)
          this.musicPlaying()
        }
      }
    }
  },
  computed: {
    getCurTime () {
      // console.log(this.currtime)
      return this.toTime(this.currtime, 1)
    },
    getAllTime () {
      return this.toTime(this.musicDetail.dt, 1000)
    }
  },
  methods: {
    async getMusicDetail () {
      try {
        const timestamp = new Date().valueOf()
        const res = await this.$api.getSongDetail(this.$store.state.playMusicId, timestamp)
        if (res.code === 200) {
          this.musicDetail = res.songs[0]
          this.musicPic = this.musicDetail.al.picUrl
          this.musicname = this.musicDetail.al.name
          this.artiname = this.musicDetail.ar[0].name
          this.currtime = 0
          console.log(this.musicPic)
        }
      } catch (e) {
        console.log(e)
      }
    },
    async getMusicUrl () {
      try {
        this.musicUrl = await this.$api.getSongUrl(this.$store.state.playMusicId)
        if (this.musicUrl.code === 200) {
          this.musicUrl = this.musicUrl.data[0]
        }
      } catch (e) {
        console.log(e)
      }
    },
    async getMusicLyric () {
      try {
        var res = await this.$api.getLyric(this.$store.state.playMusicId)
        console.log(res)
        this.musicLyric = this.getLyricArray(res.lrc.lyric, res.tlyric.lyric)
        console.log(this.musicLyric)
      } catch (e) {
        console.log(e)
      }
    },
    toTime (t, mul) {
      var min = Math.floor(t / 60 / mul)
      var s = Math.floor((t - min * 60 * mul) / mul)
      if (s < 10) {
        s = '0' + s
      }
      if (min < 10) {
        min = '0' + min
      }
      return min + ':' + s
    },
    getLyricArray (lyric, tlyric) {
      var array = lyric.split('\n')
      var tarray = tlyric.split('\n')
      // 遍历分割每一句
      var count = 0
      for (let index = 0; index < array.length; index++) {
        if (array[index] !== '') {
          array[count++] = getLrcObj(array[index])
        }
      }
      array.splice(count)
      count = 0
      for (let index = 0; index < tarray.length; index++) {
        if (tarray[index] !== '') {
          tarray[count++] = getLrcObj(tarray[index])
        }
      }
      tarray.splice(count)
      count = 0
      for (let i = 0; i < array.length; i++) {
        if (count < tarray.length && array[i].seconds === tarray[count].seconds) {
          array[i].twords = tarray[count].words
          count++
        }
      }
      return array
      function getLrcObj (content) {
        var twoParts = content.split(']')
        var time = twoParts[0].substr(1)
        var timeParts = time.split(':')
        var seconds = +timeParts[1]
        var min = +timeParts[0]
        seconds = min * 60 + seconds
        var words = twoParts[1]
        return {
          seconds: seconds,
          words: words
        }
      }
    },
    play () {
      if (this.playIcon === true) {
        document.getElementById('music').pause()
        this.musicPause()
      } else {
        document.getElementById('music').play()
        this.musicPlaying()
      }
      this.$store.commit('setPlayStatus')
    },
    changeVolum (key) {
      this.curvolum = key
      document.getElementById('music').volume = key / 100
      console.log(key)
    },
    saveVolume (volume) {
      this.$store.commit('setPlayVolume', volume)
    },
    musicPlaying () {
      this.timer = setInterval(() => {
        this.currtime++
      }, 1000)
    },
    musicPause () {
      clearInterval(this.timer)
    },
    musicChange (key) {
      document.getElementById('music').currentTime = key
      this.currtime = key
    },
    musicPlayIconPasue () {
      this.playIcon = false
    },
    musicPlayIconPlay () {
      this.playIcon = true
    },
    showUserSongList () {
      this.isShowLyric = false
      this.isShowUserSongList = !this.isShowUserSongList
    },
    showLyric () {
      this.isShowUserSongList = false
      this.isShowLyric = !this.isShowLyric
    }
  },
  created () {
    this.getMusicUrl()
    this.getMusicDetail()
    this.getMusicLyric()
  }
}
</script>

<style scoped>
.controll-box{
  min-width: 1300px;
  display: flex;
  position: relative;
  height: 80px;
  align-items: center;
  justify-content: center;
}
.controll-base{
  text-align: center;
  flex: 2;
}
.controll-base i:nth-child(2){
  margin-right: 10px;
  margin-left: 10px;
}
.controll-base i{
  font-size: 35px;
}
.controll-other{
  flex: 2;
  text-align: center;
}
.controll-other i {
  font-size: 25px;
}
.controll-other i:nth-child(2){
  margin-left: 10px;
  margin-right: 10px;
}
.current-time{
  flex: 0.7;
  text-align: center;
}
.music-progress{
  flex: 4;
}
.all-time{
  flex: 0.7;
  text-align: center;
}
.musicPic-box{
  flex: 1;
  text-align: center;
}
.musicTitle-box{
  text-align: center;
  flex: 2;
}
.musicTitle-box h3 {
  font-size: 14px;
}
.musicTitle-box p{
  margin-top: 5px;
  font-size: 12px;
  color: gray;
}
.music-volum{
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: center;
}
.volum-icon{
  flex: 1;
  text-align: center;
}
.volum-icon i{
  font-size: 25px;
}
.volum-progerss{
  flex: 3;
}
.musicPic{
  width: 70px;
  border-radius: 10px;
}
.user-song-list-box{
  width: 350px;
  height: 400px;
  background-color: white;
  position: absolute;
  right: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  bottom: 80px;
  padding: 15px;
}
.song-lyric{
  width: 350px;
  height: 490px;
  background-color: white;
  position: absolute;
  right: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  bottom: 80px;
  padding: 15px;
  box-sizing: border-box;
}
.song-lyric ul{
  height: 440px;
  width: 350px;
  overflow: hidden;
  overflow-y: scroll;
}
.song-lyric ul li{
  text-overflow: ellipsis;
  white-space:nowrap;
  font-size: 14px;
}
.lyric-top {
  margin-top: 10px;
}
.lyric-top:first-child .lyric-top:last-child{
  margin-top: 0;
}
.hidden-scoll{
  width: 320px;
}
.lyric-active {
  background-color: skyblue;
  opacity: 0.5;
}
.slide-fade-enter-active {
  transition: all .8s ease;
}
.slide-fade-leave-active {
  transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(50px);
  opacity: 0;
}
</style>
