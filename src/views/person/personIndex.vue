<template>
  <div>
    <div class="person-background">
    </div>
    <div class="person-headImg-box">
      <div class="person-headImg">
        <el-image :src="personMessage.profile.avatarUrl"></el-image>
      </div>
      <div class="person-message clearfix">
        <ul>
          <li>用户名称：{{personMessage.profile.nickname}}</li>
          <li>用户ID: {{personMessage.profile.userId}}</li>
          <li>会员等级：LV.{{personMessage.level}}</li>
          <li>用户经历： {{personMessage.createDays}}天</li>
          <li>听过歌曲： {{personMessage.listenSongs}}</li>
          <li>用户城市： {{getUserAddress}}</li>
        </ul>
      </div>
    </div>
    <div class="person-songs-box">
      <el-row :gutter="20">
        <el-col :span="4"><div class="other"></div></el-col>
        <el-col :span="16">
          <div class="history-songs">播放历史</div>
          <ul v-if="historySongs !== '' ">
            <musicitem v-for="(item, index) in historySongs" :key="index" :al="item.song.al" :dt="item.song.dt" :ar="item.song.ar" :song="item.song"></musicitem>
          </ul>
          <div v-else>暂时没有记录</div>
        </el-col>
        <el-col :span="4"><div class="user-song-sheets"></div></el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Musicitem from '@/components/private/musicItem/musicitem'
export default {
  name: 'personIndex',
  components: { Musicitem },
  data () {
    return {
      personMessage: '',
      city: {},
      province: [],
      historySongs: ''
    }
  },
  computed: {
    getUserAddress () {
      var province
      for (let i = 0; i < this.province.length; i++) {
        if (this.personMessage.profile.province.toString() === this.province[i].code) {
          province = this.province[i].name
          break
        }
      }
      console.log(province)
      return province
    }
  },
  created () {
    if (this.$storage.get('userDetail') === null) {
      this.getPersonMessage()
    } else {
      this.personMessage = this.$storage.get('userDetail')
    }
    this.getAdress()
    this.getPersonHistory()
  },
  mounted () {
  },
  methods: {
    async getPersonMessage () {
      try {
        const res = await this.$api.getUserDetail(this.$store.state.userId)
        if (res.code === 200) {
          this.$storage.set('userDetail', res)
          this.personMessage = res
        }
      } catch (e) {
        console.log(e)
      }
    },
    async getAdress () {
      try {
        await axios.get('/data/cityCode/city.json').then(res => {
          this.city = res.data
        })
        await axios.get('/data/cityCode/province.json').then(res => {
          this.province = res.data
        })
      } catch (e) {
        console.log(e)
      }
    },
    async getPersonHistory () {
      try {
        var res = await this.$api.getUserRecord(this.$store.state.userId, 0)
        if (res.code === 200) {
          console.log(res)
          this.historySongs = res.allData
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
  margin: -75px auto 0;
  background-color: white;
  z-index: 98;
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 75px 0px 0;
  box-sizing: border-box;
}
.person-message ul li{
  height: 30px;
  line-height: 30px;
  float: left;
  margin-left: 15px;
  background-color: #5dd5c8;
  padding: 0 0 0 10px;
  margin-top: 2px;
}
.person-message ul li:nth-child(2n + 1){
  float: right;
  text-align: right;
  padding: 0 10px 0 0;
}
.person-message ul li:nth-child(2n + 1):before{
  content: '';
  display: block;
  border: 15px solid transparent;
  float: left;
  border-left-color: white;
}
.person-message ul li:nth-child(2n):after{
  content: '';
  display: block;
  border: 15px solid transparent;
  float: right;
  border-right-color: white;
}
.person-songs-box{
  width: 100%;
  height: auto;
}

.other,
.user-song-sheets,
.history-songs{
  line-height: 36px;
  height: 36px;
  padding-left: 20px;
  box-sizing: border-box;
  position: relative;
}
.other{
  background-color: red;
}
.user-song-sheets{
  background-color: #67CF22;
}
.history-songs{
  background-color: #5dd5c8;
}
.history-songs:before{
  content: '';
  height: 30px;
  width: 3px;
  margin-top: 3px;
  background-color: red;
  display: block;
  position: absolute;
  left: 14px;
}
</style>
