<template>
  <div>
    <div class="person-background">
    </div>
    <div class="person-headImg-box">
      <div class="person-headImg">
        <el-image :src="personMessage.profile.avatarUrl"></el-image>
      </div>
      <div class="person-message">
        <ul>
          <li>名称：{{personMessage.profile.nickname}}</li>
          <li>会员等级：LV.{{personMessage.level}}</li>
          <li>听过歌曲： {{personMessage.listenSongs}}</li>
          <li>已经历： {{personMessage.createDays}}天</li>
          <li>ID: {{personMessage.profile.userId}}</li>
          <li>6</li>
        </ul>
      </div>
    </div>
    <div class="person-history-songs">
    </div>
  </div>
</template>

<script>
export default {
  name: 'personIndex',
  data () {
    return {
      personMessage: ''
    }
  },
  created () {
    if (this.$storage.get('userDetail') === null) {
      this.getPersonMessage()
    } else {
      this.personMessage = this.$storage.get('userDetail')
    }
  },
  mounted () {
  },
  methods: {
    async getPersonMessage () {
      try {
        var res = await this.$api.getUserDetail(this.$store.state.userId)
        if (res.code === 200) {
          this.$storage.set('userDetail', res)
          this.personMessage = res
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>
.person-background{
  width: 100%;
  height: 250px;
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
  background-attachment: fixed;
  background-image: url("https://tse4-mm.cn.bing.net/th/id/OIP.TsOeWo-37D_iza8VpDwHGgHaEc?w=304&h=182&c=7&o=5&pid=1.7");
}
.person-headImg-box{
  height: 260px;
  width: 100%;
  background-color: transparent;
  margin-top: -75px;
}
.person-headImg{
  width: 150px;
  height: 150px;
  margin: 0 auto;
  position: relative;
  z-index: 99;
}
.el-image{
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
.person-message{
  position: relative;
  width: 400px;
  height: 180px;
  margin: 0 auto;
  background-color: white;
  z-index: 98;
  margin-top: -75px;
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 75px 5px 0;
  box-sizing: border-box;
}
.person-message ul li{
  height: 30px;
  line-height: 30px;
  float: left;
  margin-left: 5px;
  background-color: #5dd5c8;
  padding: 0 20px 0px 5px;
  margin-top: 2px;
}
</style>
