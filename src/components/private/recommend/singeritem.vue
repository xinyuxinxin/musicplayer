<template>
  <div class="singer">
    <div class="headImg">
      <el-avatar :size="120" shape="square" :src="singermessage.picUrl"></el-avatar>
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
  text-align: center;
  height: 20px;
  font-size: 14px;
  line-height: 20px;
}

.singer {
}

.singer:hover {
  cursor: pointer;
}
</style>
