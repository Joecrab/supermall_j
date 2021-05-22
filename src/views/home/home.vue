<template>
  <div id="home">
      <nav-bar class="home_nav">
        <template v-slot:center>
          <span>购物街</span>
        </template>
      </nav-bar>
      <!--这里多复制一份是要利用他来实现这个组件在页面的停留效果，当用户滑动到某个位置时，他就显示出来，还没滑到就隐藏-->
      <tab-control :titles="['流行','新款','精选']" 
                     @tabclick="tabclick"
                     ref="taboffsetot"
                     class="tabcontrolot"
                     v-show="isTabFixed"></tab-control><!--这个障眼法牛皮！！-->
      <scroll class="content1" 
              ref="scroll" 
              :probe-type="3" 
              @scrollon="scoon" 
              :pull-up-load="true" 
              @pullup="loadMore"><!--如果不加：也可以传，但传的是字符串，加了传的是对应的类型  -->
        <hmoe-swiper :banner="banner" @swiperImgLoad='swiperImgLoad'></hmoe-swiper>
        <home-recommend-view :recommend="recommend"></home-recommend-view>
        <feature></feature>
        <tab-control :titles="['流行','新款','精选']" 
                     @tabclick="tabclick"
                     ref="taboffset"></tab-control>
        <good-list :goods="showGoodData"></good-list>
      </scroll>
      <back-top @click.native="backclick" v-show="isShow"></back-top>
  </div>
</template>

<script>
import NavBar from '../../components/common/navbar/NavBar.vue';
import Scroll from '../../components/common/scroll/Scroll.vue';

import TabControl from '../../components/content/tabControl/TabControl.vue';
import GoodList from '../../components/content/goods/GoodList.vue';

import HmoeSwiper from './childConps/HomeSwiper.vue';
import HomeRecommendView from './childConps/HomeRecommendView.vue';
import Feature from './childConps/Feature.vue';


import {getHomeMutidata, getHomeGoods} from '../../network/home.js';
import {itemListListener, backTopMixin} from '../../common/mixin.js';

export default {
    name: 'Home',
    components: {
      NavBar,
      Scroll,
      TabControl,
      GoodList,
      HmoeSwiper,
      HomeRecommendView,
      Feature,
    },
    mixins: [itemListListener, backTopMixin],
    data(){
      return {
        banner: [],
        recommend: [],
        goods: {
          'pop': {page: 0, list: []},//tabcontrol里流行的数据，page是加载到第几页，list是数据量，会根据page叠加
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        curType: 'pop',
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0,
      }
    },
    created(){          //一般在created里面写主要逻辑，具体操作在方法中进行
      //1.请求多个数据
      this.getMutidataFn();

      //2.请求商品数据
      this.getGoodsFn('pop');
      this.getGoodsFn('new');
      this.getGoodsFn('sell');
      
    },

    mounted(){
    },
    
    //处理Home离开保持滚动位置
    activated(){//进来时
      this.$refs.scroll.scrollToself(0, this.saveY, 100);
      this.$refs.scroll.refreshper();
    },

    deactivated(){//离开时
      //1.保存y值
      this.saveY = this.$refs.scroll.getScrollY();

      //2.取消监听全局事件监听
      this.$bus.$off('itemImgLoad', this.itemImgLoad);
    },

    computed: {
      showGoodData(){
        return this.goods[this.curType].list;
      }
    },

    methods: {

      /**
       * 网络请求相关的方法
       */
      getMutidataFn(){//获取网页数据
        getHomeMutidata().then(results => {
        this.banner = results.data.data.banner.list;
        this.recommend = results.data.data.recommend.list;
        });
      },
      getGoodsFn(type){//获取更多商品数据
        let page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(results => {
        this.goods[type].list.push(...results.data.data.list);
        this.goods[type].page += 1;
        this.$refs.scroll.pullUpFinish();//上拉完成后调用，才能显示下一次上拉
      })
      },

      /**
       * 事件监听相关的方法
       */
      tabclick(index){
        switch(index){
          case 0: this.curType = 'pop';break;
          case 1: this.curType = 'new';break;
          case 2: this.curType = 'sell';break;
          default: break;
        }
        this.$refs.taboffset.curIndex = index;
        this.$refs.taboffsetot.curIndex = index;
        //确保两个tabcontrol指向的type都是对的，就是那些流行、精选
      },
      scoon(position){
        //1.判断backtop是否显示
        this.isShow = -(position.y) > 1000;

        //2.觉得tabcontrol是否吸顶（position：fixed）
        this.isTabFixed = -(position.y) > this.tabOffsetTop;
      },
      loadMore(){
        this.getGoodsFn(this.curType);
      },
       swiperImgLoad(){
        //获取tabcontrol的offsettop
        //所以组件都有$el：用于获取组件中的元素
        //这里获取的值不一定每次都相同，因为轮播图那个图片加载的时间不一定，所以那个offsettop的值也不一定
        this.tabOffsetTop = this.$refs.taboffset.$el.offsetTop;//这个就是用来获取轮播图图片加载了后tabcontrol距离
      },
    }
}
</script>

<style>
#home {
  position: relative;
  /*padding-top: 44px;*/
  height: 100vh;
}

.home_nav {
  /*position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;*/
  background-color: var(--color-tint);
  color: #ffffff;
}
.content1 {
  /*height: 300px;*/
  /*height: calc(100% - 49px);*/
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.tabcontrolot {
  position: absolute;
  left: 0;
  right: 0;
  z-index: 9;
}
</style>