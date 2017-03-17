import Vue from 'vue';
import CoModal from './modal.vue';
import CoDialog from './dialog';

const DialogConstructor = Vue.extend(CoDialog);

CoModal.newInstance = (options) => {
  if (Vue.prototype.$isServer) return;

  const data = options || {};

  const instance = new DialogConstructor({ data });

  instance.$mount();
  document.body.appendChild(instance.$el);
};

export default CoModal;
