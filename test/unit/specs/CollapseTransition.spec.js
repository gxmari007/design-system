import { createLocalVue } from '@vue/test-utils';
import CoCollapseTransition from '@/components/collapse-transition';

describe('CoCollapseTransition 组件', () => {
  const Vue = createLocalVue();

  Vue.component(CoCollapseTransition.name, CoCollapseTransition);

  it('default render', () => {
    const vm = new Vue({
      data: { show: false },
      render() {
        return (
          <co-collapse-transition>
            <div v-show={this.show}>collapse content</div>
          </co-collapse-transition>
        );
      },
    });

    console.log(vm.show);
  });
});
