<template>
  <div class="singer-box">
    <div v-if="singers.length">
      <template v-for="(item,index) in singers">
        <singeritem class="singer"  :key="index" :singermessage="item"></singeritem>
      </template>
    </div>
    <div v-else>
      <loading></loading>
    </div>
  </div>
</template>

<script>
import singeritem from '@/components/private/recommend/singeritem'
import Loading from '@/components/common/loading/loading'
export default {
  name: 'singer',
  components: { Loading, singeritem },
  data () {
    return {
      // singers: ''
    }
  },
  created () {
    // this.getHotSinger()
  },
  props: {
    singers: {
      type: Array
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.singer-box{
  width: 100%;
  height: auto;
  padding: 10px;
  box-sizing: border-box;
  overflow: hidden;
}

.singer{
  float: left;
  overflow: hidden;
  margin-left: calc((100% - 120px * 10)/9);
  margin-bottom: 30px;
}
.singer-box .singer:nth-child(10n+1){
  margin-left: 0px;
}
</style>
