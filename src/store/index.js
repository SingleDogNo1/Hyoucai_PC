import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import register from './modules/register'
import login from './modules/login'

import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    register,
    login
  },
  getters
})

export default store
