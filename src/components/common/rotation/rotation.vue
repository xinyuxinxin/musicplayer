<template>
  <div ref="rotation" class="rotation-box">
    <rotatiom-item></rotatiom-item>
  </div>
</template>

<script>

import rotatiomItem from '@/components/common/rotation/rotatiomItem'
export default {
  name: 'rotation',
  data () {
    return {
      screenWidth: ''
    }
  },
  props: {
  },
  components: {
    rotatiomItem
  },
  created () {
    this.screenWidth = window.outerWidth
  },
  computed: {
  },
  methods: {
  },
  mounted () {
    // this.timer = setInterval(this.nextImg,4000)
  }
}
</script>

<style scoped>
.rotation-box{
  background-color: red;
}
</style>
