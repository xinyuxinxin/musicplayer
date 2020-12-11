<template>
  <div style="height: 400px;width: 400px;overflow-y: scroll">
    <ul v-if="songList.length > 0" class="song-list">
      <small-song-item class="song" v-for="item in songList" :song="item" :key="item.id"></small-song-item>
    </ul>
    <ul v-else>
      没有播放记录,请先登录
    </ul>
  </div>
</template>

<script>
import SmallSongItem from '@/components/private/musicItem/smallSongItem'
export default {
  name: 'smallSongList',
  components: { SmallSongItem },
  data () {
    return {
    }
  },
  props: {
    songList: {
      type: Array,
      default: () => {
        return []
      }
    }
  }
}
</script>

<style scoped>
.song-list{
  padding: 10px 0;
  width: 320px;
  height: 400px;
}
.song:hover{
  background: black;
  opacity: 0.5;
}
</style>
