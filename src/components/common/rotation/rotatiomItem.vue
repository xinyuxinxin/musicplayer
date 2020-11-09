<template>
  <div class="item" :style="{'width':imgWidth}"><img :src="src"></div>
</template>
<script>
export default {
  name: 'rotatiomItem',
  data () {
    return {}
  },
  props: {
    src: {
      type: String,
      default: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3817306358,1822141315&fm=26&gp=0.jpg'
    }
  },
  computed: {
    imgWidth () {
      return document.body.clientWidth * 0.8 + 'px'
    }
  },
  mounted () {
  }
}
</script>

<style scoped>
.item {
  float: left;
}

.item img {
  width: 100%;
  background-repeat: no-repeat;
}
</style>
