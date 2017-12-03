import { mount } from 'vue-test-utils'
import { CoButton } from '@/components/button'
import CoIcon from '@/components/icon'

describe('CoButton', () => {
  it('默认渲染', () => {
    const wrapper = mount(CoButton)

    expect(wrapper.hasClass('co-button')).toBe(true)
    expect(wrapper.is('button')).toBe(true)
  })

  describe('type prop', () => {
    it('default button', () => {
      const wrapper = mount(CoButton)

      expect(wrapper.hasClass('co-button')).toBe(true)
      expect(wrapper.hasClass('co-button--default')).toBe(true)
    })

    it('primary button', () => {
      const wrapper = mount(CoButton, {
        propsData: {
          type: 'primary'
        }
      })

      expect(wrapper.hasClass('co-button')).toBe(true)
      expect(wrapper.hasClass('co-button--primary')).toBe(true)
    })

    it('ghost button', () => {
      const wrapper = mount(CoButton, {
        propsData: {
          type: 'ghost'
        }
      })

      expect(wrapper.hasClass('co-button')).toBe(true)
      expect(wrapper.hasClass('co-button--ghost')).toBe(true)
    })

    it('success button', () => {
      const wrapper = mount(CoButton, {
        propsData: {
          type: 'success'
        }
      })

      expect(wrapper.hasClass('co-button')).toBe(true)
      expect(wrapper.hasClass('co-button--success')).toBe(true)
    })

    it('error button', () => {
      const wrapper = mount(CoButton, {
        propsData: {
          type: 'error'
        }
      })

      expect(wrapper.hasClass('co-button')).toBe(true)
      expect(wrapper.hasClass('co-button--error')).toBe(true)
    })

    it('link button', () => {
      const wrapper = mount(CoButton, {
        propsData: {
          type: 'link'
        }
      })

      expect(wrapper.hasClass('co-button')).toBe(true)
      expect(wrapper.hasClass('co-button--link')).toBe(true)
    })
  })

  describe('size prop', () => {
    it('small button', () => {
      const wrapper = mount(CoButton, {
        propsData: {
          size: 'small'
        }
      })

      expect(wrapper.hasClass('co-button--small')).toBe(true)

      wrapper.setProps({ size: 'sm' })

      expect(wrapper.hasClass('co-button--small')).toBe(true)
    })

    it('large button', () => {
      const wrapper = mount(CoButton, {
        propsData: { size: 'large' }
      })

      expect(wrapper.hasClass('co-button--large')).toBe(true)

      wrapper.setProps({ size: 'lg' })

      expect(wrapper.hasClass('co-button--large')).toBe(true)
    })
  })

  describe('native-type prop', () => {
    it('默认原生 type 属性应该为 button', () => {
      const wrapper = mount(CoButton)

      expect(wrapper.hasAttribute('type', 'button')).toBe(true)
    })

    it('设置 native-type 为 submit', () => {
      const wrapper = mount(CoButton, {
        propsData: { nativeType: 'submit' }
      })

      expect(wrapper.hasAttribute('type', 'submit')).toBe(true)
    })

    it('设置 native-type 为 reset', () => {
      const wrapper = mount(CoButton, {
        propsData: { nativeType: 'reset' }
      })

      expect(wrapper.hasAttribute('type', 'reset')).toBe(true)
    })
  })

  it('block prop', () => {
    const wrapper = mount(CoButton, {
      propsData: { block: true }
    })

    expect(wrapper.hasClass('co-button--block')).toBe(true)
  })

  it('disabled prop', () => {
    const wrapper = mount(CoButton, {
      propsData: { disabled: true }
    })

    expect(wrapper.hasAttribute('disabled', 'disabled')).toBe(true)

    wrapper.trigger('click')

    expect(wrapper.hasClass('co-button--clicked')).toBe(false)
  })

  describe('loading prop', () => {
    let wrapper

    beforeAll(() => {
      wrapper = mount(CoButton, {
        propsData: { loading: true }
      })
    })

    afterAll(() => {
      wrapper.destroy()
    })

    it('loading 按钮应该有一个加载图标', () => {
      const icons = wrapper.findAll(CoIcon)

      expect(icons.length).toBe(1)

      const loadingIcon = icons.at(0)

      expect(wrapper.hasClass('co-button--loading')).toBe(true)
      expect(loadingIcon.hasProp('type', 'load-c')).toBe(true)
      expect(loadingIcon.hasClass('co-button__loading')).toBe(true)
    })

    it('loading 中的按钮无法触发 clicked 效果', () => {
      wrapper.trigger('click')

      expect(wrapper.hasClass('co-button--clicked')).toBe(false)
    })
  })

  describe('icon prop', () => {
    it('设置 icon 属性可以为 button 添加图标', () => {
      const wrapper = mount(CoButton, {
        propsData: { icon: 'edit' }
      })
      const icon = wrapper.find(CoIcon);

      expect(icon.hasProp('type', 'edit')).toBe(true)
    })

    it('同时设置 loading 和 icon 属性，则只会出现 loading 图标', () => {
      const wrapper = mount(CoButton, {
        propsData: {
          loading: true,
          icon: 'edit'
        }
      })
      const icons = wrapper.findAll(CoIcon)

      expect(wrapper.hasClass('co-button--loading')).toBe(true)
      expect(icons.length).toBe(1)
      expect(icons.at(0).hasClass('co-button__loading')).toBe(true)
    })
  })

  describe('点击按钮', () => {
    it('点击按钮会调用 onClick 函数', () => {
      const mockFn = jest.spyOn(CoButton.methods, 'onClick')
      const wrapper = mount(CoButton)

      wrapper.trigger('click')

      expect(mockFn).toHaveBeenCalled()

      mockFn.mockRestore()
    })

    it('link 按钮不会触发点击效果', () => {
      const wrapper = mount(CoButton, {
        propsData: { type: 'link' }
      })

      wrapper.trigger('click')

      expect(wrapper.hasClass('co-button--clicked')).toBe(false)
    })

    it('点击按钮会添加 co-button--clicked 类，并在 400ms 后移除', () => {
      const wrapper = mount(CoButton)

      jest.useFakeTimers()

      wrapper.trigger('click')

      expect(wrapper.hasClass('co-button')).toBe(true)
      expect(wrapper.hasClass('co-button--clicked')).toBe(true)

      jest.runAllTimers()
      wrapper.update()

      expect(setTimeout.mock.calls.length).toBe(1)
      expect(setTimeout.mock.calls[0][1]).toBe(400)
      expect(wrapper.hasClass('co-button--clicked')).toBe(false)

      jest.useRealTimers()
    })
  })
})
