import { shallow } from '@vue/test-utils';
import CoMenu from '@/components/menu';

const { CoMenuItem } = CoMenu;

describe('CoMenuItem 组件', () => {
  it('default render', () => {
    const wrapper = shallow(CoMenuItem, {
      slots: {
        default: 'item text',
      },
    });

    expect(wrapper.classes()).toContain('co-menu__item');
    expect(wrapper.text()).toBe('item text');
  });

  it('name prop', () => {
    const wrapper = shallow(CoMenuItem, {
      propsData: { name: '1-1' },
    });

    expect(wrapper.vm.name).toBe('1-1');
  });

  it('disabled prop', () => {
    const wrapper = shallow(CoMenuItem, {
      propsData: { disabled: true },
    });

    expect(wrapper.classes()).toContain('co-menu__item--disabled');
  });
});
