import {
    ADD_COUNT,
    ADD_PRODUCR
} from './mutation-types.js';

export default {
    addToCar(context,payload){//state是指Store里的state，payload是指事件传进来的参数
      return new Promise((reslove) => {
        let product = context.state.carList.find(item => item.iid === payload.iid);
        //如果箭头函数返回true，则product=item
        if(product){
          //该商品已存在,商品数量+1
          context.commit(ADD_COUNT, product);
          reslove('商品数量加一');
        }
        else{
          payload.count = 1;//设置购物车里没有的商品，数量定为1
          context.commit(ADD_PRODUCR, payload);
          reslove('商品已加入购物车');
        }
      })
    }
  }