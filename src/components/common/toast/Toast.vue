<template>
  <div class="toast" v-show="isShow">
      <div>{{msg}}</div>
  </div>
</template>

<script>
export default {
    name: 'Toast',
    data(){
        return {
            msg: '',
            isShow: false,
            timer: null
        }
    },
    methods: {
        show(msg, duration){//duration = 5000给他设置默认值
            if(!this.timer){
                clearTimeout(this.timer);
            }
            this.isShow = true;
            this.msg = msg;
            this.timer = setTimeout(() => {
                this.isShow = false;
                this.msg = '';
            }, duration);
        }
    }
}
</script>

<style>
  .toast {
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 99;
      transform: translate(-50%, -50%);
      padding: 8px 10px;
      background-color: rgba(0, 0, 0, .7);
      font-size: 18px;
      color: #ffffff;
      border-radius: 5px;
  }
</style>