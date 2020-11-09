import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import getServerApi from './network/index'
import until from './until/index'
import storgae from './storage/index'

import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$api = getServerApi
Vue.prototype.$until = until
Vue.prototype.$store = store
Vue.prototype.$storage = storgae
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
