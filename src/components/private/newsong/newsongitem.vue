<template>
  <div class="newsong" @click="playMusic">
    <div class="songImg">
      <el-image class="songImg-img" :src="song.picUrl"></el-image>
    </div>
    <div class="songMessage">
      <router-link :to="{name:'songDetail', query: {id:song.id}}" tag="h2">{{song.name}}</router-link>
      <p>{{song.song.artists[0].name}}</p>
    </div>
    <div class="songTime">
      {{getAllMin}}
    </div>
    <div class="playCount">
      {{getPlayCount}}播放
    </div>
    <div class="option">
      <i class="el-icon-more"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'newsongitem',
  props: {
    song: {
      type: Object
    }
  },
  computed: {
    getAllMin () {
      var min = Math.floor(this.song.song.bMusic.playTime / 1000 / 60)
      var s = this.song.song.bMusic.playTime - min * 60 * 1000
      s = Math.floor(s / 1000)
      if (min < 10) {
        min = '0' + min
      }
      if (s < 10) {
        s = '0' + s
      }
      return min + ':' + s
    },
    getPlayCount () {
      return this.$until.playCount(this.song.song.bMusic.playTime)
    }
  },
  methods: {
    playMusic () {
      this.$store.commit('setPlayMusic', this.song.id)
    }
  }
}
</script>

<style scoped>
.songImg{
  flex: 1;
  text-align: center;
}
.songMessage{
  flex: 4.2;
  height: 60px;
  text-align: center;
  padding: 10px;
  box-sizing: border-box;
}
.songTime{
  flex: 1;
  text-align: center;
  font-size: 15px;
}
.playCount{
  flex: 2;
  text-align: center;
  font-size: 12px;
}
.option{
  flex: 1;
  text-align: center;
}
.songImg-img{
  display: inline-block;
  width: 60px;
  height: 60px;
  margin: 0 auto;
}
.newsong{
  display: flex;
  justify-content: center;
  align-items: center;
}
.songMessage h2{
  font-size: 15px;
}
.songMessage p{
  font-size: 13px;
  color: gray;
}
</style>
