<template>
  <div class="caritem">
      <div class="item-selector">
          <check-button :isChecked="product.checked" @click.native="btnClick"></check-button>
      </div>
      <div class="item-img">
          <img :src="product.image" alt="商品图片">
      </div>
      <div class="item-info">
          <div class="item-title">{{product.title}}</div>
          <div class="item-desc">商品描述： {{product.desc}}</div>
          <div class="info-bottom">
              <div class="item-price pleft">￥{{product.price}}</div>
              <div class="item-count cright">x{{product.count}}</div>
          </div>
      </div>
  </div>
</template>

<script>
import CheckButton from './CheckButton.vue'
export default {
    name: 'CarListItem',
    components: {
        CheckButton
    },
    props: {
        product: {
            type: Object,
            default(){
                return {};
            }
        }
    },
    methods: {
        btnClick(){
            this.$store.commit('changeChecked', this.product);
        }
    }
}
</script>

<style>
  .caritem {
      width: 100%;
      display: flex;
      padding: 5px;
      border-bottom: 1px solid #cccccc;
  }
  .item-selector {
    width: 20px;
    display: flex;
    justify-content: center;/**弹性项目居中紧挨着填充 */
    align-items: center;/**定义flex子项在flex容器的当前行的侧轴（纵轴）方向上的对齐方式 类似y轴居中对齐？ */
  }
  .item-img {
      padding: 5px;
  }
  .item-img img {
      width: 80px;
      height: 100px;
      display: block;
      border-radius: 5px;
  }
  .item-info {
    font-size: 16px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
  }
  .item-title,
  .item-desc {
      white-space: nowrap;/**强制1行文本显示 */
      overflow: hidden;
      text-overflow: ellipsis;/**文字用省略号代替 */
  }
  .item-info .item-desc {
      font-size: 14px;
      color: #666666;
      margin-top: 15px;
  }
  .info-bottom {
    margin-top: 10px;
    position: absolute;
    bottom: 10px;
    left: 5px;
    right: 5px;
  }
  .info-bottom .item-price {
    color: orangered;
  }
  .pleft {
      font-size: 20px;
      float: left;
  }
  .cright {
      margin-top: 5px;
      float: right;
  }
</style>