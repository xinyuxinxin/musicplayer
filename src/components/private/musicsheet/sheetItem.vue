<template>
<div>
  <div  class="sheetitem-img">
    <el-image :src="this.sheet.picUrl"></el-image>
  </div>
  <div>
    <h3 class="sheetitem-title">{{this.sheet.name}}</h3>
  </div>
</div>
</template>

<script>
export default {
  name: 'sheetItem',
  data () {
    return {
    }
  },
  props: {
    sheet: {
      type: Object
    }
  },
  created () {
  },
  methods: {
  }
}
</script>

<style scoped>
.sheetitem-img{
  width: 150px;
  height: 150px;
}
.sheetitem-title{
  width: 150px;
  font-size: 8px;
  height: 30px;
  margin-top: 2px;
}
</style>
