<template>
  <div>
    <div class="loading-box" :style="{height:height,lineHeight:height}">
      <div class="spin">
        <i class="iconsize iconfont iconjiazai"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'loading',
  data () {
    return {}
  },
  props: {
    height: {
      type: String,
      default: '400px'
    }
  }
}
</script>

<style scoped>
@keyframes loadingSpin {
  0% {
    transform: rotate(0deg);
  }
  12.5% {
    transform: rotate(45deg);
  }
  25% {
    transform: rotate(90deg);
  }
  37.5% {
    transform: rotate(135deg);
  }
  50% {
    transform: rotate(180deg);
  }
  62.5% {
    transform: rotate(225deg);
  }
  75% {
    transform: rotate(270deg);
  }
  87.5% {
    transform: rotate(315deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loadingSpin{ /* Safari 和 Chrome */
  0% {
    transform: rotate(0deg);
  }
  12.5% {
    transform: rotate(45deg);
  }
  25% {
    transform: rotate(90deg);
  }
  37.5% {
    transform: rotate(135deg);
  }
  50% {
    transform: rotate(180deg);
  }
  62.5% {
    transform: rotate(225deg);
  }
  75% {
    transform: rotate(270deg);
  }
  87.5% {
    transform: rotate(315deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@-moz-keyframes loadingSpin /* Firefox */
{
  0% {
    transform: rotate(0deg);
  }
  12.5% {
    transform: rotate(45deg);
  }
  25% {
    transform: rotate(90deg);
  }
  37.5% {
    transform: rotate(135deg);
  }
  50% {
    transform: rotate(180deg);
  }
  62.5% {
    transform: rotate(225deg);
  }
  75% {
    transform: rotate(270deg);
  }
  87.5% {
    transform: rotate(315deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@-o-keyframes loadingSpin /* Opera */
{
  0% {
    transform: rotate(0deg);
  }
  12.5% {
    transform: rotate(45deg);
  }
  25% {
    transform: rotate(90deg);
  }
  37.5% {
    transform: rotate(135deg);
  }
  50% {
    transform: rotate(180deg);
  }
  62.5% {
    transform: rotate(225deg);
  }
  75% {
    transform: rotate(270deg);
  }
  87.5% {
    transform: rotate(315deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loading-box{
  width: 100%;
  text-align: center;
}
.iconsize{
  font-size: 40px;
  display: inline-block;
  animation: loadingSpin 1.5s steps(1,start) infinite;
}
</style>
