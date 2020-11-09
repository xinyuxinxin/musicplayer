<template>
  <div class="item-box">
    <div class="song-name">
      <i class="iconfont icon-bofang" @click="playMusic"></i>
      <h3>{{song.name}}</h3>
    </div>
    <div class="song-fun">
      1
    </div>
    <div class="song-ar">
      {{song.artists[0].name}}
    </div>
    <div class="song-alb">
      《{{song.album.name}}》
    </div>
    <div class="song-time">
      {{getTime}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'musicitem',
  props: {
    song: {
      type: Object
    }
  },
  computed: {
    getTime () {
      return this.$until.toTime(this.song.duration, 1000)
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
.item-box{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
}
.song-alb,
.song-ar,
.song-time{
  flex: 1;
  text-align: center;
}
.song-name h3{
  flex: 3;
  text-align: left;
  font-size: 14px;
}
.song-name i{
  flex: 0.5;
  text-align: center;
  font-size: 20px;
}
.song-name {
  display: flex;
  flex: 2;
  text-align: center;
}
.song-alb{
  text-overflow: ellipsis;
  overflow:hidden;
  white-space: nowrap;
}
.song-fun{
  flex: 2;
  visibility: hidden;
  text-align: right;
}
</style>
