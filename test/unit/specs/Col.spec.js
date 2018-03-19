import { shallow } from '@vue/test-utils';
import CoCol from '@/components/col';
import CoRow from '@/components/row';

describe('CoCol 组件', () => {
  it('span prop', () => {
    const wrapper = shallow(CoCol, {
      propsData: { span: 6 },
    });

    expect(wrapper.classes()).toContain('co-col-6');
  });

  it('offset prop', () => {
    const wrapper = shallow(CoCol, {
      propsData: { offset: 6 },
    });

    expect(wrapper.classes()).toContain('co-col-offset-6');
  });

  it('order prop', () => {
    const wrapper = shallow(CoCol, {
      propsData: { order: 6 },
    });

    expect(wrapper.classes()).toContain('co-col-order-6');
  });

  it('pull prop', () => {
    const wrapper = shallow(CoCol, {
      propsData: { pull: 6 },
    });

    expect(wrapper.classes()).toContain('co-col-pull-6');
  });

  it('push prop', () => {
    const wrapper = shallow(CoCol, {
      propsData: { push: 6 },
    });

    expect(wrapper.classes()).toContain('co-col-push-6');
  });

  it('嵌套在 CoRow 组件中应该根据 gutter 属性来设置 padding', () => {
    const wrapper = shallow(CoRow, {
      propsData: { gutter: 16 },
      slots: {
        default: CoCol,
      },
    });
    const col = wrapper.find(CoCol);

    expect(col.element.style.paddingRight).toBe('8px');
    expect(col.element.style.paddingLeft).toBe('8px');
  });

  it('xs, sm, md, lg, xl, xxl prop', () => {
    const wrapper = shallow(CoCol, {
      propsData: { xs: 6 },
    });

    expect(wrapper.classes()).toContain('co-col-xs-6');

    wrapper.setProps({ xs: { span: 8, offset: 6 } });

    expect(wrapper.classes()).toContain('co-col-xs-8');
    expect(wrapper.classes()).toContain('co-col-xs-offset-6');
  });
});
