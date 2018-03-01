import Vue from 'vue';
import CoModal from './modal.vue';
import CoDialog from './dialog';

const DialogConstructor = Vue.extend(CoDialog);

CoModal.newInstance = (options) => {
  if (Vue.prototype.$isServer) return;

  const opts = options || {};
  const vm = new DialogConstructor({ data: opts });

  vm.$mount();
  document.body.appendChild(vm.$el);
};

export default CoModal;
