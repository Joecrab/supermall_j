<template>
  <div class="recommend">
      <div v-for="(item, index) in recommend" :key="index" class="recommend_item">
          <a :href="item.link">
              <img :src="item.image" alt="">
              <div>{{item.title}}</div>
          </a>
      </div>
  </div>
</template>

<script>
export default {
    name: "HomeRecommendView",
    props: {
        recommend: {
            type: Array,
            default(){
                return []
            }
        }
    }
}
</script>

<style>
  .recommend {
      display: flex;
      width: 100%;
      padding: 10px 0 15px;
      text-align: center;
      font-size: 12px;
      border-bottom: 8px solid #eee;
  }
  .recommend_item {
      flex: 1;
  }
  .recommend_item img {
      width: 65px;
      height: 65px;
      margin-bottom: 10px;
  }
</style>