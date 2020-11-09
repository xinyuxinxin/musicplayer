<template>
  <div class="list-main-box">
    <div class="list-title">
      {{title}}
    </div>
    <div class="list-box">
      <template v-for="(item,index) in list">
        <list-item order-num-color="transparent" :music-on="getPlay(index)" @fromChild="getorderNum" :key="index" :order-title="item.song_name" :audiourl="item.song_url" :order-num="index+1"></list-item>
      </template>
    </div>
  </div>
</template>

<script>
import listItem from '@/components/common/list/listItem'
// import { getmusic } from '@/network/home'
export default {
  name: 'listmain',
  components: { listItem },
  data () {
    return {
      playNum: 0
    }
  },
  computed: {
  },
  props: {
    title: {
      type: String,
      default: '列表名称'
    },
    url: {
      type: String,
      default: 'error'
    },
    list: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: [1, 1]
    }
  },
  created () {
  },
  methods: {
    getorderNum (value) {
      this.playNum = value
      this.$emit('toplay', value)
    },
    getPlay (val) {
      return this.playNum === val + 1
    }
  }
}
</script>

<style scoped>
::-webkit-scrollbar {
  display: none;
}
.list-main-box{
  background-color: transparent;
  height: 100%;
  overflow: hidden;
}
.list-title{
  width: 90%;
  margin: auto;
  height:40px;
  line-height: 40px;
  font-size: 18px;
  border-bottom: solid 2px white;
}
.list-box{
  width: 90%;
  height: 90%;
  margin: 0 auto;
  overflow: scroll;
  overflow-x: hidden;
}
</style>
