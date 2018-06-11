// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import iview from 'iview'
import router from './router/index'
import axios from 'axios'
require('iview/dist/styles/iview.css');
// import 'iview/dist/styles/iview.css'
require('./api/mock/index');
import store from './store'
import 'animate.css'
import contentmenu from 'v-contextmenu'
import 'v-contextmenu/dist/index.css'
axios.defaults.withCredentials = true
Vue.use(contentmenu)

Vue.config.productionTip = false
Vue.use(iview);
Vue.prototype.$axios = axios
Vue.prototype.utils = require('./utils/util');
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
