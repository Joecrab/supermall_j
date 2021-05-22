<template>
  <div class="self-news">
      <div class="news-item" v-for="(item,index) in info" :key="index">
          <span class="news-icon">{{item.icon}} </span>
          <span class="news-txt">{{item.txt}}</span>
      </div>
  </div>
</template>

<script>
export default {
    name: 'SelfOtherData',
    props: {
        info: {
            type: Array,
            default(){
                return []
            }
        }
    }
}
</script>

<style>
  .self-news {
      font-family: 'icomoon';
      font-size: 14px;
      border-top: 12px solid #f5f5f5;
      padding-right: 2px;
  }
  .news-item {
      padding: 10px 0;
      margin-left: 15px;
      border-bottom: 1px solid #eeeaea;
  }
  .news-item:last-child {
      border-bottom-color: white;
  }
  .news-icon {
      color: var(--color-tint);
  }
</style>