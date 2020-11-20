<template>
  <div class="singer-box">
    <div v-if="singers.length">
      <template v-for="(item,index) in singers">
        <singeritem class="singer"  :key="index" :singermessage="item"></singeritem>
      </template>
    </div>
    <div v-else>
      没数据
    </div>
  </div>
</template>

<script>
import singeritem from '@/components/private/recommend/singeritem'
export default {
  name: 'singer',
  components: { singeritem },
  data () {
    return {
      // singers: ''
    }
  },
  created () {
    // this.getHotSinger()
  },
  props: {
    singers: {
      type: Array
    }
  },
  methods: {
    // async getHotSinger () {
    //   try {
    //     this.singers = await this.$api.getHotSinger()
    //     if (this.singers.code === 200) {
    //       this.singers = this.singers.artists
    //       console.log(this.singers)
    //     }
    //   } catch (e) {
    //     console.log(e)
    //   }
    // }
  }
}
</script>

<style scoped>
.singer-box{
  width: 100%;
  height: auto;
  margin-bottom: 40px;
  padding: 10px;
  box-sizing: border-box;
  overflow: hidden;
}

.singer{
  float: left;
  overflow: hidden;
  margin-left: calc((100% - 120px * 10)/9);
  margin-bottom: 30px;
  /*margin-right: calc((100% - 300px)/2);*/
}
.singer-box .singer:nth-child(10n+1){
  margin-left: -10px;
}
/*.singer:nth-child(3n){*/
/*  margin-right: 0;*/
/*}*/
</style>
