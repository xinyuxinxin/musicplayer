<template>
<div style="width: 80%;margin: 0 auto">
  <musicitem></musicitem>
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

</style>
