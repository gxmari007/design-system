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

  describe('inlineIndent prop', () => {
    it('inline 模式下才有缩进效果', () => {
      const wrapper = shallow(CoMenu, {
        propsData: {
          mode: 'inline',
          inlineIndent: 24,
        },
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

    it('非 inline 模式设置 inlineIndent 无效', () => {
      const wrapper = shallow(CoMenu, {
        propsData: {
          mode: 'horizontal',
          inlineIndent: 24,
        },
        slots: {
          default: `
            <co-menu-item name="0">menu item</co-menu-item>
            <co-sub-menu name="sub0">
              <span slot="title">submenu title</span>
              <co-menu-item name="1">menu item</co-menu-item>
            </co-sub-menu>
          `,
        },
        localVue,
      });
      const item = wrapper.find(CoMenuItem);
      const subMenuTitle = wrapper.find('.co-menu__submenu-title');

      expect(item.element.style.paddingLeft).toBe('');
      expect(subMenuTitle.element.style.paddingLeft).toBe('');
    });
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

  it('defaultOpenNames prop', () => {
    const wrapper = shallow(CoMenu, {
      propsData: { defaultOpenNames: ['sub1'] },
      slots: {
        default: `
          <co-sub-menu name="sub0">
            <span slot="title">submenu title</span>
            <co-menu-item name="0">menu item</co-menu-item>
          </co-sub-menu>
          <co-sub-menu name="sub1">
            <span slot="title">submenu title</span>
            <co-menu-item name="1">menu item</co-menu-item>
          </co-sub-menu>
        `,
      },
      localVue,
    });
    const subMenus = wrapper.findAll(CoSubMenu);

    expect(wrapper.vm.defaultOpenNames).toEqual(['sub1']);
    expect(subMenus.at(0).vm.visible).toBe(false);
    expect(subMenus.at(1).vm.visible).toBe(true);

    wrapper.setProps({ defaultOpenNames: ['sub0'] });

    expect(subMenus.at(0).vm.visible).toBe(false);
    expect(subMenus.at(1).vm.visible).toBe(true);
  });

  it('openNames prop', () => {
    const wrapper = shallow(CoMenu, {
      propsData: { openNames: ['sub1'] },
      slots: {
        default: `
          <co-sub-menu name="sub0">
            <span slot="title">submenu title</span>
            <co-menu-item name="0">menu item</co-menu-item>
          </co-sub-menu>
          <co-sub-menu name="sub1">
            <span slot="title">submenu title</span>
            <co-menu-item name="1">menu item</co-menu-item>
          </co-sub-menu>
        `,
      },
      localVue,
    });
    const subMenus = wrapper.findAll(CoSubMenu);

    expect(wrapper.props().openNames).toEqual(['sub1']);
    expect(subMenus.at(0).vm.visible).toBe(false);
    expect(subMenus.at(1).vm.visible).toBe(true);

    wrapper.setProps({ openNames: ['sub0'] });

    expect(subMenus.at(0).vm.visible).toBe(true);
    expect(subMenus.at(1).vm.visible).toBe(false);
  });

  it('subMenuCloseDelay and subMenuOpenDelay prop', () => {
    jest.useFakeTimers();

    const wrapper = shallow(CoMenu, {
      propsData: { mode: 'vertical' },
      slots: {
        default: `
          <co-sub-menu name="sub0">
            <span slot="title">submenu title</span>
            <co-menu-item name="0">menu item</co-menu-item>
          </co-sub-menu>
        `,
      },
      localVue,
    });
    const subMenu = wrapper.find(CoSubMenu);
    const subMenuTitle = subMenu.find('.co-menu__submenu-title');

    expect(wrapper.vm.subMenuOpenDelay).toBe(0);
    expect(wrapper.vm.subMenuCloseDelay).toBe(0.1);

    wrapper.setProps({
      subMenuOpenDelay: 0.3,
      subMenuCloseDelay: 0.5,
    });
    subMenuTitle.trigger('mouseenter');
    jest.advanceTimersByTime(300);

    expect(subMenu.vm.visible).toBe(true);

    subMenuTitle.trigger('mouseleave');
    jest.advanceTimersByTime(500);

    expect(subMenu.vm.visible).toBe(false);

    jest.clearAllTimers();
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
