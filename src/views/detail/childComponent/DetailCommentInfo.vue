<template>
  <div v-if="Object.keys(commentInfo).length !== 0" class="comment">
      <div class="comnav">
          <div class="usercom">用户评价</div>
          <div class="more">更多 </div>
      </div>
        <div class="user">
            <img :src="commentInfo.user.avatar" alt="">
            <span>{{commentInfo.user.uname}}</span>
        </div>
        <div class="comtext">
            <p>{{commentInfo.content}}</p>
            <div class="info-other">
                <span class="date">{{commentInfo.created | showDate}}</span><!--showDate搞了个过滤器-->
                <span>{{commentInfo.style}}</span>
            </div>
        </div>
        <div class="info-imgs">
            <img :src="item" alt="" v-for="(item,index) in commentInfo.images" :key="index">
        </div>
  </div>
</template>

<script>
import {formateDate} from '../../../common/utils.js';
export default {
    name: 'DetailCommentInfo',
    props: {
        commentInfo: {
            type: Object,
            default(){
                return {};
            }
        }
    },
    filters: {
        showDate(value){
            //1.将时间戳转化成Date对象
            let date = new Date(value * 1000);

            //2.将date进行格式化，转成对应的字符串
            return formateDate(date, 'yyyy-MM-dd hh:mm:ss');
        }
    }
}
</script>

<style>
  @import '../../../assets/css/base.css';
  .comment {
    padding: 5px 12px;
    color: #333;
    border-bottom: 5px solid #f2f5f8;
  }
  .comnav {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid rgba(0,0,0,.1);
  }
  .usercom {
    float: left;
    font-size: 16px;
  }
  .more {
    font-family: 'icomoon';
    float: right;
    margin-right: 10px;
    font-size: 14px;
  }
  .user {
    padding: 10px 0 5px;
  }
  .user img {
    width: 42px;
    height: 42px;
    border-radius: 50%;
  }
  .user span {
    position: relative;
    font-size: 16px;
    top: -15px;
    margin-left: 10px;
  }
  .comtext {
    padding: 0 5px 15px;
  }
  .comtext p {
    font-size: 14px;
    color: #777;
    line-height: 1.5;
  }
  .comtext .info-other {
    font-size: 12px;
    color: #999;
    margin-top: 10px;
  }
  .comtext .date {
    margin-right: 8px;
  }
  .info-imgs {
    margin-top: 10px;
  }

  .info-imgs img {
    width: 70px;
    height: 70px;
    margin-right: 5px;
  }
</style>