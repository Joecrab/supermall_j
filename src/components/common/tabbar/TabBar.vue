<template>
  <div id="tab-bar">
      <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'TabBar'
}
</script>

<style>
    #tab-bar {
    display: flex;/*flex布局 */
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 49px;/*tarbar高度一般为49px */
    background-color: #f6f6f6;
    box-shadow: 0 -1px 1px rgba(0, 0, 0, .3);/*x偏移量 y偏远量 */
  }
</style>