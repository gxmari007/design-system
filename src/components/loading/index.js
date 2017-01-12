import Vue from 'vue';
import CoLoading from './CoLoading';

const CoLoadingConstructor = Vue.extend(CoLoading);
let instance = null;
let timer = null;

function makeInstance(options) {
  const vm = new CoLoadingConstructor();

  vm.$mount();
  document.body.appendChild(vm.$el);

  return {
    component: vm,
  };
}

export default CoLoading;
