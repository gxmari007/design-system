import { mount } from 'vue-test-utils'
import { CoLayout, CoHeader, CoAside, CoMain, CoFooter } from '@/components/layout'

describe('CoLayout', () => {
  test('default render', () => {
    const wrapper = mount(CoLayout)

    expect(wrapper.hasClass('co-layout')).toBe(true)
    expect(wrapper.is('section')).toBe(true)
  })

  test('设置 direction 属性控制子元素排列方向', () => {
    const wrapper = mount(CoLayout, {
      propsData: {
        direction: 'vertical'
      }
    })

    expect(wrapper.hasClass('co-layout--vertical')).toBe(true)
  })

  test('如果包含 co-header 或者 co-footer 子组件，则默认垂直排列', () => {
    const wrapper1 = mount(CoLayout, {
      slots: {
        default: [CoHeader, CoFooter]
      }
    })
    const wrapper2 = mount(CoLayout, {
      slots: {
        default: '<div />'
      }
    })

    expect(wrapper1.hasClass('co-layout--vertical')).toBe(true)
    expect(wrapper2.hasClass('co-layout--vertical')).not.toBe(true)
  })

  test('direction 属性的优先级应该最高', () => {
    const wrapper = mount(CoLayout, {
      propsData: {
        direction: 'horizontal'
      },
      slots: {
        default: [CoHeader, CoFooter]
      }
    })

    expect(wrapper.hasClass('co-layout--vertical')).not.toBe(true)
  })
})

describe('CoHeader', () => {
  test('default render', () => {
    const wrapper = mount(CoHeader)

    expect(wrapper.hasClass('co-header')).toBe(true)
    expect(wrapper.is('header')).toBe(true)
    expect(wrapper.name()).toBe('CoHeader')
  })

  test('设置 height 属性，可以控制组件高度，默认为 60px', () => {
    const wrapper = mount(CoHeader)

    expect(wrapper.hasProp('height', 60)).toBe(true)
    expect(wrapper.hasAttribute('style', 'height: 60px;')).toBe(true)

    wrapper.setProps({ height: 100 })

    expect(wrapper.hasProp('height', 100)).toBe(true)
    expect(wrapper.hasAttribute('style', 'height: 100px;')).toBe(true)
  })
})

describe('CoMain', () => {
  test('default render', () => {
    const wrapper = mount(CoMain)

    expect(wrapper.hasClass('co-main')).toBe(true)
    expect(wrapper.is('main')).toBe(true)
    expect(wrapper.name()).toBe('CoMain')
  })
})

describe('CoAside', () => {
  test('default render', () => {
    const wrapper = mount(CoAside)

    expect(wrapper.hasClass('co-aside')).toBe(true)
    expect(wrapper.name()).toBe('CoAside')
    expect(wrapper.is('aside')).toBe(true)
  })

  test('设置 width 属性，可以控制组件宽度，默认值为 300', () => {
    const wrapper = mount(CoAside)

    expect(wrapper.hasProp('width', 300)).toBe(true)
    expect(wrapper.hasAttribute('style', 'width: 300px;')).toBe(true)

    wrapper.setProps({ width: 100 })

    expect(wrapper.hasProp('width', 100)).toBe(true)
    expect(wrapper.hasAttribute('style', 'width: 100px;')).toBe(true)
  })
})

describe('CoFooter', () => {
  test('default render', () => {
    const wrapper = mount(CoFooter)

    expect(wrapper.hasClass('co-footer')).toBeTruthy()
    expect(wrapper.name()).toBe('CoFooter')
    expect(wrapper.is('footer')).toBe(true)
  })

  test('设置 height 属性，可以控制组件的高度，默认值为 60', () => {
    const wrapper = mount(CoFooter)

    expect(wrapper.hasProp('height', 60)).toBe(true)
    expect(wrapper.hasAttribute('style', 'height: 60px;')).toBe(true)

    wrapper.setProps({ height: 100 })

    expect(wrapper.hasProp('height', 100)).toBe(true)
    expect(wrapper.hasAttribute('style', 'height: 100px;')).toBe(true)
  })
})
