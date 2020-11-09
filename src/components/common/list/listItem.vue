<template>
  <div class="list-item clearfix" :style="{'width':listWidth,'height':listHeight,lineHeight:listHeight}">
    <span class="list-order" :class="{'list-order-display':musicOn}" :style="{width: orderSize,height:orderSize,lineHeight:orderSize,backgroundColor:orderNumColor}">
      {{ this.orderNum }}
    </span>
    <span class="list-pic" :class="{'list-order-display':!musicOn}">
      <img src="~@/assets/onmusic.gif">
    </span>
    <a :style="{width:orderTitleWidth}" @click="play">
      {{ orderTitle }}
    </a>
    <audio :src="audiourl">
    </audio>
  </div>
</template>

<script>
export default {
  name: 'listItem',
  props: {
    listWidth: {
      type: String,
      default: '100%'
    },
    listHeight: {
      type: String,
      default: '40px'
    },
    orderSize: {
      type: String,
      default: '20px'
    },
    orderNum: {
      type: Number,
      default: 1
    },
    orderNumColor: {
      type: String,
      default: 'red'
    },
    orderTitleWidth: {
      type: String,
      default: '70%'
    },
    orderTitle: {
      type: String,
      default: '测试'
    },
    audiourl: {
      type: String,
      default: '1111'
    },
    musicOn: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    play () {
      // console.log(1)
      this.$emit('fromChild', this.orderNum)
    }
  }
}
</script>

<style scoped>
.list-item {
  margin-top: 3px;
}
.list-item:hover{
  background-color: black;
  color: white;
  cursor: pointer;
}
.list-order {
  color: white;
  border-radius: 50%;
  float: left;
  text-align: center;
  position: relative;
  top: 50%;
  margin-left: 5px;
  transform: translateY(-50%);
}
.list-order-display{
  display: none;
}
.list-item a {
  float: left;
  margin-left: 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.list-pic{
  margin-left: 15px;
  float: left;
}
</style>
