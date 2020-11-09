<template>
  <div class="navbar">
    <div class="logo">
      <h1><i class="iconfont icon-wangyiyunyinle"></i>网易云音乐</h1>
    </div>
    <el-menu :default-active="activeIndex" active-text-color="#ffffff" background-color="#242424" text-color="#d2d2d2"
             class="nav" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">发现音乐</el-menu-item>
      <el-menu-item index="2">我的音乐</el-menu-item>
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
    <div class="login">
      <a  v-if="false" href="#" @click="openLogin">登录</a>
      <div v-else style="color: white">
        <el-image class="head-img" src="https://p1.music.126.net/1dmWuCx3WyHdSjZlRs9Hvg==/109951163593120246.jpg?param=30y30"></el-image>
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
      searchContent: ''
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
      this.$store.commit('setIsNeedLogin')
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
  overflow: hidden;
}

.navbar h1 {
  font-weight: 500;
  font-size: 20px;
  min-width: 180px;
}

h1 i {
  color: red;
  font-size: 30px;
  margin-right: 12px;
}

.logo {
  flex: 1;
  color: white;
  text-align: center;
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
}

.search {
  border: none;
}

.head-img{
  width: 40px;
  border-radius: 50%;
}
</style>
