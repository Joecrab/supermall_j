<template>
  <div>
      <car-list-item v-for="(item,index) in carList" 
                     :key="index" 
                     :product="item">
      </car-list-item>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

import CarListItem from './CarListItem.vue';

export default {
    name: 'CarList',
    components: {
        CarListItem
    },
    computed: {
        ...mapGetters(['carList'])
    }
}
</script>

<style>
  ul li {
      list-style: none;
  }
</style>