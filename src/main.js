import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import store from "./store";
import router from "./router";
import toast from "./components/common/toast/index.js";
import FastClick from 'fastclick';
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false;
Vue.prototype.$bus = new Vue();
Vue.use(toast);

/**
 * FastClick使用步骤
 * 1.安装 npm install fastclick
 * 2.导入 import
 * 3.调用attch函数
 */
//移动端解决300ms延迟
FastClick.attach(document.body);//attach附加

/** 
 * vue-lazyload使用步骤
 * 1.安装 npm install vue-lazyload
 * 2.导入 import
 * 3.Vue.use（）安装插件
 * 4.修改img-src->v-lazy 具体可看content/里面的goodlistitem.vue文件img那里
 */
//使用图片懒加载，就是用户滑动到那个视图位置图片再加载出来
Vue.use(VueLazyLoad, {
  loading: require('./assets/img/common/load.gif')
  //图片加载失败是，显示这张图片
});

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");

