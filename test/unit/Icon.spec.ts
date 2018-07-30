import { shallowMount } from '@vue/test-utils';
import CoIcon from '@/components/icon';

describe('CoIcon', () => {
  it('type 属性', () => {
    const wrapper = shallowMount(CoIcon, {
      propsData: { type: 'search' },
    });

    expect(wrapper.classes()).toContain('anticon-search');
  });

  it('spin 属性', () => {
    const wrapper = shallowMount(CoIcon, {
      propsData: {
        type: 'loading',
        spin: true,
      },
    });

    expect(wrapper.classes()).toContain('anticon-spin');
  });

  it('组件名称', () => {
    const wrapper = shallowMount(CoIcon, {
      propsData: { type: 'search' },
    });

    expect(wrapper.name()).toBe('CoIcon');
  });
});
