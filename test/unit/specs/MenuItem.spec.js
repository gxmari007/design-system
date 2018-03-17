import { shallow, createLocalVue } from '@vue/test-utils';
import CoMenu from '@/components/menu';

const { CoMenuItem } = CoMenu;

describe('CoMenuItem 组件', () => {
  const localVue = createLocalVue();

  localVue.component(CoMenuItem.name, CoMenuItem);

  it('default render', () => {
    const wrapper = shallow(CoMenu, {
      slots: {
        default: '<co-menu-item name="0">menu item</co-menu-item>',
      },
      localVue,
    });
    const item = wrapper.find(CoMenuItem);

    expect(item.classes()).toContain('co-menu__item');
    expect(item.text()).toBe('menu item');
  });

  it('name prop', () => {
    const wrapper = shallow(CoMenu, {
      slots: {
        default: '<co-menu-item name="0">menu item</co-menu-item>',
      },
      localVue,
    });
    const item = wrapper.find(CoMenuItem);

    expect(item.props().name).toBe('0');
  });

  it('disabled prop', () => {
    const wrapper = shallow(CoMenu, {
      slots: {
        default: [
          '<co-menu-item name="0" disabled>menu item</co-menu-item>',
        ],
      },
      localVue,
    });
    const item = wrapper.find(CoMenuItem);

    expect(item.classes()).toContain('co-menu__item--disabled');
    item.trigger('click');
    expect(item.classes()).not.toContain('co-menu__item--selected');
  });

  it('点击组件可以为其添加 co-menu__item--selected 类', () => {
    const spyFn = jest.spyOn(CoMenu.methods, 'updateSelectItems');
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
    expect(items.at(1).classes()).not.toContain('co-menu__item--selected');
    expect(spyFn).toBeCalled();
    // 已经选中的 menu-item 应该无法再次触发父组件的方法
    items.at(0).trigger('click');
    expect(spyFn.mock.calls.length).toBe(1);

    spyFn.mockReset();
    spyFn.mockRestore();
  });
});
