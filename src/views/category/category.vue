<template>
  <div id="cate">
    <nav-bar class="cate-nav">
      <template v-slot:center>
        <span>商品分类</span>
      </template>
    </nav-bar>
    <tab-meun :categories="categories" @selectMenuItem="selectMenuItem"></tab-meun>
    <tab-control :titles="['流行', '新款', '精选']" 
                 @tabclick="tabclick" 
                 ref="taboffsetto" 
                 class="tabFix" 
                 v-show="isFixed"></tab-control>
    <div class="ctrl-content">
      <scroll id="tab-content" 
              ref="scroll" 
              :probeType="3"
              @scrollon="scllon">
        <tab-content-category :subcategories="showSubcategory"></tab-content-category>
        <tab-control :titles="['流行', '新款', '精选']" @tabclick="tabclick" ref="taboffset"></tab-control>
        <tab-content-detail :catedetailitems="showCategoryDetail"></tab-content-detail>
      </scroll>
      <back-top v-show="isShow" @click.native="backclick"></back-top>
      </div>
  </div>
</template>

<script>
import NavBar from '../../components/common/navbar/NavBar.vue';
import Scroll from '../../components/common/scroll/Scroll.vue';
import BackTop from '../../components/content/backTop/BackTop.vue';
import TabMeun from './childConps/TabMenu.vue';
import TabContentCategory from './childConps/TabContentCategory.vue';
import TabContentDetail from './childConps/TabContentDetail.vue';
import TabControl from '../../components/content/tabControl/TabControl.vue';
import {getCategory, getSubcategory, getCategoryDetail} from '../../network/category.js';
import {itemListListener, backTopMixin} from '../../common/mixin.js';
import { debounce } from '../../common/utils';
//看看混入里的代码把
export default {
    name: 'Category',
    components: {
      NavBar,
      Scroll,
      BackTop,
      TabMeun,
      TabContentCategory,
      TabControl,
      TabContentDetail
    },
    mixins: [itemListListener, backTopMixin],
    data(){
      return {
        categories: [],
        categoryData: {},
        curIndex: -1,
        test: {},
        curType: 'pop',
        saveY: 0,
        tabConLoad: null,
        isFixed: false,
        taboffset: 0,
        isShow: false
      }
    },
    computed: {
      showSubcategory(){
        if(this.curIndex === -1) return {}
        return this.categoryData[this.curIndex].subcategories;
      },
      showCategoryDetail(){
        if(this.curIndex === -1) return []
        return this.categoryData[this.curIndex].categoryDetail[this.curType].list;
      }
    },
    created(){
      this._getCategory();
    },
    mounted(){
      let tabFresher = debounce(this.$refs.scroll.refreshper, 500);
      this.tabConLoad = this.$bus.$on('tabconImgLoad', () => {
        tabFresher();
        this.taboffset = this.$refs.taboffset.$el.offsetTop;
      })
      
    },
    activated(){
      this.$refs.scroll.scrollToself(0, this.saveY, 500);
      this.$refs.scroll.refreshper();
    },
    deactivated(){
      this.saveY = this.$refs.scroll.getScrollY();
      this.$bus.$off('tabconImgLoad', this.tabConLoad);
      this.$bus.$off('itemImgLoad', this.itemImgLoad);
    },
    methods: {
      /**
       * 数据请求相关的方法
       */
      _getCategory(){//获取页面数据后，在把各分类部分的数据都初始化
          getCategory().then(res => {
          //1.获取那个分类栏的分类名
          this.categories = res.data.data.category.list;
          //2.初始化每个类别的子数据
          for(let i = 0; i < this.categories.length; i++){
            this.categoryData[i] = {
              subcategories: {},//这是该分类中的小分类
              categoryDetail: {//这是该分类中显示的商品数据那些吧，到时候tabcontrol里面要显示的数据
                'pop': {page: 0, list: []},
                'new': {page: 0, list: []},
                'sell': {page: 0, list: []}
              }
            }
            /**
             * categoryData里面的结构大概是
             * categoryData = {
             *   1：{
             *        subcategories: {},
             *        categoryDetail: {
             *            'pop': [],
             *            'new': [],
             *            'sell': []
             *         }
             *    }
             *   2: {}
             *     ....
             * }
             */
          }
          //3.请求第一个分类的数据，因为一开始就是第一个
          this._getSubcategories(0);
        });
      },

      _getSubcategories(index){
        this.curIndex = index;
        let maitKey = this.categories[index].maitKey;//mailKey是分类名
        getSubcategory(maitKey).then(res => {//根据分类名去拿到分类里的数据
          this.categoryData[index].subcategories = res.data.data;
          this.categoryData = {...this.categoryData};
          this._getCategoryDetail('pop');
          this._getCategoryDetail('new');
          this._getCategoryDetail('sell');
        })
      },

      _getCategoryDetail(type){
        // 1.获取请求的miniWallkey
        let miniWallkey = this.categories[this.curIndex].miniWallkey;
        // 2.发送请求,传入miniWallkey和type
        getCategoryDetail(miniWallkey, type).then(res => {
          // 3.将获取的数据保存下来
          this.categoryData[this.curIndex].categoryDetail[type].list = res.data;
          this.categoryData = {...this.categoryData};
        })
      },

      /**
       * 事件响应相关的方法
       */
      selectMenuItem(index){//这是响应选择tabmenu中的分类是传回来的事件和index
        this._getSubcategories(index);//选择了这个分类后就要请求数据了
      },
      tabclick(index){
        switch(index){
          case 0: this.curType = 'pop';break;
          case 1: this.curType = 'new';break;
          case 2: this.curType = 'sell';break;
        }
        this.$refs.taboffset.curIndex = index;
        this.$refs.taboffsetto.curIndex = index;
      },
      scllon(position){
        this.isFixed = -(position.y) > this.taboffset;
        this.isShow = -(position.y) > 1000;
      }
    }
}
</script>

<style>
  #cate {
    height: 100vh;
  }
  .cate-nav {
    position: relative;
    top: 0;
    z-index: 99;
    color: white;
    background-color: var(--color-tint);
  }
  .ctrl-content {
    position: absolute;
    left: 100px;
    top: 44px;
    bottom: 49px;
    display: flex;
  }
  #tab-content {
    overflow: hidden;
    flex: 1;
  }
  .tabFix {
    position: absolute;
    top: 44px;
    left: 105px;
    right: 0;
    z-index: 99;
  }
</style>