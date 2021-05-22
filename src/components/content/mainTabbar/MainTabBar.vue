<template>
  <tab-bar>
      <tab-bar-item path="/home"><!--concolor="" txtcolor=""改代码时直接在这里传颜色，不用跑到我们封装的组件里面改，增强封装性-->
        <template v-slot:item-icon>
          <span class="tbitem"></span>
        </template>
        <template v-slot:item-text>
           <div>首页</div>
        </template>
      </tab-bar-item>
      <tab-bar-item path="/category">
        <template v-slot:item-icon>
          <span class="tbitem"></span>
        </template>
        <template v-slot:item-text>
           <div>分类</div>
        </template>
      </tab-bar-item>
      <tab-bar-item path="/car">
        <template v-slot:item-icon>
          <span class="tbitem"></span>
        </template>
        <template v-slot:item-text>
           <div>购物车</div>
        </template>
      </tab-bar-item>
      <tab-bar-item path="/profile">
        <template v-slot:item-icon>
          <span class="tbitem"></span>
        </template>
        <template v-slot:item-text>
           <div>我的</div>
        </template>
      </tab-bar-item>
    </tab-bar>
</template>

<script>
import TabBar from '../../common/tabbar/TabBar.vue';
import TabBarItem from '../../common/tabbar/TabBarItem.vue';
export default {
    name: 'MainTabBar',
    components: {
        TabBar,
        TabBarItem
    }
}
</script>

<style>

</style>