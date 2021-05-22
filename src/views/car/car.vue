<template>
  <div class="car">
    <nav-bar class="carnav">
      <template v-slot:center>
        <span>购物车 ({{carLength}})</span>
      </template>
    </nav-bar>
    <scroll class="carcontent" ref="scroll">
      <car-list></car-list>
    </scroll>
    <car-bottom-bar></car-bottom-bar>
  </div>
</template>

<script>
import NavBar from '../../components/common/navbar/NavBar.vue';
import Scroll from '../../components/common/scroll/Scroll.vue';

import CarList from './childComponent/CarList.vue';
import CarBottomBar from './childComponent/CarBottomBar.vue';

import {mapGetters} from 'vuex';
export default {
    name: 'Car',
    components: {
      NavBar,
      Scroll,
      CarList,
      CarBottomBar
    },
    computed: {
      /*...mapGetters({
        len: 'carLength'
      })*/
      ...mapGetters([
        'carLength'
      ])
    },
    activated(){//有新数据要进行刷新，不然它还是安装最开始的高度，滚不了
      this.$refs.scroll.refreshper();
    }
}
</script>

<style>
  .carnav {
    background-color: var(--color-tint);
    color: white;
  }
  .car {
    height: 100vh;
  }
  .carcontent {
    height: calc(100% - 44px - 49px - 40px);
    overflow: hidden;
  }
</style>