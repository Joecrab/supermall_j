<template>
  <div class="tab-bar-item" @click="itemClick">
      <div :style="actConStyle"><slot name="item-icon" ></slot></div>
      <div :style="actTxtStyle"><slot name="item-text"></slot></div>
      <!--加div的原因是去动态绑定style，不能直接在slot上加style，因为最终替换插槽的的标签会把插槽的所有都覆盖掉-->
  </div>
</template>

<script>
export default {
    name: 'TabBarItem',
    props: {
      path: String,
      concolor: {
        type: String,
        default: 'orange'
      },
      txtcolor: {
        type: String,
        default: 'red'
      },
    },
    data() {
      return {
      }
    },
    computed: {
      isActive(){
        return this.$route.path.indexOf(this.path) !== -1;
        //=-1没有找到字符串
        //$route.path是当前活跃路由下的路径，这里的path是$route的属性
      },
      actConStyle(){
        return this.isActive ? {color: this.concolor} : {};
        //动态绑定style
      },
      actTxtStyle(){
        return this.isActive ? {color: this.txtcolor} : {};
      },
    },
    methods: {
      itemClick() {
        this.$router.replace(this.path).catch(err => err);
        //.catch(err => err)让点击两次不要报错
      }
    }
}
</script>

<style>

.tab-bar-item {
    flex: 1;/*均等分*/
    text-align: center;
    font-family: 'icomoon';
    margin-left: 4px;
    margin-top: 8px;
  }
/*.active_c {
  color: orange;
}
.active_t {
  color: red;
}没办法将js的变量拿过来*/
</style> 