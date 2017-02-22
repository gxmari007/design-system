import Vue from 'vue';
import CoLoading from './loading';

const CoLoadingConstructor = Vue.extend(CoLoading);

export default function makeInstance() {
  const vm = new CoLoadingConstructor();

  vm.$mount();
  document.body.appendChild(vm.$el);

  return {
    component: vm,
    update(options) {
      if (options.hasOwnProperty('show')) {
        vm.show = options.show;
      }

      if (options.hasOwnProperty('percent')) {
        vm.percent = options.percent;
      }

      if (options.hasOwnProperty('status')) {
        vm.status = options.status;
      }
    },
    destroy() {
      document.body.removeChild(vm.$el);
    },
  };
}
