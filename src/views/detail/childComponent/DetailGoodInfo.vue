<template>
  <div v-if="Object.keys(detailData).length !== 0" class="goods-info"><!--有时候DetailGoodInfo可能没有内容-->
      <div class="info-desc clearfix">
          <div class="start">
          </div>
          <div class="desc">{{detailData.desc}}</div>
          <div class="end">
          </div>
      </div>
      <div class="info-key">{{detailData.detailImage[0].key}}</div>
      <div class="info-list">
          <img v-for="(item,index) in detailData.detailImage[0].list" 
               :key="index" 
               :src="item"
               @load="infoimgLoad"
                alt="">
      </div>
      
  </div>
</template>

<script>
export default {
    name: 'DetailGoodInfo',
    props: {
        detailData: {
            type: Object,
            default(){
                return {};
            }
        }
    },
    methods: {
        infoimgLoad(){
            this.$bus.$emit('infoimgLoad');
        }
    }

}
</script>

<style>
 .good-info {
     padding: 20px 0;
     border-bottom: 5px solid #f2f5f8;
 }
 .info-desc {
    padding: 0 15px;
  }
  .info-desc .start, .info-desc .end {
    width: 90px;
    height: 1px;
    background-color: #a3a3a5;
    position: relative;
  }
  .info-desc .start {
    margin-top: 5px;
    float: left;
  }
  .info-desc .end {
    float: right;
  }
  .info-desc .start::before, 
  .info-desc .end::after {
      content: '';
      position: absolute;
      width: 5px;
      height: 5px;
      background-color: #333;
      bottom: 0;
  }
  .info-desc .end::after {
      right: 0;
  }
  .info-desc .desc {
    padding: 15px 0;
    font-size: 14px;
  }
  .info-key {
    margin: 10px 0 10px 15px;
    color: #333;
    font-size: 16px;
  }
  .info-list img {
    width: 100%;
  }
</style>