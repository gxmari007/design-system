import { shallow, createLocalVue } from '@vue/test-utils';
import CoMenu from '@/components/menu';

const { CoSubMenu } = CoMenu;

describe('CoSubMenu', () => {
  const localVue = createLocalVue();

  localVue.component(CoSubMenu.name, CoSubMenu);

  it('default render', () => {
    const wrapper = shallow(CoMenu, {
      propsData: { mode: 'inline' },
      slots: {
        default: '<co-sub-menu>sub menu</co-sub-menu>',
      },
      localVue,
    });
    const subMenu = wrapper.find(CoSubMenu);

    expect(subMenu.classes()).toContain('co-menu__submenu');
    expect(subMenu.classes()).toContain('co-menu__submenu--inline');
    expect(subMenu.text()).toBe('sub menu');
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
});
