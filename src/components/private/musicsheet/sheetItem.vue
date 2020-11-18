<template>
<div>
  <div  class="sheetitem-img">
    <el-image v-if="this.sheet.picUrl" :src="this.sheet.picUrl"></el-image>
    <el-image v-else :src="this.sheet.coverImgUrl"></el-image>
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
      return this.$until.playCount(this.sheet.playCount)
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
  height: 40px;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  padding: 5px 3px;
  box-sizing: border-box;
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
