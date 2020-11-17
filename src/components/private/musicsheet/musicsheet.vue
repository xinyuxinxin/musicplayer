<template>
<div class="clearfix">
  <div id="sheets">
    <sheet-item class="sheetitem" v-for="(item,index) in sheet" :sheet="item" :key="index"></sheet-item >
  </div>
</div>
</template>

<script>
import sheetItem from '@/components/private/musicsheet/sheetItem'
export default {
  name: 'musicsheet',
  data () {
    return {
      sheet: ''
    }
  },
  components: { sheetItem },
  computed: {
  },
  methods: {
    async getsheet () {
      try {
        this.sheet = await this.$api.getPersonalized('16')
        if (this.sheet.code === 200) {
          this.sheet = this.sheet.result
          console.log(this.sheet)
        }
      } catch (e) {
        console.log(e)
      }
    }
  },
  props: {
    limit: {
      type: Number,
      default: 12
    }
  },
  created () {
    this.getsheet()
  }
}
</script>

<style scoped>
.sheetitem{
  float: left;
  margin-top: 10px;
  margin-bottom: 20px;
  margin-right: calc((100% - 1040px)/7);
  /*flex: 1;*/
}
.sheetitem:nth-child(8n+0){
  margin-right: 0;
}
</style>
