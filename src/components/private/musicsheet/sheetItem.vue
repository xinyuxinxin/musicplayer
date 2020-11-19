<template>
<div>
  <div  class="sheetitem-img" @click="toDetail">
    <el-image v-if="sheet.picUrl" :src="sheet.picUrl"></el-image>
    <el-image v-else :src="sheet.coverImgUrl"></el-image>
    <div class="play-count">
      {{getPlayCount}}
    </div>
  </div>
  <div>
    <router-link :to="{name:'sheetDetail', query:{id: sheet.id}}" class="sheetitem-title" tag="h3">{{sheet.name}}</router-link>
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
      const count = this.sheet.playCount
      return this.$until.playCount(count)
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
    toDetail () {
      this.$router.push({ name: 'sheetDetail', query: { id: this.sheet.id } })
    }
  }
}
</script>

<style scoped>
.sheetitem-img{
  width: 130px;
  height: 130px;
  position: relative;
  cursor: pointer;
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
