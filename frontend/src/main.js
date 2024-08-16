import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

/*Imports de componentes*/
import HelloWorld from './components/HelloWorld.vue'
import BoardList from './components/BoardList.vue'
import BoardSc from './components/Board/BoardSc.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: HelloWorld
    }, {
      path: '/list',
      name: 'frame-list',
      component: BoardList
    },
    {
      path: '/list/:id',
      name: 'board',
      component: BoardSc,
      props:true
    }]
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
