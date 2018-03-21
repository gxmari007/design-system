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
          <co-sub-menu name="sub1">
            <template slot="title">sub menu title</template>
            <co-menu-item name="1">menu item</co-menu-item>
            <co-menu-item name="2">menu item</co-menu-item>
          </co-sub-menu>
        `,
      },
      localVue,
    });
    const subMenu = wrapper.find(CoSubMenu);

    expect(subMenu.classes()).toContain('co-menu__submenu');
    expect(subMenu.classes()).toContain('co-menu__submenu--inline');
  });

  it('title slot', () => {
    const wrapper = shallow(CoMenu, {
      slots: {
        default: `
          <co-sub-menu>
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
      slots: {
        default: `
          <co-sub-menu disabled>
            <template slot="title">sub menu title</template>
          </co-sub-menu>
        `,
      },
      localVue,
    });
    const subMenu = wrapper.find(CoSubMenu);

    expect(subMenu.classes()).toContain('co-menu__submenu--disabled');
  });

  it('name prop', () => {
    const wrapper = shallow(CoMenu, {
      slots: {
        default: `
          <co-sub-menu name="0">
            <template slot="title">sub menu title</template>
          </co-sub-menu>
        `,
      },
      localVue,
    });
    const subMenu = wrapper.find(CoSubMenu);

    expect(subMenu.props().name).toBe('0');
  });

  it('在 inline 模式下点击标题可以展开或收起组件', () => {
    const wrapper = shallow(CoMenu, {
      propsData: { mode: 'inline' },
      slots: {
        default: `
          <co-sub-menu name="sub1">
            <template slot="title">sub menu title</template>
            <co-menu-item name="1">menu item</co-menu-item>
            <co-menu-item name="2">menu item</co-menu-item>
          </co-sub-menu>
        `,
      },
      localVue,
    });

    console.log(wrapper.html());
  });
});
