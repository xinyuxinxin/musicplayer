<template>
  <div style="cursor: pointer" @click="playMusic">
    <span class="song-item">
      {{song.name}}
    </span>
    <span class="song-time">
      {{getTime}}
    </span>
  </div>
</template>

<script>
export default {
  name: 'smallSongItem',
  computed: {
    getTime () {
      return this.$until.toTime(this.song.time, 1000)
    }
  },
  props: {
    song: {
      type: Object,
      default: () => {
        return {
          name: '歌曲名称'
        }
      }
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
.song-item{
  display: inline-block;
  width: 80%;
  padding: 0;
  margin: 10px 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 14px;
  float: left;
}
.song-time{
  display: inline-block;
  margin: 10px 0;
  font-size: 14px;
  float: right;
}
</style>
