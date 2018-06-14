import CoView from '../../../src';

export default ({
  Vue,
  router,
}) => {
  Vue.use(CoView);

  // 添加首页重定向
  router.addRoutes([
    { path: '/', redirect: '/components/getting-started.html' },
  ]);
};
