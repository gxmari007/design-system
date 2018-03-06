import { shallow } from '@vue/test-utils';
import CoRow from '@/components/row';

describe('CoRow 组件', () => {
  it('default render', () => {
    const wrapper = shallow(CoRow);

    expect(wrapper.classes()).toEqual(['co-row']);
  });

  it('type prop', () => {
    const wrapper = shallow(CoRow, {
      propsData: { type: 'flex' },
    });

    expect(wrapper.classes()).toEqual(['co-row-flex']);
  });

  it('align prop', () => {
    const wrapper = shallow(CoRow, {
      propsData: { align: 'top' },
    });

    expect(wrapper.classes()).not.toContain('co-row-flex--top');
    wrapper.setProps({ type: 'flex', align: 'top' });
    expect(wrapper.classes()).toContain('co-row-flex--top');
  });

  it('justify prop', () => {
    const wrapper = shallow(CoRow, {
      propsData: { justify: 'start' },
    });

    expect(wrapper.classes()).not.toContain('co-row-flex--start');
    wrapper.setProps({ type: 'flex', justify: 'start' });
    expect(wrapper.classes()).toContain('co-row-flex--start');
  });

  it('gutter prop', () => {
    const wrapper = shallow(CoRow, {
      propsData: { gutter: 16 },
    });

    expect(wrapper.element.style.marginLeft).toBe('-8px');
    expect(wrapper.element.style.marginRight).toBe('-8px');
    // 需要 gutter 属性为对象的 e2e 测试
  });
});
