<template>
  <div class="song-list-box">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1">音乐</el-menu-item>
      <el-menu-item index="2">歌手</el-menu-item>
    </el-menu>
    <div>
      <musicitem></musicitem>
      <musicitem class="song" v-for="(item, index) in musicList" :ar="item.artists" :al="item.album" :dt="item.duration" :song="item" :key="index"></musicitem>
    </div>
    <div class="pagination-box" >
      <el-pagination
        background
        @next-click="nextSong"
        @prev-click="preSong"
        @current-change="toPage"
        layout="prev, pager, next"
        :page-size="limit"
        :total="songNum">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import Musicitem from '@/components/private/musicItem/musicitem'
export default {
  name: 'index',
  components: { Musicitem },
  data () {
    return {
      musicList: '',
      activeIndex: '1',
      limit: 20,
      type: 1,
      songNum: 0,
      offset: 0
    }
  },
  methods: {
    async getMusicList () {
      const res = await this.$api.search(this.$route.query.keyword, this.limit, this.offset, this.type)
      if (res.code === 200) {
        // console.log(res)
        this.musicList = res.result.songs
        this.songNum = res.result.songCount
      }
    },
    nextSong () {
      this.offset++
      this.getMusicList()
    },
    preSong () {
      this.offset--
      this.getMusicList()
    },
    toPage (key) {
      this.offset = key
      this.getMusicList()
    }
  },
  mounted () {
    this.getMusicList()
  }
}
</script>

<style scoped>
.song-list-box{
  width: 90%;
  margin: 0 auto;
}
.song:nth-child(2n){
  background-color: #f7f7f7;
}
.pagination-box{
  text-align: center;
  margin: 10px 0 10px 0;
}
</style>
