<template>
<div>
  <div  class="sheetitem-img">
    <el-image :src="this.sheet.picUrl"></el-image>
  </div>
  <div>
    <router-link :to="{name:'sheetDetail', query:{id:sheet.id}}" class="sheetitem-title" tag="h3">{{this.sheet.name}}</router-link>
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
