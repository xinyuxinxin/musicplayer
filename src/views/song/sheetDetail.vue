<template>
  <div class="clearfix">
    <div class="box clearfix" v-if="sheetData">
      <div class="left">
        <div class="head clearfix">
          <div class="sheet-img">
            <img :src="playlist.coverImgUrl">
          </div>
          <div class="sheet-detail-box">
            <h1>{{ playlist.name }}</h1>
            <div class="creator clearfix">
              <img v-if="playlist" :src="playlist.creator.avatarUrl">
              <img v-else src="https://tse1-mm.cn.bing.net/th?id=OIP.Xd2zstiokv_VCthLHHem7wAAAA&w=128&h=160&c=8&rs=1&qlt=90&pid=3.1&rm=2">
              <p class="creator-name">{{ playlist.creator.nickname }}</p>
              <p class="creator-time">{{ getCreateTime }} 创建</p>
            </div>
            <div class="sheet-tag clearfix">
              <li>标签：</li>
              <li v-for="(item, index) in playlist.tags" :key="index">{{item}}</li>
            </div>
            <div class="sheet-description">
              <p>{{playlist.description}}</p>
            </div>
          </div>
        </div>
        <div class="center" v-if="songs.length !== 0">
          <musicitem></musicitem>
          <musicitem :song="item" :ar="item.ar" :al="item.al" :dt="item.dt" v-for="item in songs" :key="item.id"></musicitem>
        </div>
        <div v-else>
          加载中
        </div>
      </div>
      <div class="right">
        <div class="like-songlist clearfix">
          <div style="padding: 8px" class="clearfix">
            <el-image class="likeUser" v-for="item in likeUser" :key="item.id" :src="item.avatarUrl"></el-image>
          </div>
          <div class="like-songlist-title clearfix">
            <a href="#" style="float: left;font-size: 14px">
              查看更多
            </a>
            <p style="float: right;font-size: 14px">
              喜欢这个歌单的人
            </p>
          </div>
          <div class="playlist-comment-box">
            <div class="comment-title">
              <h3>精彩评论</h3>
            </div>
            <div>
              <div class="comment-box">
                <div class="comment-user">
                  <el-image></el-image>
                </div>
                <div class="comment-content">3131</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Musicitem from '@/components/private/musicItem/musicitem'
export default {
  name: 'sheetDetail',
  components: { Musicitem },
  data () {
    return {
      sheetData: null,
      playlist: Object,
      privileges: [],
      songs: [],
      offset: 0,
      comments: [],
      hotComments: [],
      likeUser: []
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
    this.getSongLike()
    this.getSongComments()
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
          var ids = res.privileges.map((currentValue) => {
            return currentValue.id
          })
          const detail = await this.$api.getSongDetail(ids.toString(), timestamp)
          this.songs = detail.songs
        }
      } catch (e) {
        console.log(e)
      }
    },
    async getSongComments () {
      try {
        const pagrm = {
          limit: 10,
          offset: this.offset,
          id: this.$route.query.id
        }
        const res = await this.$api.getCommentPlaylist(pagrm)
        if (res.code === 200) {
          this.comments = res.comments
          this.hotComments = res.hotComments
        }
        console.log(res)
      } catch (e) {
        console.log(e)
      }
    },
    async getSongLike () {
      try {
        const pagrm = {
          limit: 24,
          offset: 0,
          id: this.$route.query.id
        }
        const res = await this.$api.getSubscribersPlaylist(pagrm)
        if (res.code === 200) {
          this.likeUser = res.subscribers
        }
        console.log(res)
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
  width: 70%;
  height: auto;
  background-color: #ffffff;
  float: left;
  padding: 20px;
  box-sizing: border-box;
  box-shadow: 0 5px 40px -1px rgba(2,10,18,.1);
}

.right {
  width: 384px;
  height: auto;
  background-color: green;
  float: left;
  margin-left: 1%;
  box-sizing: border-box;
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
  width: calc(100%-220px);
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
.sheet-tag li {
  float: left;
  margin-left: 10px;
  background-color: skyblue;
  height: 25px;
  text-align: center;
  line-height: 25px;
  border-radius: 5px;
  padding: 0 5px;
}

.sheet-tag li:first-child{
  margin-left: 0;
  background: none;
}
.sheet-description {
  min-width: 400px;
  max-width: 600px;
  margin-top: 10px;
  white-space: pre-wrap;
}
.sheet-description p{
  text-overflow: ellipsis;
}
.center{
  margin-top: 10px;
}
.center .item-box:nth-child(2n){
  background-color: #f7f7f7;
}

.like-songlist{
  width: 100%;
  height: 200px;
  background-color: #5dd5c8;
}
.likeUser{
  width: 40px;
  height: 40px;
  float: left;
  margin: 3px;
}
.like-songlist-title{
  position: relative;
  padding: 10px;
}
.like-songlist-title:before{
  content: '';
  display: block;
  height: 2px;
  width: 90%;
  background-color: white;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}
.playlist-comment-box{
  margin-top: 30px;
  width: 100%;
  padding: 10px;
  height: auto;
  min-height: 60px;
  background-color: #5dd5c8;
}
.comment-title{
  position: relative;
  width: 70px;
  height: 30px;
  text-align: center;
}
.comment-title:after{
  content: '';
  position: absolute;
  height: 2px;
  width: 50px;
  background-color: white;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}
.comment-box{
  width: 100%;
  height: auto;
}
.comment-user{
  width: 100%;
  height: 40px;
  position: relative;
  line-height: 40px;
}
</style>
