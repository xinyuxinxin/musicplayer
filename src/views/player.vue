<template>
  <div>1111</div>
</template>
<style scoped>
</style>
<script>
export default {
  data () {
    return {
      res: ''
    }
  },
  beforeMount () {
    this.getTop()
  },
  methods: {
    async getTop () {
      try {
        this.res = await this.$api.getSearchHot()
        console.log(this.res.code)
      } catch (error) {
        alert(error)
      }
    }
  },
  mounted () {
  }
}
</script>
