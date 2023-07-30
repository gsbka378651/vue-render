import Vue from 'vue'
import App from './App.vue'
import router from './router'

// Axios
import axios from 'axios'
import vueaxios from 'vue-axios'
import qs from 'qs'

// BootStrap-Vue
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import '@/assets/css/Normalize.css'
import '@/assets/css/Font.css'

Vue.config.productionTip = false

Vue.prototype.$axios = axios
Vue.prototype.$qs = qs
// axios.defaults.baseURL = '/api'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
