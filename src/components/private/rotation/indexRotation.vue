<template>
<div id="rotation">
  <el-carousel arrow="hover" :interval="4000" type="card" indicator-position="none">
    <el-carousel-item v-for="(item,index) in banner" :key="index">
      <el-image :src="item.imageUrl" @click="toMusic">
      </el-image>
    </el-carousel-item>
  </el-carousel>
</div>
</template>

<script>
export default {
  name: 'indexrotation',
  data () {
    return {
      banner: ''
    }
  },
  components: {
  },
  created () {
    this.getBanner()
  },
  methods: {
    async getBanner () {
      try {
        this.banner = await this.$api.getBanner()
        if (this.banner.code === 200) {
          this.banner = this.banner.banners
          console.log(this.banner)
        }
      } catch (error) {
        console.log(error)
      }
    },
    toMusic () {
      console.log('111')
    }
  }
}
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}
img{
  position: center;
}
#rotation{
  width: 90%;
  margin: auto;
}
.el-carousel__item:nth-child(2n) {
}

.el-carousel__item:nth-child(2n+1) {
}
</style>
