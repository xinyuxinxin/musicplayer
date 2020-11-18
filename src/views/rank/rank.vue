<template>
<div>
  <div class="ranklist">
    <musicsheet :sheet="ranksheet"></musicsheet>
  </div>
<!--  <div>{{this.rewardToplist.name}}</div>-->
<!--  <div>{{this.artistToplist.name}}</div>-->
</div>
</template>

<script>
import Musicsheet from '@/components/private/musicsheet/musicsheet'
export default {
  name: 'rank',
  components: { Musicsheet },
  data () {
    return {
      ranksheet: [],
      artistToplist: [],
      rewardToplist: []
    }
  },
  methods: {
    async getRankList () {
      try {
        const res = await this.$api.getToplist()
        if (res.code === 200) {
          this.ranksheet = res.list
          this.artistToplist = res.artistToplist
          this.rewardToplist = res.rewardToplist
          console.log(res)
        }
      } catch (e) {
        console.log(e)
      }
    }
  },
  created () {
    this.getRankList()
  }
}
</script>

<style scoped>
.ranklist{
  width: 80%;
  margin: 0 auto;
}
</style>
