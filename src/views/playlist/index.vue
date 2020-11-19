<template>
  <div style="margin: 0 auto;width: 90%;min-width:1300px;padding: 20px">
    <div class="sort-box clearfix">
      <div class="sort-left">
        <el-button type="primary" size="mini" class="el-icon-arrow-up" v-if="!isHidden" @click="showCat"></el-button>
        <el-button type="primary" size="mini" class="el-icon-arrow-down" v-else @click="showCat"></el-button>
        <div class="sort-cat clearfix" v-if="isHidden">
          <ul class="clearfix" v-for="(item, index) in categories" :key="index">
            <div class="sort-cat-left">{{item}}：</div>
            <div class="sort-cat-right clearfix">
              <template v-for="item2 in sub" >
                <li @click="toTag(item2.name)" :key="item2.name" v-if="item2.category == index">{{item2.name}}</li>
              </template>
            </div>
          </ul>
        </div>
      </div>
      <div class="sort-right">
        <ul>
          <li>热门标签：</li>
          <li @click="toTag(item.name)" v-for="item in hotTag" :key="item.id">{{item.name}}</li>
        </ul>
      </div>
    </div>
    <div class="playlist-box">
      <musicsheet :sheet="playlists"></musicsheet>
    </div>
    <div class="playlist-pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        @prev-click="preplaylist"
        @next-click="nextplaylist"
        @current-change="currentplaylist"
        :page-size="limit"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import Musicsheet from '@/components/private/musicsheet/musicsheet'
export default {
  name: 'index',
  components: { Musicsheet },
  data () {
    return {
      isHidden: false,
      hotTag: [],
      categories: [],
      sub: [],
      all: {},
      limit: 48,
      offset: 0,
      tag: '全部',
      playlists: [],
      total: 0
    }
  },
  methods: {
    async getCat () {
      try {
        const res = await this.$api.getCatList()
        const hotres = await this.$api.getHotlist()
        if (res.code === 200) {
          this.categories = res.categories
          this.all = res.all
          this.sub = res.sub
        }
        if (hotres.code === 200) {
          this.hotTag = hotres.tags
        }
      } catch (e) {
        console.log(e)
      }
    },
    async getPlayList () {
      try {
        const params = {
          limit: this.limit,
          offset: this.offset * this.limit,
          cat: this.tag
        }
        const res = await this.$api.getPlayList(params)
        if (res.code === 200) {
          this.playlists = res.playlists
          this.total = res.total
          console.log(this.playlists)
        }
      } catch (e) {
        console.log(e)
      }
    },
    showCat () {
      this.isHidden = !this.isHidden
    },
    preplaylist () {
      this.offset--
      this.getPlayList()
    },
    nextplaylist () {
      this.offset++
      this.getPlayList()
    },
    currentplaylist (index) {
      this.offset = index - 1
      this.getPlayList()
    },
    toTag (text) {
      this.tag = text
      this.getPlayList()
      this.isHidden = false
    }
  },
  created () {
    this.getCat()
    this.getPlayList()
  }
}
</script>

<style scoped>
.sort-box{
  width: 100%;
}
.sort-left{
  float: left;
  position: relative;
}
.sort-right{
  float: left;
}
.sort-right ul li{
  float: left;
  height: 30px;
  line-height: 30px;
  margin-left: 10px;
  padding: 0 5px;
  cursor: pointer;
}
.sort-cat{
  width: 500px;
  height: 300px;
  position: absolute;
  background-color: white;
  box-shadow: 0 2px 2px lightgray,2px 0 2px lightgray,0 -2px 2px lightgray,-2px 0 2px lightgray;
  padding: 10px;
  z-index: 999;
  margin-top: 12px;
}
.sort-cat:before,
.sort-cat:after{
  content: '';
  display: block;
  border: transparent solid 12px;
  position: absolute;
  top: -22px;
  left: 15px;
  z-index: 1000;
  border-bottom-color: white;
}
.sort-cat:after{
  top: -24px;
  z-index: 98;
  border-bottom-color: lightgray;
}
.sort-cat ul{
  margin-top: 10px;
}
.sort-cat-left{
  width: 50px;
  float: left;
  font-size: 14px;
  padding: 3px;
  text-align: center;
}
.sort-cat-right{
  width: 440px;
  float: left;
}
.sort-cat-right li{
  float: left;
  margin-left: 10px;
  font-size: 14px;
  padding: 3px 3px;
  cursor: pointer;
}
.playlist-pagination{
  margin: 10px auto;
  width: 80%;
  text-align: center;
}

</style>
