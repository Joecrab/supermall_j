<template>
  <div class="wipper" ref="wipper">
      <div class="content">
      <slot></slot>
      </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import ObserveDOM from '@better-scroll/observe-dom';
BScroll.use(ObserveDOM);
export default {
    name: 'Scroll',
    props: {
        probeType: {//与监听滚动有关
            type: Number,
            default: 0
        },
        pullUpLoad: {
            type: Boolean,
            default: false
        }
    },
    data(){
        return {
            scroll: null
        }
    },
    methods: {
        scrollToself(x, y, time=300){//给time默认值
            this.scroll && this.scroll.scrollTo(x, y, time);//这个是betterscroll本身的方法
        },
        pullUpFinish(){
            this.scroll && this.scroll.finishPullUp();
        },
        refreshper(){
            this.scroll && this.scroll.refresh();
        },
        getScrollY(){
            return this.scroll ? this.scroll.y : 0;
        }
    },
    mounted(){
        //在vue里面准确地拿到某一个元素，绑定一个ref,一般绑定给子组件，div上也可绑定
        //1.new BScroll对象
        this.scroll = new BScroll(this.$refs.wipper, {
            probeType: this.probeType,//实时监听需要变3  probeType 0/1/2(手指滚动) 3(只要是滚动)
            mouseWheel: true,
            observeDOM: true,
            click: true,//button可以监听点击，但其他元素不可以，如div那些，所以要click: true
            pullUpLoad: this.pullUpLoad,
            observeImage: true
        });
        //2.进行实时监听  监听滚动位置
        if(this.probeType ===2 || this.probeType ===3){
            this.scroll.on('scroll', (position) => {//前面的那个scroll是原生事件(滚动)！
            this.$emit('scrollon',position);
          });
        }
        
        //3.监听上拉事件  监听scroll滚动到底部
        if(this.pullUpLoad){
            this.scroll.on('pullingUp', () => {//前面的那个scroll是原生事件(上拉)！ on是监听
            this.$emit('pullup');
          });
        }
    }
}
</script>

<style>

</style>