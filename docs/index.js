import Vue from 'vue';
import VueRouter from 'vue-router';
import App from 'views/App';
import routes from './routes';
import '../src/styles/index.less';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  linkActiveClass: 'active',
  routes,
});

new Vue({
  el: '#app',
  router,
  render: h => h(App),
});
