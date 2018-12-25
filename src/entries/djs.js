import Vue from 'vue'
import App from './App_djs.vue'
import router from '@/router/djs'
/* import store from './store'; */

import '@/assets/css/reset.css'

Vue.config.productionTip = false

new Vue({
  router,
  // store,
  render: h => h(App)
}).$mount('#app')
