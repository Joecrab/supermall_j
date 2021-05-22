<template>
  <grid-view>
      <good-list-item v-for="(item,index) in catedetailitems" :key="index" :goodsItem="item"></good-list-item>
  </grid-view>
</template>

<script>
import GridView from '../../../components/common/gridview/GridView.vue';
import GoodListItem from '../../../components/content/goods/GoodListItem.vue';
export default {
    name: 'TabContentDetail',
    components: {
        GridView,
        GoodListItem
    },
    props: {
        catedetailitems: {
            type: Array,
            default(){
                return []
            }
        }
    }
}
</script>

<style>

</style>