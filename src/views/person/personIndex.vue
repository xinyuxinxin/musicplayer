<template>
  <div style="overflow: hidden">
    <div id="person_bc" class="person-background">
      <canvas class="star-background" id="canv" ></canvas>
      <div class="person-headImg">
        <el-image style="border-radius: 50%" :src="personMessage.profile.avatarUrl"></el-image>
      </div>
      <div class="user-level">
        LV.{{personMessage.level}}
      </div>
      <div class="user-listened">
        {{personMessage.listenSongs}}首
      </div>
      <div class="user-city">
        {{getUserAddress}}
      </div>
      <div class="user-age">
        {{personMessage.createDays}}天
      </div>
      <div class="other-mes">
        <div class="nickname">{{personMessage.profile.nickname}}</div>
        <div class="nickname clearfix">
          <li style="float: left">关注: {{personMessage.profile.follows}}</li>
          <li style="float: right">粉丝: {{personMessage.profile.followeds}}</li>
        </div>
      </div>
    </div>
    <div class="person-songs-box">
      <el-row :gutter="20">
        <el-col :span="14">
          <div class="history-songs">最近播放</div>
          <ul v-if="historySongs !== '' ">
            <musicitem></musicitem>
            <musicitem v-for="(item, index) in historySongs" :key="index" :al="item.song.al" :dt="item.song.dt" :ar="item.song.ar" :song="item.song"></musicitem>
          </ul>
          <div v-else>暂时没有记录</div>
        </el-col>
        <el-col :span="6"><div class="user-song-sheets"></div></el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Musicitem from '@/components/private/musicItem/musicitem'
import { start } from '@/assets/js/star'
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
      return province
    }
  },
  created () {
    if (this.$storage.get('userDetail') === null) {
      this.getPersonMessage()
    } else {
      this.personMessage = this.$storage.get('userDetail')
      console.log(this.personMessage)
    }
    this.getAdress()
    this.getPersonHistory()
  },
  mounted () {
    start('canv', 'person_bc')
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
    // 获取地区编码
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
@keyframes beat {
  0% {
    transform: translateY(-50px);
  }
  70% {
    transform: translateY(30px);
  }
  100% {
    transform: translateY(0px);
  }
}
.person-background{
  width: 100%;
  height: 90vh;
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
  background-attachment: fixed;
  background-color: black;
  position: relative;
}
.person-headImg{
  width: 150px;
  height: 150px;
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  box-shadow: white 0 0 3px 3px;
  transform: translate(-50%,-100%);
  z-index: 12;
}
.person-songs-box{
  width: 100%;
  height: auto;
  margin: 0 auto;
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
.user-level,
.user-city,
.user-listened,
.user-age
{
  text-align: center;
  position: absolute;
  border-radius: 50%;
  font-size: 24px;
  animation: beat 1s linear 1;
  z-index: 12;
  color: white;
}
.user-level{
  width: 170px;
  height: 170px;
  line-height: 170px;
  left: 20%;
  top: 15%;
  background: radial-gradient(circle at 60px 60px, skyblue 10%, #000);
}
.user-listened{
  height: 200px;
  line-height: 200px;
  width: 200px;
  top: 10%;
  right: 15%;
  background: radial-gradient(circle at 70px 70px, darkturquoise 10%, #000);
}
.user-city{
  height: 150px;
  line-height: 150px;
  width: 150px;
  bottom: 17%;
  right: 20%;
  background: radial-gradient(circle at 50px 50px, lime 10%, #000);
}
.user-age{
  height: 130px;
  line-height: 130px;
  width: 130px;
  bottom: 25%;
  left: 20%;
  background: radial-gradient(circle at 40px 40px, #5dd5c8 10%, #000);
}
.other-mes{
  width: 150px;
  height: 50px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top:   10px;
  margin-left: -75px;
}
.star-background{
  position: absolute;
  z-index: 10;
  width: 100vw;
  height: 90vh;
}
.nickname {
  text-align: center;
  height: 25px;
  line-height: 25px;
  color: yellow;
}
</style>
