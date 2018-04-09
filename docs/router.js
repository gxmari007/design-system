import VueRouter from 'vue-router';

const routes = [
  {
    name: 'home',
    path: '/',
    redirect: '/components',
    component: () => import('~/pages/the_home'),
  },
  {
    name: 'components',
    path: '/components',
    component: () => import('~/pages/the_components'),
  },
];

export default new VueRouter({
  routes,
  mode: 'history',
  linkActiveClass: 'active',
});
