<template>
  <div v-if="Object.keys(goods).length !==0" class="baseinfo"><!--object.keys(obj)是判断是否为空对象，key就是属性，若没属性为空，就不渲染了-->
      <div class="infotitle">{{goods.title}}</div>
      <div class="infoprice">
          <span class="newprice">￥{{goods.highNowPrice}}</span>
          <span class="oldprice">￥{{goods.highPrice}}</span>
          <span v-if="goods.discountDesc" class="discount" :style="{backgroundColor:goods.discountBgColor}">{{goods.discountDesc}}</span>
      </div>
      <div class="infother">
          <span>{{goods.columns[0]}}</span>
          <span>{{goods.columns[1]}}</span>
          <span>{{goods.services[0].name}}</span>
      </div>
      <div class="servepart">
         <span class="serve-part-item" v-for="(item,index) in goods.services.length-1" :key="index">
             <img :src="goods.services[index+1].icon" alt="">
             <span>{{goods.services[index+1].name}}</span>
         </span>
      </div>
  </div>
</template>

<script>
export default {
    name: 'DetailBaseInfo',
    props: {
        goods: {
            type: Object,
            default(){
                return {}
            }
        }
    }
}
</script>

<style>
  .baseinfo {
      margin-top: 15px;
      padding: 0 8px;
      color: #999999;
      border-bottom: 5px solid #f2f5f8;
  }
  .infotitle {
      font-size: 16px;
      color: #000000;
  }
  .infoprice {
      margin-top: 10px;
  }
  .infoprice .newprice{
      font-size: 22px;
      color: var(--color-high-text);
  }
  .infoprice .oldprice{
      font-size: 14px;
      margin: 0 5px;
      text-decoration: line-through;
  }
  .infoprice .discount {
      padding: 1px 8px;
      border-radius: 8px;
      font-size: 14px;
      color: #ffffff;
      position: relative;
      top: -5px;
  }
  .infother {
      margin-top: 15px;
      line-height: 30px;
      display: flex;
      font-size: 13px;
      border-bottom: 1px solid rgba(100,100,100,.1);
      justify-content: space-between;
  }
  .servepart {
      display: flex;
      justify-content: space-between;
      line-height: 60px;
  }
  .serve-part-item {
      font-size: 14px;
      color: black;
  }
  .serve-part-item img {
      width: 14px;
      height: 14px;
      position: relative;
      top: 2px;
  }
</style>