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
      component: BoardList,
      meta: { requiresAuth: true }
    },
    {
      path: '/list/:id',
      name: 'board',
      component: BoardSc,
      props: true,
      meta: { requiresAuth: true }
    }]
});

router.beforeEach((to,from,next) => {
  const isAuthenticated = localStorage.getItem('userId') !== null;

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (isAuthenticated) {
      next();
    } else {
      next('/login');
    }
  } else {
    next();
  }
});


new Vue({
  vuetify,
  router,
  render: h => h(App),
}).$mount('#app');
