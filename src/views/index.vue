<template>
<div>
  <div style="width: 1300px;margin: 0 auto">
    <rotation></rotation>
  </div>
  <div style="width: 1300px;margin: 0 auto">
    <smalltitle>
      <template v-slot:head>
        <h3><i class="el-icon-arrow-right"></i>推荐歌单</h3>
      </template>
      <template v-slot:tail>
        <router-link tag="span" to="/playlist">更多<i class="el-icon-arrow-right"></i></router-link>
      </template>
    </smalltitle>
    <musicsheet :sheet="this.musicsheet"></musicsheet>
  </div>
  <div style="width: 1300px;margin: 0 auto;position: relative;vertical-align: top" class="clearfix">
    <div class="clearfix">
      <smalltitle>
        <template v-slot:head>
          <h3><i class="el-icon-arrow-right"></i>推荐歌曲</h3>
        </template>
        <template v-slot:tail>
          <router-link tag="span" to="/playlist">更多<i class="el-icon-arrow-right"></i></router-link>
        </template>
      </smalltitle>
      <newsong></newsong>
    </div>
  </div>
  <div style="width: 1300px;margin: 0 auto" class="clearfix">
    <smalltitle>
      <template v-slot:head>
        <h3><i class="el-icon-arrow-right"></i>推荐歌手</h3>
      </template>
      <template v-slot:tail>
        <router-link tag="span" to="/artist">更多<i class="el-icon-arrow-right"></i></router-link>
      </template>
    </smalltitle>
    <singer :singers="singers"></singer>
  </div>

</div>
</template>

<script>
import rotation from '@/components/private/rotation/indexRotation'
import smalltitle from '@/components/common/smalltitle/smalltitle'
import Musicsheet from '@/components/private/musicsheet/musicsheet'
import Newsong from '@/components/private/newsong/newsong'
import Singer from '@/components/private/recommend/singer'
export default {
  name: 'index',
  data () {
    return {
      searchKey: '',
      musicsheet: [],
      singers: []
    }
  },
  created () {
    this.getsheet()
    this.getHotSinger()
  },
  methods: {
    async getsheet () {
      try {
        this.musicsheet = await this.$api.getPersonalized('16')
        if (this.musicsheet.code === 200) {
          this.musicsheet = this.musicsheet.result
          console.log(123)
          console.log(this.musicsheet)
        }
      } catch (e) {
        console.log(e)
      }
    },
    async getHotSinger () {
      try {
        const res = await this.$api.getHotSinger()
        if (res.code === 200) {
          this.singers = res.artists
          console.log(this.singers)
        }
      } catch (e) {
        console.log(e)
      }
    }
  },
  components: { Singer, Newsong, Musicsheet, smalltitle, rotation }
}
</script>

<style scoped>
span{
  cursor: pointer;
}
span:hover{
  color: gray;
}
</style>
