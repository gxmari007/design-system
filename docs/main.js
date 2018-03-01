import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App';
import router from './router';
import '../src/style/index.less';

// 阻止 vue 在启动时生成生产提示
Vue.config.productionTip = false;

// 配置插件
Vue.use(VueRouter);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  render: h => h(App),
});
