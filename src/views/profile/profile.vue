<template>
  <div class="profile">
    <nav-bar class="self_nav">
      <template v-slot:center>
        <span>我的档案</span>
      </template>
    </nav-bar>
    <self-login></self-login>
    <div class="self-money">
          <div class="money-item">
              <div>
                  <span class="money-imp">0.00</span>
                  <span>元</span>
              </div>
              <div>
                  <span class="money-des">我的余额</span>
              </div>
          </div>
          <div class="money-item">
              <div>
                  <span class="money-imp">0</span>
                  <span>个</span>
              </div>
              <div>
                  <span class="money-des">我的优惠</span>
              </div>
          </div>
          <div class="money-item">
              <div>
                  <span class="money-imp">0</span>
                  <span>分</span>
              </div>
              <div>
                  <span class="money-des">我的积分</span>
              </div>
          </div>
      </div>
    <self-other-data :info="news"></self-other-data>
    <self-other-data :info="car"></self-other-data>
  </div>
</template>

<script>
import NavBar from '../../components/common/navbar/NavBar.vue';
import SelfLogin from './childConps/SelfLogin.vue';
import SelfOtherData from './childConps/SelfOtherData.vue';
export default {
    name: 'Profile',
    components: {
      NavBar,
      SelfLogin,
      SelfOtherData
    },
    data(){
      return {
        news: [
          {icon: '', txt: '我的消息'},
          {icon: '', txt: '积分商城'},
          {icon: '', txt: '会员卡'}
        ],
        car: [
          {icon: '', txt: '我的购物车'},
          {icon: '', txt: '下载购物APP'}
        ]
      }
    }
}
</script>

<style>
  .self_nav {
    background-color: var(--color-tint);
    color: #ffffff;
  }
  .self-money {
      display: flex;
      padding: 15px 0 10px 0;
      font-size: 16px;
  }
  .money-item {
      text-align: center;
      flex: 1;
      border-right: 1px solid #eeeaea;
  }
  .money-item:last-child {
      border-right: 1px solid white;
  }
  .money-item .money-imp {
      font-size: 24px;
      font-weight: 700;
      color: rgb(250, 102, 49);
  }
  .money-item .money-des {
      margin-top: 5px;
      font-size: 14px;
  }
</style>