<template>
  <div id="detail">
      <detail-nav-bar class="detailnav" @titleClick="titleClick" ref="navbar"></detail-nav-bar>
      <scroll class="content2" 
              ref="scroll" 
              @scrollon="contentScroll" 
              :probeType="3">
          <detail-swiper :topImgs="topImages"></detail-swiper>
          <detail-base-info :goods="goods"></detail-base-info>
          <detail-shop-info :shop="shop"></detail-shop-info>
          <detail-good-info :detailData="detailInfo"></detail-good-info>
          <detail-param-info :paramsInfo="param" ref="inparam"></detail-param-info>
          <detail-comment-info :commentInfo="comment" ref="comments"></detail-comment-info>
          <good-list :goods="recommend" ref="recommend"></good-list>
      </scroll>
      <detail-bottom-bar @addCar="addCar"></detail-bottom-bar>
      <back-top @click.native="backclick" v-show="isShow"></back-top>
  </div>
</template>

<script>
import DetailNavBar from './childComponent/DetailNavBar.vue';
import DetailSwiper from './childComponent/DetailSwiper.vue';
import DetailBaseInfo from './childComponent/DetailBaseInfo.vue';
import DetailShopInfo from './childComponent/DetailShopInfo.vue';
import DetailGoodInfo from './childComponent/DetailGoodInfo.vue';
import DetailParamInfo from './childComponent/DetailParamInfo.vue';
import DetailCommentInfo from './childComponent/DetailCommentInfo.vue';
import DetailBottomBar from './childComponent/DetailBottomBar.vue';

import scroll from '../../components/common/scroll/Scroll.vue';

import GoodList from '../../components/content/goods/GoodList.vue';

import {getDetailData, getRecommend, GoodInfo, ShopInfo, GoodsParams} from '../../network/detail.js';

import {debounce} from '../../common/utils.js';
import {itemListListener, backTopMixin} from '../../common/mixin.js';//注意混入了！
import {BACKTOP_DISTANCE} from '../../common/const.js';

import {mapActions} from 'vuex';

export default {
    name: 'Detail',
    components: {
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodInfo,
        DetailParamInfo,
        DetailCommentInfo,
        DetailBottomBar,
        scroll,
        GoodList
    },
    mixins: [itemListListener, backTopMixin],
    data(){
        return {
            iid: null,
            topImages: [],
            results: null,
            goods: {},
            shop: {},
            detailInfo: {},
            param: {},
            comment: {},
            recommend: [],
            deShowImgLoad: null,
            titleTopY: [],
            getTitleTopY: null,
            curIndex: 0,
        }
    },
    created(){
        this.iid = this.$route.params.id;//因为路由那里携带的是id ：id
        getDetailData(this.iid).then(res => {
            const data = res.data.result;
            this.topImages = data.itemInfo.topImages;
            this.results = res;

            this.goods = new GoodInfo(data.itemInfo, data.columns, data.shopInfo.services, data.skuInfo);
            this.shop = new ShopInfo(data.shopInfo);
            
            this.detailInfo = data.detailInfo;

            this.param = new GoodsParams(data.itemParams.info, data.itemParams.rule);

            if(data.rate.cRate !=0)
            {
                this.comment = data.rate.list[0];
            } 
        });

        getRecommend().then(res => {
            this.recommend = res.data.data.list;
        });
    },
    mounted(){
        this.getTitleTopY = debounce(() => {
                this.$nextTick(() => {//根据最新的数据，对应的DOM已被渲染出来，但是图片还是没加载完
                this.titleTopY = [];
                this.titleTopY.push(0);
                this.titleTopY.push(this.$refs.inparam.$el.offsetTop);
                this.titleTopY.push(this.$refs.comments.$el.offsetTop);
                this.titleTopY.push(this.$refs.recommend.$el.offsetTop);
                this.titleTopY.push(Number.MAX_VALUE);
            })
            }, 500)
        //debounce是防抖函数，在common的utils那里，$bus是事件总线，可以结合De泰勒GoodInfo看，和Home、GoodListItem看
        //记住要获取this.$refs.scroll scroll对象，要加在scroll标签ref
        const refresh1 = debounce(this.$refs.scroll.refreshper, 300);
        this.deShowImgLoad = this.$bus.$on('infoimgLoad', () => {
            refresh1();
            this.getTitleTopY();
        })
    },
    destroyed(){
        this.$bus.$off('infoimgLoad', this.deShowImgLoad);
        this.$bus.$off('itemImgLoad', this.itemImgLoad);
    },
    methods: {
        ...mapActions(['addToCar']),//vuex中的actions映射到组件中的methods
        //...mapActions({addCars: addToCar})

        titleClick(index){
            this.$refs.scroll.scrollToself(0, -this.titleTopY[index] + 44, 100);
        },
        contentScroll(position){
            let positionY = -position.y + 44;
            this.isShow = positionY > BACKTOP_DISTANCE;
            let len = this.titleTopY.length;
            for(let i = 0; i < len - 1; i++){
                if(this.curIndex !== i && (positionY >= this.titleTopY[i] && positionY < this.titleTopY[i+1]))
                  {
                       this.curIndex = i;
                       this.$refs.navbar.curIndex = this.curIndex;
                   }
            }
        },
        addCar(){
            //1.获取购物车需要显示的信息
            const product = {};
            product.image = this.topImages[0];
            product.title = this.goods.title;
            product.desc = this.goods.desc;
            product.price = this.goods.highNowPrice;
            product.iid = this.iid;
            //this.$store.dispatch('addToCar', product).then(value => {console.log(value)});
            //dispatch可以返回一个Promise
            this.addToCar(product).then(value => {
                this.$toast.show(value, 2000);
            });
        }
    }
}
</script>

<style>
  #detail {
      position: relative;/*盖住tabbar */
      z-index: 9;
      background-color: #fff;
      height: 100vh;
  }
  .detailnav {
      position: relative;
      z-index: 9;
      background-color: #fff;
  }
  .content2 {
      height: calc(100% - 44px - 49px);
  }
</style>