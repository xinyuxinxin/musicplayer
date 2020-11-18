<template>
<div>
  <rotation></rotation>
  <div style="width: 90%;margin: 0 auto">
    <smalltitle>
      <template v-slot:head>
        <h3><i class="el-icon-arrow-right"></i>推荐歌单</h3>
      </template>
      <template v-slot:tail>
        <a href="#" style="color: black">更多</a>
        <i class="el-icon-arrow-right"></i>
      </template>
    </smalltitle>
    <musicsheet :sheet="this.musicsheet"></musicsheet>
  </div>
  <div style="width: 90%;margin: 0 auto;position: relative;vertical-align: top" class="clearfix">
    <div class="clearfix">
      <smalltitle>
        <template v-slot:head>
          <h3><i class="el-icon-arrow-right"></i>推荐歌曲</h3>
        </template>
        <template v-slot:tail>
          <a href="#" style="color: black">更多</a>
          <i class="el-icon-arrow-right"></i>
        </template>
      </smalltitle>
      <newsong></newsong>
    </div>
  </div>
  <div style="width: 90%;margin: 0 auto" class="clearfix">
    <smalltitle>
      <template v-slot:head>
        <h3><i class="el-icon-arrow-right"></i>推荐歌手</h3>
      </template>
      <template v-slot:tail>
        <a href="#" style="color: black">更多</a>
        <i class="el-icon-arrow-right"></i>
      </template>
    </smalltitle>
    <singer></singer>
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
      musicsheet: []
    }
  },
  created () {
    this.getsheet()
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
    }
  },
  components: { Singer, Newsong, Musicsheet, smalltitle, rotation }
}
</script>

<style scoped>

</style>
