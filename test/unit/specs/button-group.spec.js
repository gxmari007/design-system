import Vue from 'vue';
import { mount } from 'vue-test-utils';
import { CoButtonGroup, CoButton } from '@/components/button';

Vue.component('CoButton', CoButton);

describe('CoButtonGroup', () => {
  it('default render', () => {
    const wrapper = mount(CoButtonGroup);

    expect(wrapper.hasClass('co-button-group')).toBe(true);
  });

  it('垂直排列按钮组', () => {
    const wrapper = mount(CoButtonGroup, {
      propsData: { vertical: true },
    });

    expect(wrapper.hasClass('co-button-group--vertical')).toBe(true);
  });

  it('size prop', () => {
    const wrapper = mount(CoButtonGroup, {
      propsData: {
        size: 'sm',
      },
      slots: {
        default: CoButton,
      },
    });
    const button = wrapper.find(CoButton);

    expect(button.hasClass('co-button--small')).toBe(true);
  });

  it('button 组件的 size 属性优先级更高', () => {
    const wrapper = mount(CoButtonGroup, {
      propsData: {
        size: 'sm'
      },
      slots: {
        default: [
          '<co-button>Button</co-button>',
          '<co-button size="lg">Button</co-button>',
        ],
      },
    });
    const buttons = wrapper.findAll(CoButton);

    expect(buttons.at(0).hasClass('co-button--small')).toBe(true);
    expect(buttons.at(1).hasClass('co-button--large')).toBe(true);
  });
});
