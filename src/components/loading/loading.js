import Vue from 'vue';
import CoLoading from './loading.vue';

const CoLoadingConstructor = Vue.extend(CoLoading);

export default function makeInstance() {
  const vm = new CoLoadingConstructor();

  vm.$mount();
  document.body.appendChild(vm.$el);

  return {
    component: vm,
    update(options) {
      if (Object.prototype.hasOwnProperty.call(options, 'show')) {
        vm.show = options.show;
      }

      if (Object.prototype.hasOwnProperty.call(options, 'percent')) {
        vm.percent = options.percent;
      }

      if (Object.prototype.hasOwnProperty.call(options, 'status')) {
        vm.status = options.status;
      }
    },
    destroy() {
      vm.$destroy();
      document.body.removeChild(vm.$el);
    },
  };
}
