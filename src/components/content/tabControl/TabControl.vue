<template>
  <div class="tabcontrol">
      <div v-for="(item, index) in titles" :key="index" 
      class="tab_txt" 
      :class="{active: index === curIndex}" 
      @click="changeCol(index)">
          <span>{{item}}</span>
      </div>
  </div>
</template>

<script>
/**
 * tabcontrol的吸顶效果，当scroll滚动到多少时，他就定在一个地方
 * 利用offsettop，但是直接在mouted中获取，值是不正确的
 * 要获取正确的值则要监听homeswiper的img的加载完成
 * 补充：
 * 为了不让homeswiper多次发出事件
 * 可使用isLoad的变量进行状态的记录
 */

export default {
    name: "TabControl",
    props: {
        titles: {
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
        changeCol(index){
            this.curIndex = index;
            this.$emit('tabclick', index);
        }
    }
}
</script>

<style>
  .tabcontrol {
      display: flex;
      text-align: center;
      font-size: 16px;
      height: 40px;
      line-height: 40px;
      background-color: #fff;
  }
  .tabcontrol .tab_txt {
      flex: 1;
  }
 .tabcontrol .tab_txt span {
     padding: 7px;
 }
  .active {
      color: var(--color-high-text);
  }
  .active span {
      border-bottom: 2px solid var(--color-high-text);
  }
</style>