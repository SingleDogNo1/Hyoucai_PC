import Vue from 'vue'
import App from './App_hyc.vue'
import router from '@/router/hyc'
/* import store from './store'; */

import '@/assets/css/reset.css'

Vue.config.productionTip = false

new Vue({
  router,
  // store,
  render: h => h(App)
}).$mount('#app')
