<template>
  <div class="home">
    <div :class="{'changeFixed': isFixed}">
      <navbar></navbar>
    </div>
    <div class="content-box">
      <router-view/>
    </div>
    <div class="foot-box">
      <foot></foot>
    </div>
    <div style="position: fixed;bottom: 0;width: 100%;background-color: white;z-index: 999">
      <music-controll></music-controll>
    </div>
    <login></login>
  </div>
</template>

<script>
import navbar from '@/components/private/navbar/navbar'
import foot from '@/components/private/footer/foot'
import MusicControll from '@/components/private/control/musicControll'
import Login from '@/views/login/login'
export default {
  name: 'Home',
  data () {
    return {
      isFixed: false
    }
  },
  components: {
    Login,
    MusicControll,
    foot,
    navbar
  },
  watch: {
  },
  created () {
    if (this.$storage.get('userdata') === null) {
      this.$message.error('用户登录失效')
      this.$store.commit('setIsNeedLogin', true)
    } else {
      console.log(this.$storage.get('userdata'))
      const userdata = this.$storage.get('userdata')
      this.$store.commit('setIsLogin', true)
      this.$store.commit('setUserMessage', userdata)
    }
  },
  mounted () {
    window.addEventListener('scroll', this.navbarPosition)
  },
  methods: {
    navbarPosition () {
      const top = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset
      if (top > 80) {
        this.isFixed = true
      } else {
        this.isFixed = false
      }
    },
    initCityCode () {
    }
  }
}
</script>
<style scoped>
.home{
  height: 120vh;
}
.foot-box{
  height: 20vh;
  width: 100%;
}
.content-box{
  height: auto;
  min-height: 100vh;
}
.changeFixed {
  position: fixed;
  width: 100%;
  z-index: 999;
}
</style>
