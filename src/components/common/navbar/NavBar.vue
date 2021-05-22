<template>
  <div class="nav_bar">
      <div class="n_left"><slot name="left"></slot></div>
      <div class="n_center"><slot name="center"></slot></div>
      <div class="n_right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style>
.nav_bar {
  display: flex;
  height: 44px;
  line-height: 44px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, .3);
}
.n_left,
.n_right {
  width: 60px;
}
.n_center {
  flex: 1;
  text-align: center;
}
</style>