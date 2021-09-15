import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import mutations from './mutations'
import getters from './getters'
import actions from './actions'
export const store = new Vuex.Store({
  state:{
    cartList:[],
    isTotal:false,
    isLoading:false,
  },
  mutations,
  getters,
  actions
})

