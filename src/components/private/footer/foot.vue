<template>
  <footer class="foot-box" >
    <ul>
      <li><i class="iconfont icon-wangyiyunyinle"> </i>ColudMusic</li>
      <li>coludmusic</li>
    </ul>
  </footer>
</template>

<script>
export default {
  name: 'foot'
}
</script>

<style scoped>
.foot-box{
  width: 100%;
  background-color: black;
  color: white;
  margin: 0 auto;
  position: relative;
  height: 200px;
  padding-top: 30px;
  padding-left: 30px;
  box-sizing: border-box;
}
.iconfont{
  font-size: 25px;
}
ul{
  font-size: 20px;
}
li{
  list-style: none;
  height: 20px;
  line-height: 20px;
  margin-top: 8px;
}
li:first-child{
  border: 3px solid transparent;
  border-left-color: white;
}
li:nth-child(2){
  font-size: 10px;
  color: gray;
}
i{
  color: red;
  margin-left: 5px;
  margin-right: 5px;
}
</style>
