import { shallow, createLocalVue } from '@vue/test-utils';
import CoMenu from '@/components/menu';

const { CoMenuItem, CoSubMenu } = CoMenu;

describe('CoMenu', () => {
  const localVue = createLocalVue();

  localVue.component(CoMenuItem.name, CoMenuItem);
  localVue.component(CoSubMenu.name, CoSubMenu);

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

  it('defaultSelectedNames prop', () => {
    const wrapper = shallow(CoMenu, {
      propsData: { defaultSelectedNames: ['1', '2'] },
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

    // 更新 defaultSelectedNames 也无法更改初始化的值
    wrapper.setProps({ defaultSelectedNames: ['0'] });

    expect(items.at(0).classes()).not.toContain('co-menu__item--selected');
  });

  it('inlineIndent prop', () => {
    const wrapper = shallow(CoMenu, {
      propsData: { inlineIndent: 24 },
      slots: {
        default: `
          <co-menu-item name="0">menu item</co-menu-item>
          <co-sub-menu name="sub0">
            <span slot="title">submenu title</span>
            <co-menu-item name="1">menu item</co-menu-item>
            <co-sub-menu name="sub1">
              <span slot="title">submenu title</span>
              <co-menu-item name="2">menu item</co-menu-item>
            </co-sub-menu>
          </co-sub-menu>
        `,
      },
      localVue,
    });
    const items = wrapper.findAll(CoMenuItem);
    const subMenuTitles = wrapper.findAll('.co-menu__submenu-title');

    expect(items.at(0).element.style.paddingLeft).toBe('24px');
    expect(items.at(1).element.style.paddingLeft).toBe('48px');
    expect(items.at(2).element.style.paddingLeft).toBe('72px');
    expect(subMenuTitles.at(0).element.style.paddingLeft).toBe('24px');
    expect(subMenuTitles.at(1).element.style.paddingLeft).toBe('48px');
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

    expect(wrapper.props().multiple).toBe(false);

    wrapper.setProps({ multiple: true });
    items.trigger('click');

    expect(items.contains('.co-menu__item--selected')).toBe(true);

    items.trigger('click');

    expect(items.contains('.co-menu__item--selected')).toBe(false);
  });

  it('selectable prop', () => {
    const wrapper = shallow(CoMenu, {
      slots: {
        default: [
          '<co-menu-item name="0">menu item</co-menu-item>',
        ],
      },
      localVue,
    });
    const item = wrapper.find(CoMenuItem);

    expect(wrapper.props().selectable).toBe(true);

    wrapper.setProps({ selectable: false });
    item.trigger('click');

    expect(item.classes()).not.toContain('co-menu__item--selected');
  });

  it('selectedNames prop', () => {
    const wrapper = shallow(CoMenu, {
      propsData: { selectedNames: ['0'] },
      slots: {
        default: [
          '<co-menu-item name="0">menu item</co-menu-item>',
          '<co-menu-item name="1">menu item</co-menu-item>',
        ],
      },
      localVue,
    });
    const items = wrapper.findAll(CoMenuItem);

    expect(items.at(0).classes()).toContain('co-menu__item--selected');
    expect(items.at(1).classes()).not.toContain('co-menu__item--selected');
  });

  it('on-click event', () => {
    const wrapper = shallow(CoMenu, {
      slots: {
        default: [
          '<co-menu-item name="0">menu item</co-menu-item>',
        ],
      },
      localVue,
    });
    const item = wrapper.find(CoMenuItem);

    item.trigger('click');
    item.trigger('click');

    expect(wrapper.emitted('on-click').length).toBe(2);
    expect(wrapper.emitted('on-click')[0]).toEqual([{
      name: '0',
      namePath: ['0'],
    }]);
  });

  it('on-deselect event', () => {
    const wrapper = shallow(CoMenu, {
      propsData: {
        multiple: true,
        defaultSelectedNames: ['0', '1', '2'],
      },
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

    items.at(0).trigger('click');

    expect(wrapper.emitted('on-deselect')[0]).toEqual([{
      name: '0',
      selectedNames: ['1', '2'],
    }]);
  });

  it('on-select event', () => {
    const wrapper = shallow(CoMenu, {
      slots: {
        default: [
          '<co-menu-item name="0">menu item</co-menu-item>',
        ],
      },
      localVue,
    });
    const item = wrapper.find(CoMenuItem);

    item.trigger('click');
    item.trigger('click');

    expect(wrapper.emitted('on-select').length).toBe(1);
    expect(wrapper.emitted('on-select')[0]).toEqual([{
      name: '0',
      selectedNames: ['0'],
    }]);
  });
});
