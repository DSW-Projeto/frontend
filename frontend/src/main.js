import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'
import vuetify from './plugins/vuetify'

/*Imports de componentes*/
Vue.use(Router)

const router = new Router({
  mode: 'history',
//  routes: [
//    {
//      path: '/',
//      name: 'home',
//      component: Homepage
//    }]
})

new Vue({
  data: {
    credentials: null,
    config: {
      url: "http://localhost:8081"
    }
  },

  el: '#app',
  render: h => h(App),
  vuetify,
  router
})
