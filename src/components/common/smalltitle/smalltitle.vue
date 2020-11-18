<template>
<div class="clearfix title-box">
  <div class="titlehead">
    <slot name="head">1</slot>
  </div>
  <div class="titletail">
    <slot name="tail">2</slot>
  </div>
  <span class="bottom-line" :class="{'hiddenline':this.bottomline}"></span>
</div>
</template>

<script>
export default {
  name: 'smalltitle',
  props: {
    bottomline: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.titlehead{
  float: left;
}
.titletail{
  float: right;
}
.title-box{
  height: 30px;
  line-height: 30px;
  position: relative;
  padding: 5px;
  margin-top: 10px;
}
.bottom-line{
  height: 1px;
  background-color: lightgray;
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
}
.hiddenline {
  display: none;
}
</style>
