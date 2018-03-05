import { shallow, mount } from '@vue/test-utils';
import { CoButton } from '@/components/button';
import CoIcon from '@/components/icon';

describe('CoButton', () => {
  it('slot render', () => {
    const wrapper = shallow(CoButton, {
      slots: { default: 'button' },
    });

    expect(wrapper.text()).toBe('button');
  });

  it('ghost prop', () => {
    const wrapper = shallow(CoButton, {
      propsData: { ghost: true },
    });

    expect(wrapper.hasClass('co-button--ghost')).toBe(true);
  });

  it('html-type prop', () => {
    const wrapper = shallow(CoButton);

    expect(wrapper.hasAttribute('type', 'button')).toBe(true);

    wrapper.setProps({ htmlType: 'submit' });
    expect(wrapper.hasAttribute('type', 'submit')).toBe(true);
  });

  it('icon prop', () => {
    const wrapper = mount(CoButton, {
      propsData: { icon: 'search' },
    });
    const icon = wrapper.find(CoIcon);

    expect(icon.exists()).toBe(true);
    expect(icon.hasClass('anticon-search')).toBe(true);
  });

  describe('loading prop', () => {
    it('default render', () => {
      const wrapper = mount(CoButton, {
        propsData: { loading: true },
      });
      const icon = wrapper.find(CoIcon);

      expect(wrapper.hasClass('co-button--loading')).toBe(true);
      expect(icon.exists()).toBe(true);
      expect(icon.hasClass('anticon-loading')).toBe(true);
      expect(icon.hasClass('anticon-spin')).toBe(true);
    });

    // it('设置 { delay: number } 可以');

    it('当设置了 icon 属性时，再设置 loading，则 loading 图标优先显示', () => {
      const wrapper = mount(CoButton, {
        propsData: {
          icon: 'search',
          loading: true,
        },
      });
      const icons = wrapper.findAll(CoIcon);

      expect(icons.length).toBe(1);
      expect(icons.at(0).hasClass('anticon-loading')).toBe(true);
    });
  });

  it('shape prop', () => {
    const wrapper = shallow(CoButton, {
      propsData: { shape: 'circle' },
    });

    expect(wrapper.hasClass('co-button--circle')).toBe(true);
  });

  it('size prop', () => {
    const wrapper = shallow(CoButton, {
      propsData: { size: 'small' },
    });

    expect(wrapper.hasClass('co-button--small')).toBe(true);
  });

  it('type prop', () => {
    const wrapper = shallow(CoButton);

    expect(wrapper.hasClass('co-button')).toBe(true);

    wrapper.setProps({ type: 'primary' });
    expect(wrapper.hasClass('co-button--primary')).toBe(true);
  });

  it('href prop', () => {
    const wrapper = shallow(CoButton, {
      propsData: { href: '/' },
    });

    expect(wrapper.is('a')).toBe(true);
    expect(wrapper.element.getAttribute('href')).toBe('/');
  });

  it('target prop', () => {
    const wrapper = shallow(CoButton, {
      propsData: { target: '_blank' },
    });

    expect(wrapper.element.getAttribute('target')).toBe(null);
    wrapper.setProps({ href: '/' });
    expect(wrapper.element.getAttribute('target')).toBe('_blank');
  });

  it('disabled prop', () => {
    const wrapper = shallow(CoButton, {
      propsData: { disabled: true },
    });

    expect(wrapper.attributes().disabled).toBe('disabled');
  });

  it('点击按钮会产生点击效果', () => {
    jest.useFakeTimers();

    const mockFn = jest.spyOn(CoButton.methods, 'onClick');
    const buttonWrapper = shallow(CoButton);
    const linkWrapper = shallow(CoButton, {
      propsData: { href: '/' },
    });

    buttonWrapper.trigger('click');
    linkWrapper.trigger('click');

    expect(buttonWrapper.hasClass('co-button--clicked')).toBe(true);
    expect(mockFn).toHaveBeenCalled();
    expect(linkWrapper.hasClass('co-button--clicked')).toBe(false);

    jest.runAllTimers();
    buttonWrapper.update();

    expect(buttonWrapper.hasClass('co-button--clicked')).toBe(false);

    mockFn.mockRestore();
    jest.useRealTimers();
  });
});
