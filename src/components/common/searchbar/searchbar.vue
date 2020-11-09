<template>
  <div class="search-box" :class="{'border-round': isRound,'search-shadow': isShadow}" :style="{width: searchWidth}">
    <div class="search-input-box" :class="{'border-round': isRound}">
      <input v-model="note" type="text" class="search-input" :style="{height: searchHeight}">
      <div class="search">
        <i class="iconfont icon-icon-10" @click="noteSearch"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'searchbar',
  props: {
    searchHeight: {
      type: String,
      default: '40px'
    },
    isRound: {
      type: Boolean,
      default: false
    },
    searchWidth: {
      type: String,
      default: '100%'
    },
    isShadow: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      note: ''
    }
  },
  mounted () {
  },
  methods: {
    noteSearch () {
      this.$emit('toSearch', this.note)
    }
  },
  computed: {
  },
  components: {
  }
}
</script>

<style scoped>
.search-box{
  width: 20%;
  margin-right: 50px;
}
.search-shadow{
  box-shadow: 0px 0px 20px rgba(0, 0, 0, .3);
}
.search-input-box{
  width: 100%;
  box-sizing: border-box;
  padding-left: 25px;
  border: black 2px solid;
  padding-bottom: 2px;
  padding-top: 2px;
}
.search-input{
  width: 80%;
  font-size: 16px;
  border: none;
  outline: none;
  background-color: transparent;
}
.search{
  display: inline-block;
  text-align: center;
  width: calc(20% - 25px);
  margin-left: 10px;
}
.search-content-box{
  text-align: center;
}

.border-round{
  border-radius: 50px;
}
</style>
