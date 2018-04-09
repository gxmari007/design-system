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

const router = new VueRouter({
  routes,
  linkActiveClass: 'active',
});

// 设置后置钩子改变页面 title
router.afterEach((to) => {
  document.title = `${to.name} - CoView`;
});

export default router;
