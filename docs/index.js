import Vue from 'vue';
import VueRouter from 'vue-router';
import coview from 'coview';
import App from './pages/app';
import routes from './routes';
import '../src/style/index.less';

Vue.config.productionTip = false;

Vue.use(coview);
Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  linkActiveClass: 'active',
  routes,
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
});
