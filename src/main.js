import Vue from 'vue'
import App from './App.vue'
import store from "./store/index"
import router from './router'
import { BootstrapVue } from 'bootstrap-vue'

Vue.use(BootstrapVue)
Vue.config.productionTip = false

import 'bootstrap/dist/css/bootstrap.css'


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
