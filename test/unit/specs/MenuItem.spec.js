import { shallow, createLocalVue } from '@vue/test-utils';
import CoMenu from '@/components/menu';

const { CoMenuItem } = CoMenu;

describe('CoMenuItem 组件', () => {
  const localVue = createLocalVue();

  beforeAll(() => {
    localVue.component(CoMenuItem.name, CoMenuItem);
  });

  it('default render', () => {
    const wrapper = shallow(CoMenuItem, {
      propsData: { name: '0' },
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
      propsData: {
        name: '0',
        disabled: true,
      },
    });

    expect(wrapper.classes()).toContain('co-menu__item--disabled');
  });

  it('点击组件可以为其添加 co-menu__item--selected 类', () => {
    const wrapper = shallow(CoMenu, {
      slots: {
        default: [
          '<co-menu-item name="0">menu-item</co-menu-item>',
          '<co-menu-item name="1">menu-item</co-menu-item>',
        ],
      },
      localVue,
    });
    const items = wrapper.findAll(CoMenuItem);

    expect(wrapper.vm.selectedItems).toEqual([]);
    items.at(0).trigger('click');
    expect(wrapper.vm.selectedItems).toEqual(['0']);
    expect(items.at(0).classes()).toContain('co-menu__item--selected');
  });
});
