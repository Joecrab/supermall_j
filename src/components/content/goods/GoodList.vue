<template>
  <div class="goodlist">
      <good-list-item v-for="(item,index) in goods" :key="index" :goodsItem="item"></good-list-item>
  </div>
</template>

<script>
import GoodListItem from './GoodListItem.vue';
export default {
    name: "GoodList",
    components: {
        GoodListItem
    },
    props: {
        goods: {
            type: Array,
            default(){
                return []
            }
        }
    },
}
</script>

<style>
  .goodlist {
      display: flex;
      flex-wrap: wrap;/*包裹，根据goodlistitem的宽度看一行显示多少个*/
      justify-content: space-around;/**均等分 */
  }
</style>