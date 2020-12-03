<template>
  <div class="navbar">
    <div class="logo">
      <router-link tag="h1" to="/"><i class="iconfont iconyinle1"></i>STARMUSIC</router-link>
    </div>
    <el-menu :default-active="activeIndex" active-text-color="#ffffff" background-color="#242424" text-color="#d2d2d2"
             class="nav" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1"><router-link to="/" tag="p">发现音乐</router-link></el-menu-item>
      <el-menu-item index="2"><router-link to="/rank" tag="p">排行榜</router-link></el-menu-item>
      <el-menu-item index="3"><router-link to="/playlist" tag="p">歌单</router-link></el-menu-item>
      <el-menu-item index="4"><router-link to="/artist" tag="p">歌手</router-link></el-menu-item>
      <el-menu-item index="5"><router-link to="/" tag="p">MV</router-link></el-menu-item>
    </el-menu>
    <div class="searchbox">
      <el-input
        class="search"
        size="small"
        placeholder="请输入内容"
        @keyup.enter.native="searchMusic"
        v-model="searchContent">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
    </div>
    <div class="login" >
      <a  v-if="!this.$store.state.isLogin" href="#" @click="openLogin">登录</a>
      <div v-else style="color: white" @click="showUserOption">
        <el-image class="head-img" :src="this.$store.state.avatarUrl"></el-image>
        <ul v-if="isShowUserOption" class="user_option">
          <router-link tag="li" :to="'/person'">我的信息</router-link>
          <router-link tag="li" :to="'/cloud'">我的云盘</router-link>
          <li @click="logout">注销登录</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'navbar',
  data () {
    return {
      activeIndex: '1',
      searchContent: '',
      isShowUserOption: false
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    searchMusic () {
      if (this.searchContent !== '') {
        this.$router.push({
          name: 'searchlist',
          query: { keyword: this.searchContent }
        })
      }
    },
    openLogin () {
      this.$store.commit('setIsNeedLogin', true)
    },
    showUserOption () {
      this.isShowUserOption = !this.isShowUserOption
    },
    async logout () {
      try {
        const res = await this.$api.logout()
        if (res.code === 200) {
          window.localStorage.clear()
          this.$store.commit('setIsLogin', false)
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
<style scoped>
.navbar {
  display: flex;
  background-color: #242424;
  align-items: center;
  justify-content: center;
  min-width: 1300px;
}

.navbar h1 {
  font-weight: 500;
  font-size: 20px;
  min-width: 180px;
}

h1 i {
  font-size: 25px;
  margin-right: 12px;
  color: yellow;
}

.logo {
  flex: 1;
  color: white;
  text-align: center;
}
.logo h1 {
  height: 30px;
  line-height: 30px;
  font-size: 20px;
}
.nav {
  flex: 5;
  display: inline-block;
}

.search-box {
  flex: 3;
}

.login {
  flex: 1;
  text-align: center;
  position: relative;
}

.user_option:before{
  content: '';
  width: 0px;
  height: 0px;
  padding: 0px;
  display: block;
  margin: -16px auto 0px;
  border: 8px solid transparent;
  border-bottom-color: white;
}
.user_option{
  position: absolute;
  width: 90px;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  color: black;
  list-style: none;
  border-radius: 10px;
  z-index: 999;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-top: 10px;
}
.user_option li{
  margin: 10px auto;
  font-size: 13px;
  height: 25px;
  line-height: 25px;
  text-align: center;
}

.search {
  border: none;
}

.head-img{
  width: 40px;
  border-radius: 50%;
}
p{
  font-size: 14px;
}
</style>
