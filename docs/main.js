import Vue from 'vue';
import App from './App';
import '../src/style/index.less';

// 阻止 vue 在开发环境下
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  components: { App },
});
