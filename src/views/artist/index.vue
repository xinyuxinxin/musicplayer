<template>
  <div style="width: 1300px;margin: 0 auto">
    <div class="artist-cat-box">
      <ul class="artist-cat clearfix" v-for="(item, index) in cats" :key="index">
        <template v-for="items in item">
          <li @click="selectCat(items.id)" v-if="index === 'types'" :class="{'activecat': items.id === cat}" :key="items.id">{{items.name}}</li>
          <li @click="selectArea(items.id)" v-else-if="index === 'areas'"  :class="{'activecat': items.id === area}" :key="items.id">{{items.name}}</li>
          <li @click="selectInitials(items.id)" v-else-if="index === 'initials'"  :class="{'activecat': items.id === initial}" :key="items.id">{{items.name}}</li>
        </template>
      </ul>
    </div>
    <ul class="artist-list-box">
      <singer :singers="singers"></singer>
      <loading class="loading-box" v-if="loadingData" height="100px"></loading>
    </ul>
  </div>
</template>

<script>
import Singer from '@/components/private/recommend/singer'
import loading from '@/components/common/loading/loading'
export default {
  name: 'index',
  components: { loading, Singer },
  data () {
    return {
      cats: {
        types: [{
          id: -1,
          name: '全部'
        }, {
          id: 1,
          name: '男歌手'
        }, {
          id: 2,
          name: '女歌手'
        }, {
          id: 3,
          name: '乐队'
        }
        ],
        areas: [
          {
            id: -1,
            name: '全部'
          },
          {
            id: 7,
            name: '华语'
          },
          {
            id: 96,
            name: '欧美'
          },
          {
            id: 8,
            name: '日本'
          },
          {
            id: 16,
            name: '韩国'
          },
          {
            id: '0',
            name: '其他'
          }
        ],
        initials: [
          {
            id: '-1',
            name: '全部'
          },
          {
            id: 'a',
            name: 'A'
          },
          {
            id: 'b',
            name: 'B'
          },
          {
            id: 'c',
            name: 'C'
          },
          {
            id: 'd',
            name: 'D'
          },
          {
            id: 'e',
            name: 'E'
          },
          {
            id: 'f',
            name: 'F'
          },
          {
            id: 'g',
            name: 'G'
          },
          {
            id: 'h',
            name: 'H'
          },
          {
            id: 'i',
            name: 'I'
          },
          {
            id: 'j',
            name: 'J'
          },
          {
            id: 'k',
            name: 'K'
          },
          {
            id: 'l',
            name: 'L'
          },
          {
            id: 'n',
            name: 'N'
          },
          {
            id: 'm',
            name: 'M'
          },
          {
            id: 'o',
            name: 'O'
          },
          {
            id: 'p',
            name: 'P'
          },
          {
            id: 'q',
            name: 'Q'
          },
          {
            id: 'r',
            name: 'R'
          },
          {
            id: 's',
            name: 'S'
          },
          {
            id: 't',
            name: 'T'
          },
          {
            id: 'u',
            name: 'U'
          },
          {
            id: 'v',
            name: 'V'
          },
          {
            id: 'w',
            name: 'W'
          },
          {
            id: 'x',
            name: 'X'
          },
          {
            id: 'y',
            name: 'Y'
          },
          {
            id: 'z',
            name: 'Z'
          },
          {
            id: '0',
            name: '其他'
          }
        ]
      },
      limit: 40,
      area: -1,
      cat: -1,
      initial: '-1',
      offset: 0,
      singers: [],
      loadingData: false
    }
  },
  methods: {
    async getArtist () {
      try {
        const params = {
          area: this.area,
          initial: this.initial,
          limit: this.limit,
          type: this.cat,
          offset: this.offset * this.limit
        }
        const res = await this.$api.getSingerList(params)
        if (res.code === 200) {
          console.log(res)
          const imgArray = res.artists.map((item) => {
            return item.picUrl
          })
          this.loadingData = !await this.$until.preloadImg(imgArray).then(() => {
            if (this.limit === 40 && imgArray.length === 20) {
              res.artists = []
            }
          })
          this.loadingData = false
          console.log(this.loadingData + '2')
          this.singers = this.singers.concat(res.artists)
        }
      } catch (e) {
        console.log(e)
      }
    },
    handleScroll () {
      // 变量scrollTop是滚动条滚动时，距离顶部的距离
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      // 变量windowHeight是可视区的高度
      const windowHeight = document.documentElement.clientHeight || document.body.clientHeight
      // 变量scrollHeight是滚动条的总高度
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
      // 滚动条到底部的条件
      if (this.loadingData === false) {
        if (scrollTop + windowHeight === scrollHeight) {
          this.limit = 20
          this.offset++
          this.loadingData = true
          this.getArtist()
        }
      }
    },
    selectCat (value) {
      this.cat = value
      this.init()
    },
    selectArea (value) {
      this.area = value
      this.init()
    },
    selectInitials (value) {
      this.initial = value
      this.init()
    },
    init () {
      this.loadingData = false
      this.limit = 40
      this.singers = []
      this.offset = 0
      this.getArtist()
    }
  },
  created () {
    this.getArtist()
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll, true)
  }
}
</script>

<style scoped>
.artist-cat li{
  float: left;
  margin: 8px;
  text-align: center;
  font-size: 14px;
  padding: 5px;
  border-radius: 4px;
}
.activecat {
  background-color: #ffff99;
  color: black;
}
.loading-box{
  margin-top: -30px;
}
</style>
