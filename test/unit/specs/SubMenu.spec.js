import { shallow, createLocalVue } from '@vue/test-utils';
import CoMenu from '@/components/menu';

const { CoSubMenu } = CoMenu;

describe('CoSubMenu', () => {
  const localVue = createLocalVue();

  localVue.component(CoSubMenu.name, CoSubMenu);

  it('default render', () => {
    const wrapper = shallow(CoMenu, {
      slots: {
        default: '<co-sub-menu />',
      },
      localVue,
    });
    const item = wrapper.find(CoSubMenu);

    expect(item.classes()).toContain('co-menu__submenu');
    expect(item.classes()).toContain('co-menu__submenu--vertical');
  });
});
