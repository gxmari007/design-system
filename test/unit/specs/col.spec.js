import { shallow } from '@vue/test-utils';
import Vue from 'vue';
import CoCol from '@/components/col';
import CoRow from '@/components/row';

describe('CoCol 组件', () => {
  it('span prop', () => {
    const wrapper = shallow(CoCol, {
      propsData: { span: 6 },
    });

    expect(wrapper.classes()).toContain('co-col-6');
  });

  it('offset prop', () => {
    const wrapper = shallow(CoCol, {
      propsData: { offset: 6 },
    });

    expect(wrapper.classes()).toContain('co-col-offset-6');
  });

  it('order prop', () => {
    const wrapper = shallow(CoCol, {
      propsData: { order: 6 },
    });

    expect(wrapper.classes()).toContain('co-col-order-6');
  });

  it('pull prop', () => {
    const wrapper = shallow(CoCol, {
      propsData: { pull: 6 },
    });

    expect(wrapper.classes()).toContain('co-col-pull-6');
  });

  it('push prop', () => {
    const wrapper = shallow(CoCol, {
      propsData: { push: 6 },
    });

    expect(wrapper.classes()).toContain('co-col-push-6');
  });

  it('嵌套在 CoRow 组件中应该根据 gutter 属性来设置 padding', () => {
    const vm = new Vue({
      components: {
        CoRow,
        CoCol,
      },
      render() {
        return (
          <co-row gutter={16}>
            <co-col span="6" />
          </co-row>
        );
      },
    }).$mount();
    const col = vm.$el.querySelector('.co-col-6');

    expect(col.style.paddingRight).toBe('8px');
    expect(col.style.paddingLeft).toBe('8px');
  });
});
