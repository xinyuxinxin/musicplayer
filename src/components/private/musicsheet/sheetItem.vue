<template>
<div>
  <div  class="sheetitem-img">
    <el-image :src="this.sheet.picUrl"></el-image>
    <div class="play-count">
      {{getPlayCount}}
    </div>
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
  computed: {
    getPlayCount () {
      if (this.sheet.playCount > 100000000) {
        return Math.floor(this.sheet.playCount / 100000000) + '亿'
      } else if (this.sheet.playCount > 10000) {
        return Math.floor(this.sheet.playCount / 10000) + '万'
      } else if (this.sheet.playCount > 1000) {
        return Math.floor(this.sheet.playCount / 1000) + '千'
      } else {
        return this.sheet.playCount
      }
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
  width: 130px;
  height: 130px;
  position: relative;
}
.sheetitem-title{
  width: 130px;
  font-size: 8px;
  height: 30px;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  margin-top: 10px;
  -webkit-box-orient: vertical;
  cursor: pointer;
}
.play-count{
  font-size: 12px;
  position: absolute;
  background-color: black;
  color: white;
  opacity: 0.6;
  top: 5px;
  right: 5px;
  padding: 4px;
  border-radius: 10px;
  text-align: center;
}
</style>
