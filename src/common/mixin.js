import {debounce} from './utils.js';
import BackTop from '../components/content/backTop/BackTop.vue';

export const itemListListener = {
    data(){
        return {
            itemImgLoad: null
        }
    },
    mounted(){
        //1.监听item中img的加载完成

      /**
       * refresh函数第一次去到debounce里面先等待500ms才能执行refresh，但是很快又有第二张图片申请refresh，清空上一个timer
       * 再等500ms，一直这样，等到第31次的时候已经没有图片请求加载刷新，再等500ms后就可以一次过refresh了
       */
      //这个算优化了
      const refresh = debounce(this.$refs.scroll.refreshper, 500)
      this.itemImgLoad = this.$bus.$on('itemImgLoad', () => {
        refresh();
        //refresh 其实是debounce return回来的那个function
      });
    },
}

export const backTopMixin = {
  data(){
    return {
      isShow: false,
    }
  },
  components: {
    BackTop
  },
  methods: {
    backclick(){
        //this.$refs.scroll.scroll.scrollTo(0,0,500);
        //this.$refs.scroll先拿到了home里面的scroll组件对象
        //.scroll是scroll里面data的scroll对象
        //scrollTo(x,y,time)这是betterscroll里面的方法，滚动哪个地方,time是在多少时间内回到xy  ms
        this.$refs.scroll.scrollToself(0,0,500);
    }
  }
}
