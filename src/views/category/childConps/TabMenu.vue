<template>
  <div class="menus">
      <scroll class="memus-content">
          <div v-for="(item,index) in categories" :key="index" 
           @click="itemSelect(index)" 
           :class="{menu_active: curIndex === index}"
           class="menus-item">
          {{item.title}}
        </div>
      </scroll>
  </div>
</template>

<script>
import Scroll from '../../../components/common/scroll/Scroll.vue';
export default {
    name: 'TabMenu',
    components: {
        Scroll
    },
    props: {
        categories: {
            type: Array,
            default(){
                return [];
            }
        }
    },
    data(){
        return {
            curIndex: 0
        }
    },
    methods: {
        itemSelect(index){
            this.curIndex = index;
            this.$emit('selectMenuItem', index);
        }
    }
}
</script>

<style>
  .menus {
    position: absolute;
    top: 44px;
    background-color: #f6f6f6;
    width: 100px;
    box-sizing: border-box;
  }
  .memus-content {
      height: calc(100vh - 44px - 49px);
      overflow: hidden;
  }
  .menus-item {
      height: 45px;
      line-height: 45px;
      text-align: center;
      font-size: 16px;
  }
  .menu_active {
      border-left: 4px solid var(--color-high-text);
      font-weight: 700;
      color: var(--color-high-text);
      background-color: #fff;
  }
</style>