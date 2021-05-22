<template>
  <div class="detailswiper">
      <swiper class="deswiper">
          <swiper-item v-for="(item,index) in topImgs" :key="index">
              <img :src="item" alt="item">
          </swiper-item>
      </swiper>
  </div>
</template>

<script>
import {Swiper,SwiperItem} from '../../../components/common/swiper/index.js';
export default {
    name: 'DetailSwiper',
    props: {
        topImgs: {
            type: Array,
            default(){
                return [];
            }
        }
    },
    components: {
        Swiper,
        SwiperItem
    },
    
}
</script>

<style>
  .deswiper {
      height: 400px;
      overflow: hidden;
  }
</style>