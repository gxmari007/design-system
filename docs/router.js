import VueRouter from 'vue-router';
import Home from '~/pages/the_home';
import Components from '~/pages/the_components';

const routes = [
  {
    name: 'home',
    path: '/',
    redirect: '/components',
    // component: () => import('~/pages/the_home'),
    component: Home,
  },
  {
    name: 'components',
    path: '/components',
    // component: () => import('~/pages/the_components'),
    component: Components,
  },
];

export default new VueRouter({
  routes,
  mode: 'history',
  linkActiveClass: 'active',
});
