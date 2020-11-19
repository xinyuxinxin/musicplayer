<template>
<div style="width: 80%;margin: 0px auto;padding: 20px">
  <div class="title">
    全部{{cloucCount}}首
  </div>
  <musicitem class="song"></musicitem>
  <musicitem class="song" v-for="(item, index) in cloudlist" :ar="item.simpleSong.ar" :al="item.simpleSong.al" :dt="item.simpleSong.dt" :song="item.simpleSong" :key="index"></musicitem>
</div>
</template>

<script>
import Musicitem from '@/components/private/musicItem/musicitem'
export default {
  name: 'index',
  components: { Musicitem },
  data () {
    return {
      cloudlist: '',
      cloucCount: 0
    }
  },
  created () {
    this.getCloudMusic()
  },
  methods: {
    async getCloudMusic () {
      try {
        const res = await this.$api.getcloud()
        if (res.code === 200) {
          this.cloudlist = res.data
          console.log(this.cloudlist)
          this.cloucCount = res.count
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>
.title{
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-indent: 4em;
}
.song:nth-child(2n){
  background-color: #f7f7f7;
}
</style>
