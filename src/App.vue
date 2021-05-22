<template>
  <div id="app">
    <!--不让Detail keep alive 即让它的iid可以变化-->
    <keep-alive exclude="Detail"><!--让我们在页面滑动到某个位置时，切=切换了页面，再切回这个页面，还是保持我们滑动到的位置-->
      <router-view></router-view><!--这个一定要记得！！！！不然不会显示-->
    </keep-alive>
    <main-tar-bar></main-tar-bar>
  </div>
</template>

<script>
import MainTarBar from './components/content/mainTabbar/MainTabBar.vue';
export default {
  name: "App",
  components: {
    MainTarBar
  },
};
</script>

<style>
  @import './assets/css/base.css';
</style>
