import Vue from 'vue'
import App from './App_common.vue'
import router from '@/router/common'
import '../plugins/element.js'
/* import store from './store'; */

import '@/assets/css/reset.css'
import '@/assets/fonts/iconfont/iconfont.css'

Vue.config.productionTip = false

new Vue({
  router,
  // store,
  render: h => h(App)
}).$mount('#app')
