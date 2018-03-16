import { shallow, createLocalVue } from '@vue/test-utils';
import CoMenu from '@/components/menu';

const { CoMenuItem } = CoMenu;

describe('CoMenu', () => {
  const localVue = createLocalVue();

  localVue.component(CoMenuItem.name, CoMenuItem);

  it('default render', () => {
    const wrapper = shallow(CoMenu);

    expect(wrapper.classes()).toContain('co-menu');
    expect(wrapper.classes()).toContain('co-menu--root');
    expect(wrapper.classes()).toContain('co-menu--light');
    expect(wrapper.classes()).toContain('co-menu--vertical');
  });

  it('theme prop', () => {
    const wrapper = shallow(CoMenu, {
      propsData: { theme: 'dark' },
    });

    expect(wrapper.classes()).toContain('co-menu--dark');
  });

  it('mode prop', () => {
    const wrapper = shallow(CoMenu, {
      propsData: { mode: 'inline' },
    });

    expect(wrapper.classes()).toContain('co-menu--inline');
  });

  it('defaultSelectedKeys prop', () => {
    const wrapper = shallow(CoMenu, {
      propsData: { defaultSelectedKeys: ['1', '2'] },
      slots: {
        default: [
          '<co-menu-item name="0">menu item</co-menu-item>',
          '<co-menu-item name="1">menu item</co-menu-item>',
          '<co-menu-item name="2">menu item</co-menu-item>',
        ],
      },
      localVue,
    });
    const items = wrapper.findAll(CoMenuItem);

    expect(items.at(0).classes()).not.toContain('co-menu__item--selected');
    expect(items.at(1).classes()).toContain('co-menu__item--selected');
    expect(items.at(2).classes()).toContain('co-menu__item--selected');

    // 更新 defaultSelectedKeys 也无法更改初始化的值
    wrapper.setProps({ defaultSelectedKeys: ['0'] });

    expect(items.at(0).classes()).not.toContain('co-menu__item--selected');
  });

  it('inlineIndent prop', () => {
    const wrapper = shallow(CoMenu, {
      slots: {
        default: [
          '<co-menu-item name="0">menu item</co-menu-item>',
        ],
      },
      localVue,
    });
    const item = wrapper.find(CoMenuItem);

    expect(wrapper.props().inlineIndent).toBe(24);
    expect(item.element.style.paddingLeft).toBe('24px');

    wrapper.setProps({ inlineIndent: 48 });

    expect(item.element.style.paddingLeft).toBe('48px');
  });

  it('multiple prop', () => {
    const wrapper = shallow(CoMenu, {
      slots: {
        default: [
          '<co-menu-item name="0">menu item</co-menu-item>',
          '<co-menu-item name="1">menu item</co-menu-item>',
        ],
      },
      localVue,
    });
    const items = wrapper.findAll(CoMenuItem);

    expect(wrapper.vm.multiple).toBe(false);

    wrapper.setProps({ multiple: true });
    items.trigger('click');
    wrapper.update();

    expect(items.contains('.co-menu__item--selected')).toBe(true);

    items.trigger('click');
    wrapper.update();

    expect(items.contains('.co-menu__item--selected')).toBe(false);
  });

  it('selectable prop', () => {
    const wrapper = shallow(CoMenu);

    expect(wrapper.props().selectable).toBe(true);
  });
});
