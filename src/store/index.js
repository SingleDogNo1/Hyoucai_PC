import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import register from './modules/register'
import login from './modules/login'
import lend from './modules/lend'

import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    register,
    login,
    lend
  },
  getters
})

export default store
