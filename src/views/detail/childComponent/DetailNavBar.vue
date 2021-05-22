<template>
  <div>
      <nav-bar>
          <template v-slot:left>
              <div class="left" @click="dlitemclick"></div>
          </template>
          <template v-slot:center><!--不能直接在template里面加class-->
              <div class="dncenter">
                  <span v-for="(item,index) in titles" 
                        :key="index"  
                        class="dncenteritem"
                        @click="dnitemClick(index)"
                        :class="{'active':index === curIndex}">{{item}}</span>
              </div>
          </template>
      </nav-bar>
  </div>
</template>

<script>
import NavBar from '../../../components/common/navbar/NavBar.vue';
export default {
    name: 'DetailNavBar',
    components: {
        NavBar
    },
    data(){
        return {
            titles: ['商品', '参数', '评论', '推荐'],
            curIndex: 0
        }
    },
    methods: {
        dnitemClick(index){
            this.curIndex = index;
            this.$emit('titleClick', index);
        },
        dlitemclick(){
            //this.$router.push('/home');
            this.$router.back();
        }
    }
}
</script>

<style> 
  @import '../../../assets/css/base.css';
  .left {
      font-family: 'icomoon';
      margin-left: 18px;
      font-size: 20px;
      text-align: center;
  }
  .dncenter {
      display: flex;
  }
  .dncenter .dncenteritem {
      flex: 1;
  }
  .active {
      color: var(--color-high-text);
  }
</style>