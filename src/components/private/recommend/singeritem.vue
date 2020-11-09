<template>
  <div class="singer">
    <div class="headImg">
      <el-avatar :size="100" :src="singermessage.picUrl"></el-avatar>
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
}

.singer {
  width: 100px;
}

.singer:hover {
  cursor: pointer;
}
</style>
