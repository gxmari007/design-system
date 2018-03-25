import { shallow, createLocalVue } from '@vue/test-utils';
import CoMenu from '@/components/menu';

const { CoSubMenu, CoMenuItem } = CoMenu;

describe('CoSubMenu', () => {
  const localVue = createLocalVue();

  localVue.component(CoSubMenu.name, CoSubMenu);
  localVue.component(CoMenuItem.name, CoMenuItem);

  it('default render', () => {
    const wrapper = shallow(CoMenu, {
      propsData: { mode: 'inline' },
      slots: {
        default: `
          <co-sub-menu name="sub0">
            <template slot="title">sub menu title</template>
          </co-sub-menu>
        `,
      },
      localVue,
    });
    const subMenu = wrapper.find(CoSubMenu);

    expect(subMenu.classes()).toContain('co-menu__submenu');
    expect(subMenu.classes()).toContain('co-menu__submenu--inline');
  });

  it('default slot', () => {
    const wrapper = shallow(CoMenu, {
      propsData: { mode: 'inline' },
      slots: {
        default: `
          <co-sub-menu name="sub0">
            <template slot="title">sub menu title</template>
            <co-menu-item name="0">menu item</co-menu-item>
            <co-menu-item name="1">menu item</co-menu-item>
          </co-sub-menu>
        `,
      },
      localVue,
    });
    const sub = wrapper.find('.co-menu__sub');
    const menuItems = wrapper.findAll(CoMenuItem);

    expect(sub.exists()).toBe(true);
    expect(sub.classes()).toContain('co-menu');
    expect(sub.classes()).toContain('co-menu--inline');
    expect(menuItems.length).toBe(2);
  });

  it('title slot', () => {
    const wrapper = shallow(CoMenu, {
      slots: {
        default: `
          <co-sub-menu name="sub0">
            <template slot="title">sub menu title</template>
          </co-sub-menu>
        `,
      },
      localVue,
    });
    const subMenuTitle = wrapper.find('.co-menu__submenu-title');

    expect(subMenuTitle.exists()).toBe(true);
    expect(subMenuTitle.text()).toBe('sub menu title');
  });

  it('disabled prop', () => {
    const wrapper = shallow(CoMenu, {
      propsData: { mode: 'inline' },
      slots: {
        default: `
          <co-sub-menu name="sub0" disabled>
            <template slot="title">sub menu title</template>
          </co-sub-menu>
        `,
      },
      localVue,
    });
    const subMenu = wrapper.find(CoSubMenu);
    const subMenuTitle = subMenu.find('.co-menu__submenu-title');

    expect(subMenu.classes()).toContain('co-menu__submenu--disabled');
    // disabled 状态下 click hover 都没有效果
    expect(subMenu.vm.visible).toBe(false);

    subMenuTitle.trigger('click');

    expect(subMenu.vm.visible).toBe(false);
  });

  it('name prop', () => {
    const wrapper = shallow(CoMenu, {
      slots: {
        default: `
          <co-sub-menu name="sub0">
            <template slot="title">sub menu title</template>
          </co-sub-menu>
        `,
      },
      localVue,
    });
    const subMenu = wrapper.find(CoSubMenu);

    expect(subMenu.props().name).toBe('sub0');
  });

  describe('sub-menu 组件的状态切换', () => {
    const wrapper = shallow(CoMenu, {
      slots: {
        default: `
          <co-sub-menu name="sub0">
            <template slot="title">sub menu title</template>
            <co-menu-item name="0">menu item</co-menu-item>
            <co-menu-item name="1">menu item</co-menu-item>
          </co-sub-menu>
        `,
      },
      localVue,
    });
    const subMenu = wrapper.find(CoSubMenu);
    const subMenuTitle = subMenu.find('.co-menu__submenu-title');
    const sub = subMenu.find('.co-menu__sub');

    beforeEach(() => {
      // visible 已经是计算属性
      wrapper.setData({ openSubMenus: [] });
    });

    it('click', () => {
      wrapper.setData({ mode: 'inline' });
      subMenuTitle.trigger('mouseenter');

      expect(subMenu.vm.visible).toBe(false);
      expect(subMenu.classes()).not.toContain('co-menu__submenu--open');
      expect(sub.isVisible()).toBe(false);

      subMenuTitle.trigger('click');

      expect(subMenu.vm.visible).toBe(true);
      expect(subMenu.classes()).toContain('co-menu__submenu--open');
      wrapper.vm.$nextTick(() => {
        expect(sub.isVisible()).toBe(true);
      });
    });

    it('非 inline 模式下只会触发 hover 效果', () => {
      wrapper.setData({ mode: 'horizontal' });
      subMenuTitle.trigger('click');

      expect(subMenu.vm.visible).toBe(false);

      subMenuTitle.trigger('mouseenter');

      expect(subMenu.vm.visible).toBe(true);

      subMenuTitle.trigger('mouseleave');

      expect(subMenu.vm.visible).toBe(false);
    });
  });
});
