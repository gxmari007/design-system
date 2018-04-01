import { shallow, createLocalVue } from '@vue/test-utils';
import CoMenu from '@/components/menu';

const { CoItemGroup, CoMenuItem } = CoMenu;

describe('CoItemGroup', () => {
  it('default render', () => {
    const localVue = createLocalVue();

    localVue.component(CoItemGroup.name, CoItemGroup);
    localVue.component(CoMenuItem.name, CoMenuItem);

    const wrapper = shallow(CoMenu, {
      slots: {
        default: `
          <co-item-group>
            <span slot="title">Item 1</span>
            <co-menu-item name="0"></co-menu-item>
          </co-item-group>
        `,
      },
      localVue,
    });
    const group = wrapper.find(CoItemGroup);
    const groupTitle = group.find('.co-menu__item-group-title');
    const groupList = group.find('.co-menu__item-group-list');

    expect(group.classes()).toContain('co-menu__item-group');
    expect(groupTitle.exists()).toBe(true);
    expect(groupList.exists()).toBe(true);
  });
});
