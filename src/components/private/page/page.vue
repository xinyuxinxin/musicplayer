<template>
  <div class="page-box">
    <div class="lyric">
      <ul class="tail" :style="{marginTop:getTop}">
        <li :key="index" :class="{'isline':currenLine - 1 === index}" v-for="(i,index) in lrc">
          {{ i[1] }}
        </li>
      </ul>
    </div>
    <img class="music-img" :src="playmusic.song_img">
  </div>
</template>

<script>
export default {
  name: 'page',
  data () {
    return {
      lrc: null,
      lrctop: 300,
      currenLine: 0,
      maxTime: 0
    }
  },
  props: {
    playmusic: {
      type: Object,
      default: null
    },
    currenTime: {
      type: Number,
      default: 0
    }
  },
  mounted () {
    this.toLry()
  },
  methods: {
    toLry () {
      var arr = []
      if (this.playmusic.song_lyr.length <= 0) {
        const a = [0, '没有歌词']
        arr.push(a)
        this.lrc = arr
        return
      }
      var lyrics = this.playmusic.song_lyr.split('\n')
      var getLtricTime = /\[\d{2}:\d{2}.\d{2}\]/g
      while (!getLtricTime.test(lyrics[0])) {
        lyrics = lyrics.splice(1)
      }
      if (lyrics[lyrics.length - 1].length === 0) {
        lyrics.pop()
      }
      lyrics.forEach(item => {
        var index = item.indexOf(']')
        var time = item.substr(1, index - 1)
        var timeArr = time.split(':')
        var geci = item.substr(index + 1)
        arr.push([timeArr[0] * 60 + parseFloat(timeArr[1]), geci])
      })
      console.log(arr)
      arr.sort(function (a, b) {
        return a[0] - b[0]
      })
      this.lrc = arr
    }
  },
  computed: {
    getTop () {
      return this.lrctop + 'px'
    }
  },
  watch: {
    'playmusic.song_lyr': {
      handler: function () {
        var arr = []
        if (this.playmusic.song_lyr.length <= 0) {
          const a = [0, '没有歌词']
          arr.push(a)
          this.lrc = arr
          return
        }
        var lyrics = this.playmusic.song_lyr.split('\n')
        var getLtricTime = /\[\d{2}:\d{2}.\d{2}\]/g
        while (!getLtricTime.test(lyrics[0])) {
          lyrics = lyrics.splice(1)
        }
        if (lyrics[lyrics.length - 1].length === 0) {
          lyrics.pop()
        }
        lyrics.forEach(item => {
          var index = item.indexOf(']')
          var time = item.substr(1, index - 1)
          var timeArr = time.split(':')
          var geci = item.substr(index + 1)
          arr.push([timeArr[0] * 60 + parseFloat(timeArr[1]), geci])
        })
        console.log(arr)
        arr.sort(function (a, b) {
          return a[0] - b[0]
        })
        this.lrc = arr
      }
    },
    'playmusic.song_url': {
      handler: function () {
        this.lrctop = 300
      }
    },
    currenTime: {
      handler: function () {
        if (this.currenTime < this.maxTime) {
          this.currenLine = 0
        }
        while (this.currenTime >= this.lrc[this.currenLine][0]) {
          this.currenLine++
          this.lrctop = 300 - 30.8 * this.currenLine
        }
        this.maxTime = this.currenTime
      }
    }
  }
}
</script>

<style scoped>
::-webkit-scrollbar {
  display: none;
}

.page-box {
  position: relative;
  overflow: hidden;
}

.lyric {
  display: flex;
  margin-top: 50px;
  height: 600px;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-evenly;
  text-align: center;
}

.head {
  font-size: 25px;
  flex-grow: 1;
}

.tail {
  height: 500px;
  flex-grow: 1;
  transition: 0.5s;
}

.tail li {
  list-style: none;
  margin-top: 10px;
}

.music-img {
  height: 150px;
  width: 150px;
  position: absolute;
  top: 100px;
  right: 100px;
}

.isline {
  color: white;
}
</style>
