<template>
  <div class="goodsitem" @click="itemclick">
      <img v-lazy="showImg" alt="" @load="imgLoad"><!--:src="showImg"这个是没有懒加载的 v-lazy="showImg"用到了那个vuelazyload，让图片懒加载-->
      <div class="goodsinfo">
          <p>{{goodsItem.title}}</p>
          <span class="price">￥{{goodsItem.price}}</span>
          <span class="collect">  {{goodsItem.cfav}}</span>
      </div>
  </div>
</template>

<script>
export default {
    name: "GoodListItem",
    props: {
        goodsItem: {
            type: Object,
            default(){
                return {}
            }
        }
    }, 
    computed: {
        showImg(){
            return this.goodsItem.img || this.goodsItem.image || this.goodsItem.show.img
        }
    },
    methods: {
        imgLoad(){
            this.$bus.$emit('itemImgLoad');//发射事件给事件总线
        },
        itemclick(){
            if(this.$route.path.indexOf('detail') === -1)//当前路径不是在detail才跳转到detail
            {
                this.$router.push('/detail/' + this.goodsItem.iid);
            }
        }
    }
}
</script>

<style>
  .goodsitem {
      position: relative;
      padding-bottom: 40px;
      width: 47%;
      text-align: center;
      margin-bottom: 5px;

  }
  .goodsitem img {
      width: 100%;
      border-radius: 5px;
  }
  .goodsinfo {
      position: absolute;
      bottom: 5px;
      left: 0;
      right: 0;
      font-size: 12px;
  }
  .goodsitem p {
      box-sizing: border-box;
      padding-left: 3px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
  }
  .price {
      color: var(--color-high-text);
  }
  .collect {
      font-family: 'icomoon';
  }
</style>