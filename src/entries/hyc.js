import Vue from 'vue'
import App from './App_hyc.vue'
import router from '@/router/hyc'
import '../plugins/element.js'
import store from '@/store'
import VueLazyload from 'vue-lazyload'

import 'swiper/dist/css/swiper.css'
import '@/assets/css/reset.css'
import '@/assets/fonts/iconfont/iconfont.css'

Vue.config.productionTip = false
Vue.use(VueLazyload)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
