<template>
  <div :class="{'visi':!$store.state.isNeedLogin}">
    <div class="login-background" >
    </div>
    <div class="login-form">
       <i class="el-icon-close" @click="closeLogin"></i>
       <div class="title-box">
         <div style="display: table-cell;vertical-align: middle;">
           <i class="iconfont icon-wangyiyunyinle"></i>
           <h1>CLOUDMUSIC</h1>
         </div>
       </div>
      <div class="username-box">
        <el-input v-model='username' placeholder="手机号" prefix-icon="el-icon-user"></el-input>
      </div>
      <div class="userpwd-box">
        <el-input v-model="password" placeholder="密码" prefix-icon="el-icon-lock" show-password></el-input>
      </div>
      <div class="sub-box">
        <button class="sub-botton" @click="toLogin">登录</button>
      </div>
      <div class="img-box">
        <el-image src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3614224898,382736402&fm=26&gp=0.jpg" ></el-image>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    closeLogin () {
      this.$store.commit('setIsNeedLogin', false)
    },
    async toLogin () {
      try {
        const res = await this.$api.login(this.username, this.password)
        if (res.code === 200) {
          console.log(res)
          this.$storage.set('userdata', res)
          this.$store.commit('setIsNeedLogin', false)
          this.$store.commit('setIsLogin', true)
        }
      } catch (e) {
        this.$message.error('登录失败，账号或密码错误')
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>
.login-background{
  background-color: black;
  width: 1000vw;
  height: 100vh;
  position: fixed;
  opacity: 0.4;
  top: 0;
  z-index: 99;
}
.visi{
  display: none;
}
.login-form{
  width: 400px;
  height: 500px;
  background-color: white;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  z-index: 100;
  text-align: center;
  border-radius: 10px;
}
.title-box{
  width: 100%;
  height: 150px;
  display: table;
  text-align: center;
}
.title-box h1{
  display: inline-block;
  width: 90%;
}
.title-box i {
  display: inline-block;
  width: 90%;
  color: red;
  font-size:50px;
}
.username-box,.userpwd-box, .sub-box{
  width: 80%;
  margin: 20px auto 0;
}
.sub-botton{
  width: 100%;
  height: 40px;
  background-color: #5dd5c8;
  color: white;
  outline: none;
  border: none;
}
.sub-botton::after{
  border: none;
}
.el-icon-close{
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
