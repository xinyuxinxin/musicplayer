<template>
  <div class="singer-box">
    <template v-for="(item,index) in singers">
      <singeritem class="singer"  v-if="index < 22" :key="index" :singermessage="item"></singeritem>
    </template>
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
  width: 100%;
  height: 320px;
  margin-top: 10px;
  margin-bottom: 40px;
  padding: 10px;
  box-sizing: border-box;
  overflow: hidden;
}

.singer{
  float: left;
  margin-left: calc((100% - 120px * 11)/10);
  margin-top: 5px;
  /*margin-top: 10px;*/
  /*margin-right: calc((100% - 300px)/2);*/
}
.singer-box .singer:nth-child(11n+1){
  margin-left: 0;
}
/*.singer:nth-child(3n){*/
/*  margin-right: 0;*/
/*}*/
</style>
