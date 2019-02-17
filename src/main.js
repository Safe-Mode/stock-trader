import Vue from 'vue'
import VueRouter from 'vue-router'
import SweetModal from 'sweet-modal-vue/src/plugin.js'
import App from './App.vue'
import { routes } from './routes'
import store from './store/store'

Vue.use(VueRouter)
Vue.use(SweetModal)

const router = new VueRouter({
  routes,
  mode: 'history'
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
