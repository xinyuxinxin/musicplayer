<template>
  <div class="singer">
    <div class="headImg">
      <el-image class="headImg-pic" :src="singermessage.picUrl"></el-image>
    </div>
    <div class="singername">{{ singermessage.name }}</div>
  </div>
</template>

<script>
export default {
  name: 'singeritem',
  data () {
    return {}
  },
  props: {
    singermessage: {
      type: Object
    }
  },
  methods: {}
}
</script>

<style scoped>
.headImg {
}

.singername {
  width: 120px;
  text-align: center;
  height: 20px;
  font-size: 14px;
  line-height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.singer {
}

.singer:hover {
  cursor: pointer;
}
.headImg-pic{
  width: 120px;
  height: 120px;
}
</style>
