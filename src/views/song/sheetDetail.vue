<template>
  <div class="clearfix">
    <div class="box clearfix" v-if="sheetData">
      <div class="left">
        <div class="head">
          <div class="sheet-img">
            <img :src="playlist.coverImgUrl">
          </div>
          <div class="sheet-detail-box">
            <h1>{{ playlist.name }}</h1>
            <div class="creator">
              <img v-if="playlist" :src="playlist.creator.avatarUrl">
              <img v-else src="https://tse1-mm.cn.bing.net/th?id=OIP.Xd2zstiokv_VCthLHHem7wAAAA&w=128&h=160&c=8&rs=1&qlt=90&pid=3.1&rm=2">
              <p class="creator-name">{{ playlist.creator.nickname }}</p>
              <p class="creator-time">{{ getCreateTime }} 创建</p>
            </div>
            <div class="sheet-tag">
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        right
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sheetDetail',
  data () {
    return {
      sheetData: null,
      playlist: Object,
      privileges: []
    }
  },
  computed: {
    getCreateTime () {
      return this.formatDateTime(this.playlist.createTime)
    }
  },
  created () {
    this.$nextTick(function () {
      this.getSongSheet()
    })
  },
  methods: {
    async getSongSheet () {
      try {
        const timestamp = new Date().valueOf()
        const res = await this.$api.getPlayListDetail(this.$route.query.id, 10, timestamp)
        if (res.code === 200) {
          this.sheetData = res
          this.playlist = res.playlist
          this.privileges = res.privileges
          console.log(res)
        }
      } catch (e) {
        console.log(e)
      }
    },
    formatDateTime (inputTime) {
      var date = new Date(inputTime)
      var y = date.getFullYear()
      var m = date.getMonth() + 1
      m = m < 10 ? ('0' + m) : m
      var d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      var h = date.getHours()
      h = h < 10 ? ('0' + h) : h
      var minute = date.getMinutes()
      var second = date.getSeconds()
      minute = minute < 10 ? ('0' + minute) : minute
      second = second < 10 ? ('0' + second) : second
      return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
    }
  }
}
</script>

<style scoped>
.box {
  width: 70%;
  margin: 0 auto;
}

.left {
  width: 900px;
  height: 300px;
  background-color: red;
  float: left;
  padding: 20px;
}

.right {
  width: 400px;
  height: 300px;
  background-color: black;
  float: right;
}

.sheet-img {
  float: left;
}

.sheet-img img {
  width: 200px;
  border-radius: 10px;
  background-color: white;
  box-shadow: #242424 3px 3px;
}

.sheet-detail-box {
  float: left;
  margin-left: 20px;
}

.sheet-detail-box h1 {
  font-size: 25px;
}

.creator img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-top: 10px;
  float: left;
}

.creator p {
  float: left;
  margin: 10px 10px 10px 15px;
  height: 40px;
  line-height: 40px;
}
</style>
