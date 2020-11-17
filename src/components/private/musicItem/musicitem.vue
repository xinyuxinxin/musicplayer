<template>
  <div class="item-box">
    <div class="song-name" v-if="song">
      <i class="iconfont icon-bofang" @click="playMusic"></i>
      <h3>{{song.name}}</h3>
    </div>
    <div class="song-name" style="text-indent: 4em" v-else>
      歌曲
    </div>
    <div class="song-fun">
      1
    </div>
    <div class="song-ar">
      {{getArtists}}
    </div>
    <div class="song-alb" v-if="al">
      《{{al.name}}》
    </div>
    <div class="song-alb" v-else>
      专辑
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
    },
    ar: {
      type: Array
    },
    al: {
      type: Object
    },
    dt: {
      type: Number,
      default: 0
    }
  },
  computed: {
    getTime () {
      if (this.dt === 0) {
        return '时间'
      } else {
        return this.$until.toTime(this.dt, 1000)
      }
    },
    getArtists () {
      if (!this.ar) {
        return '歌手'
      }
      var name = ''
      for (let i = 0; i < this.ar.length - 1; i++) {
        name += this.ar[i].name + '/'
      }
      name += this.ar[this.ar.length - 1].name
      return name
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
.song-alb,.song-ar{
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
