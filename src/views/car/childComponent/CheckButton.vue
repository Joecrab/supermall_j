<template>
  <div class="icon" :class="{'isactive':isChecked}">
    √
  </div>
</template>

<script>
export default {
  name: 'CheckButton',
  props: {
    isChecked: {//这个是要根据对象模型去改变的，而不是在组件中改，即和商品信息对象一起保存改变
      type: Boolean,
      default: false
    }
  },
}
</script>

<style>
  .icon {
    position: relative;
    margin: 0;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid #cccccc;
    font-weight: 700;
    color: #ffffff;
    cursor: pointer;
  }
  .isactive {
    background-color: #ff8198;
    border-color: #ff8198;
  }
</style>