<template>
  <div class="carbobar">
    <div class="check-con">
      <div>
        <check-button class="check-btn" :isChecked="selectAll" @click.native="allSelect"></check-button>
      </div>
      <span>全选</span>
    </div>
    <div class="boprice">
      合计：￥{{totalPrice}}
    </div>
    <div class="cacul" @click="paying">结算({{proLen}})</div>
  </div>
</template>

<script> 
import CheckButton from './CheckButton.vue';
import {mapGetters} from 'vuex';
export default {
    name: 'CarBottomBar',
    components: {
      CheckButton
    },
    data(){
      return {
        all: false
      }
    },
    computed: {//computed里面的属性在每次有数据更新的时候它也会更新
      ...mapGetters(['carList']),
      totalPrice(){
        return this.carList.filter(item => item.checked)
                   .reduce(((pre, cur) => pre + cur.price * cur.count), 0);
      },
      proLen(){
        return this.carList.filter(item => item.checked).length;
      },
      selectAll(){
        if(this.carList.length === 0) return false;
        else{
          return this.carList.every(item => item.checked);//有一个不为true，就返回false，全部为true才为true
        }
      }
    },
    methods: {
      allSelect(){
        this.$store.commit('changeAll', this.selectAll);
      },
      paying(){
        if(this.proLen === 0){
          this.$toast.show("请选择购买的商品", 2000)
        }
      }
    }
}
</script>

<style>
  .carbobar {
    display: flex;
    position: relative;
    left: 0;
    right: 0;
    height: 40px;
    line-height: 40px;
    background-color: #f3f5f6;
  }
  .check-con {
    display: flex;
    align-items: center;
    width: 60px;
    margin-left: 10px;
  }
  .check-btn {
    width: 18px;
    height: 18px;
    line-height: 18px;
  }
  .boprice {
    margin-left: 20px;
    flex: 1;
    text-align: center;
  }
  .cacul{
    width: 100px;
    text-align: center;
    background-color: orangered;
    color: white;
  }
  .bobtnactive {
    background-color: #ff8198;
    border-color: #ff8198;
  }
</style>