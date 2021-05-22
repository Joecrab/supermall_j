<template>
  <swiper>
        <swiper-item v-for="(item, index) in banner" :key="index">
          <a :href="item.link">
            <img :src="item.image" alt="" @load="imgLoad">
          </a>
        </swiper-item>
      </swiper>
</template>

<script>
import {Swiper,SwiperItem} from '../../../components/common/swiper/index.js';
export default {
    name: "HmoeSwiper",
    components: {
        Swiper,
        SwiperItem
    },
    data(){
      return {
        isLoad: false
      }
    },
    props: {
        banner: {
            type: Array,
            default(){
                return []
            }
        }
    },
    methods: {
      imgLoad(){
        if(!this.isLoad)
        {
          this.$emit('swiperImgLoad');//只用发送一次事件就可以了，不用发送4次,只用获得一次高度就好，不需要用防抖
          this.isLoad = true;
        }//好像说这个是节流阀
      }
    }
}
</script>

<style>
</style>