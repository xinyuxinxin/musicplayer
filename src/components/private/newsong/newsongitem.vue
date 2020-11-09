<template>
  <div class="newsong" @click="playMusic">
    <div class="songImg">
      <el-image :src="song.picUrl"></el-image>
    </div>
    <div class="songMessage">
      <h2>{{song.name}}</h2>
      <p>{{song.song.artists[0].name}}</p>
    </div>
    <div class="songTime">
      {{getAllMin}}
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
  flex: 1.8;
}
.songMessage{
  flex: 7.2;
}
.songTime{
  flex: 1;
}
.newsong{
  display: flex;
  justify-content: center;
  align-items: center;
}
.songMessage h2{
  font-size: 18px;
  text-indent: 17px;
  margin-bottom: 30px;
}
.songMessage p{
  text-indent: 1em;
  color: gray;
  margin-top: 20px;
}
</style>
