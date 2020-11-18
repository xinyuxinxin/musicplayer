<template>
  <div>
    <div class="newsong-box clearfix">
      <newsongitem class="newsong" v-for="item in newsonglist" :song="item" :key="item.id"></newsongitem>
    </div>
  </div>
</template>

<script>
import Newsongitem from '@/components/private/newsong/newsongitem'
export default {
  name: 'newsong',
  components: { Newsongitem },
  data () {
    return {
      newsonglist: ''
    }
  },
  created () {
    this.getnewsong()
  },
  methods: {
    async getnewsong () {
      try {
        this.newsonglist = await this.$api.getNewSongs()
        if (this.newsonglist.code === 200) {
          this.newsonglist = this.newsonglist.result
          console.log(this.newsonglist)
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>
.newsong{
  min-width: 500px;
  width: 45%;
  border-radius: 10px;
  padding: 10px;
  margin: 20px auto 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}
.newsong-box{
  width: 90%;
  margin: 0 auto;
}
.newsong:nth-child(2n+1){
  float: right;
}
.newsong:nth-child(2n) {
  float: left;
}
</style>
