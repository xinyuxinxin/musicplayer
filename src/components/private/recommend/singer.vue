<template>
  <div>
    <singeritem class="singer-box" v-for="(item,index) in singers" :key="index" :singermessage="item"></singeritem>
  </div>
</template>

<script>
import singeritem from '@/components/private/recommend/singeritem'
export default {
  name: 'singer',
  components: { singeritem },
  data () {
    return {
      singers: ''
    }
  },
  created () {
    this.getHotSinger()
  },
  methods: {
    async getHotSinger () {
      try {
        this.singers = await this.$api.getHotSinger()
        if (this.singers.code === 200) {
          this.singers = this.singers.artists
          console.log(this.singers)
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>
.singer-box{
  float: left;
  margin-top: 10px;
  margin-right: calc((100% - 300px)/2);
}
.singer-box:nth-child(3n){
  margin-right: 0;
}
</style>
