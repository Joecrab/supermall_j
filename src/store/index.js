import Vue from "vue";
import Vuex from "vuex";

import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getter.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    carList: []
  },
  mutations,
  actions,
  getters,
  modules: {},
});
