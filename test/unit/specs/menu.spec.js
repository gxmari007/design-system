import { shallow } from '@vue/test-utils';
import CoMenu from '@/components/menu';

describe('CoMenu', () => {
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

  it('default-selected-keys prop', () => {
  });
});
