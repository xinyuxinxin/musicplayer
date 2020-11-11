<template>
  <div class="home">
    <navbar></navbar>
    <router-view/>
    <foot></foot>
    <div style="position: fixed;bottom: 0;width: 100%;background-color: white">
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
  components: {
    Login,
    MusicControll,
    foot,
    navbar
  },
  data () {
    return {
    }
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
  },
  methods: {
  }
}
</script>
