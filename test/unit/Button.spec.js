import { shallowMount, mount } from '@vue/test-utils';
import CoButton from '@/components/button';
import CoIcon from '@/components/icon';

describe('CoButton', () => {
  it('组件名称', () => {
    const wrapper = shallowMount(CoButton);

    expect(wrapper.name()).toBe('CoButton');
  });

  it('slot 渲染', () => {
    const wrapper = shallowMount(CoButton, {
      slots: {
        default: 'button',
      },
    });

    expect(wrapper.text()).toBe('button');
    expect(wrapper.contains('span')).toBe(true);
  });

  it('ghost 属性', () => {
    const wrapper = shallowMount(CoButton, {
      propsData: {
        ghost: true,
      },
    });

    // 判断是否含有 ghost 相关 class
    expect(wrapper.classes()).toContain('co-button--ghost');
  });

  it('href 属性', () => {
    const wrapper = shallowMount(CoButton, {
      propsData: {
        href: 'https://www.google.com/',
      },
    });

    // 判断根 DOM 节点是否为 a 标签
    expect(wrapper.is('a')).toBe(true);
    // 判断 href 属性是否添加到根节点上
    expect(wrapper.attributes().href).toBe('https://www.google.com/');
  });

  it('htmlType 属性', () => {
    const wrapper = shallowMount(CoButton);

    // 判断默认 type 属性
    expect(wrapper.attributes().type).toBe('button');
    // 改变 htmlType 属性
    wrapper.setProps({ htmlType: 'submit' });
    // 判断属性变化之后的 type 值
    expect(wrapper.attributes().type).toBe('submit');
  });

  it('icon 属性', () => {
    const wrapper = shallowMount(CoButton, {
      propsData: { icon: 'search' },
    });

    expect(wrapper.contains(CoIcon)).toBe(true);
  });

  it('loading 属性', () => {
    const wrapper = mount(CoButton, {
      propsData: { loading: true },
    });
    const iconWrapper = wrapper.find(CoIcon);

    expect(iconWrapper.exists()).toBe(true);
    expect(iconWrapper.props().spin).toBe(true);
  });

  it('disabled 属性', () => {
    const wrapper = shallowMount(CoButton, {
      propsData: { disabled: true },
    });

    // 判断 disabled 属性是否存在
    expect(wrapper.attributes().disabled).toBe('disabled');
  });

  it('shape 属性', () => {
    const wrapper = shallowMount(CoButton, {
      propsData: { shape: 'circle' },
    });

    expect(wrapper.classes()).toContain('co-button--circle');
  });

  it('size 属性', () => {
    const wrapper = shallowMount(CoButton, {
      propsData: { size: 'small' },
    });

    // 判断组件尺寸 class 是否生效
    expect(wrapper.classes()).toContain('co-button--small');
  });

  it('target 属性', () => {
    const wrapper = shallowMount(CoButton, {
      propsData: {
        href: 'https://www.google.com/',
        target: '_blank',
      },
    });

    expect(wrapper.attributes().target).toBe('_blank');
  });

  it('type 属性', () => {
    const wrapper = shallowMount(CoButton, {
      propsData: { type: 'primary' },
    });

    expect(wrapper.classes()).toContain('co-button--primary');
  });

  it('按钮的点击特效', () => {
    const wrapper = shallowMount(CoButton);

    jest.useFakeTimers();

    wrapper.trigger('click');
    // 判断组件是否有点击特效相关的 class
    expect(wrapper.classes()).toContain('co-button--clicked');
    // 判断组件是否调用了 setTimeout
    expect(setTimeout).toHaveBeenCalledTimes(1);

    // 模拟时间穿梭
    jest.advanceTimersByTime(400);

    // 判断点击特效是否结束
    expect(wrapper.classes()).not.toContain('co-button--clicked');
  });
});
