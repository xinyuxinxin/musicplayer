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
    }
  },
  components: { sheetItem },
  computed: {
  },
  methods: {
  },
  props: {
    limit: {
      type: Number,
      default: 12
    },
    sheet: {
      type: Array
    }
  },
  created () {
  }
}
</script>

<style scoped>
.sheetitem{
  float: left;
  margin-top: 10px;
  margin-bottom: 20px;
  margin-right: calc((100% - 1040px)/7);
  box-shadow: 2px 1px 2px black;
  position: relative;
  /*flex: 1;*/
}
.sheetitem:nth-child(8n+0){
  margin-right: 0;
}
.sheetitem:hover{
  box-shadow: 3px 2px 3px black;
  transform: translateY(-5px);
  transition: 1s;
}
</style>
