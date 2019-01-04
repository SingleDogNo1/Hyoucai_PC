import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import register from './modules/register'

import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    register
  },
  getters
})

export default store
