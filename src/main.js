import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import Board from './views/Board'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import vueyoutube from 'vue-youtube-embed'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  vueyoutube,
  render: h => h(Board)
}).$mount('#app')
