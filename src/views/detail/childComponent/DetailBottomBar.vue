<template>
  <div class="bottombar">
      <div class="bar-item bar-left">
          <div>
              <span class="icon"></span>
              <span>客服</span>
          </div>
          <div>
              <span class="icon"></span>
              <span>店铺</span>
          </div>
          <div>
              <span class="icon"></span>
              <span>收藏</span>
          </div>
        </div>
        <div class="bar-item bar-right">
            <div class="cart" @click="addCar">加入购物车</div>
            <div class="buy">购买</div>
        </div>
    </div> 
</template>

<script>
export default {
    name: 'DetailBottomBar',
    methods: {
        addCar(){
            this.$emit('addCar');
        }
    }
}
</script>

<style>
  @import '../../../assets/css/base.css';
  .bottombar {
      font-family: 'icomoon';
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      height: 49px;
      background-color: #fff;
      display: flex;
      text-align: center;
  }/**最大的先用flex布局 */
  .bottombar div {
      height: 49px;
  }/**再下一级按1:1分开，然后他们里面还是用flex布局 */
  .bar-item {
    flex: 1;
    display: flex;
  }
  .bar-item > div {
    flex: 1;
  }
  .bar-left .icon {
    display: block;
    width: 20px;
    height: 20px;
    margin: 8px auto 0 auto;
  }
  .bar-right {
    color: #fff;
    line-height: 49px;
  }
  .bar-right .cart {
    background-color: #ffe817;
    color: #333;
  }
  .bar-right .buy {
    background-color: #f69;
  }
</style>