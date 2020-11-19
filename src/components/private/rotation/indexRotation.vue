<template>
<div id="rotation">
  <el-carousel  height="240px" arrow="hover" :interval="4000" type="card" >
    <el-carousel-item  v-for="(item,index) in banner" :key="index">
      <img class="banner-img" :src="item.imageUrl" @click="toMusic">
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
  margin: auto;
}
.banner-img{
  width: 100%;
  height: auto;
}
.el-carousel__item:nth-child(2n) {
}

.el-carousel__item:nth-child(2n+1) {
}
</style>
