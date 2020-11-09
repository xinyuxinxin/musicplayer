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
  methods: {
    async getsheet () {
      try {
        this.sheet = await this.$api.getPersonalized('12')
        if (this.sheet.code === 200) {
          this.sheet = this.sheet.result
          console.log(this.sheet)
        }
      } catch (e) {
        console.log(e)
      }
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
  margin-right: calc((100% - 900px)/5);
  /*flex: 1;*/
}
.sheetitem:nth-child(6n+0){
  margin-right: 0;
}
/*#sheets{*/
/*  display: flex;*/
/*  justify-content: center;*/
/*  align-items: center;*/
/*}*/
</style>
