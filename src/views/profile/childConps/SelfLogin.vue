<template>
  <div class="self-log">
      <div class="self-left">
          <img src="../../../assets/img/profile/login1.png" alt="" class="headimg">
      </div>
      <div class="self-cen">
          <div>登录/注册</div>
          <div class="phone">
              <span class="other"></span><span>无绑暂定手机号</span>
          </div>
      </div>
      <div class="self-right">
          <span></span>
      </div>
  </div>
</template>

<script>
export default {
    name: 'SelfLogin'
}
</script>

<style>
  .self-log {
      font-family: 'icomoon';
      display: flex;
      padding: 15px 0 10px 0;
      color: white;
      background-color: var(--color-tint);
  }
  .self-left, 
  .self-right {
      width: 80px;
  }
  .self-cen {
      flex: 1;
      margin-top: 8px;
      margin-left: 8px;
      font-size: 18px;
  }
  .self-cen .phone {
      font-size: 16px;
      margin-top: 6px;
  }
  .phone .other {
      font-size: 16px;
  }
  .self-left {
      margin-left: 20px;
  }
  .self-right {
      text-align: right;
      margin-right: 20px;
      margin-top: 14px;
      font-size: 26px;
  }
  .self-log img {
      height: 62px;
      width: 62px;
      border-radius: 50%;
      background-color: #f1f5f7;
  }
</style>