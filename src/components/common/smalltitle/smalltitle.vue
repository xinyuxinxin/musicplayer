<template>
<div class="clearfix">
  <div class="titlehead">
    <slot name="head">1</slot>
  </div>
  <div class="titletail">
    <slot name="tail">2</slot>
  </div>
</div>
</template>

<script>
export default {
  name: 'smalltitle'
}
</script>

<style scoped>
.titlehead{
  float: left;
}
.titletail{
  float: right;
}
</style>
