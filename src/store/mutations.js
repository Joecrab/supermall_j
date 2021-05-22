import {
    ADD_COUNT,
    ADD_PRODUCR,
} from './mutation-types.js';

export default {
    //mutations完成的方法尽可能单一
    [ADD_COUNT](state, payload){
      payload.count += 1;
    },
    [ADD_PRODUCR](state, payload){
      payload.checked = false;
      state.carList.push(payload);
    },
    changeChecked(state, payload){//是否选择商品
      let product = state.carList.find(item => item.iid === payload.iid);
      product.checked = !payload.checked;
    },
    changeAll(state, payload){//是否全选
      //如果this.selectAll是false，即没全选，然后他就会执行item.checked = true，然后也会影响到computed的selectAll
      //因为此时item.checked 已经全部为true，所以selectAll也要相应更新，变为true
      if(!payload){
        state.carList.forEach(item => {item.checked = true});
      }
      else{
        state.carList.forEach(item => {item.checked = false});
      }
    }
}