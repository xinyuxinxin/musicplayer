<template>
  <div>
    <newsongitem class="newsong" v-for="(item,index) in newsonglist" :song="item" :key="index"></newsongitem>
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
  margin-top: 10px;
}
.newsong:hover{
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  transition: 1s;
}
</style>
