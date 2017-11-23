import { mount } from 'vue-test-utils'
import { CoButton } from '@/components/button'
// import CoIcon from '@/components/icon'

describe('CoButton', () => {
  it('默认渲染', () => {
    const wrapper = mount(CoButton)

    expect(wrapper.hasClass('co-button')).toBe(true)
    expect(wrapper.is('button')).toBe(true)
  })

  describe('点击按钮', () => {
    it('点击按钮会调用 onClick 函数', () => {
      const mockFn = jest.spyOn(CoButton.methods, 'onClick')
      const wrapper = mount(CoButton)

      wrapper.trigger('click')

      expect(mockFn).toHaveBeenCalled()

      mockFn.mockRestore()
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

// describe('CoButton', () => {
//   it('default render', () => {
//     const wrapper = mount(CoButton)

//     expect(wrapper.hasClass('co-button')).toBe(true)
//     expect(wrapper.is('button')).toBe(true)
//   })

//   describe('type prop', () => {
//     it('default button', () => {
//       const wrapper = mount(CoButton)

//       expect(wrapper.hasClass('co-button')).toBe(true)
//       expect(wrapper.hasClass('co-button--default')).toBe(true)
//     })

//     it('primary button', () => {
//       const wrapper = mount(CoButton, {
//         propsData: {
//           type: 'primary'
//         }
//       })

//       expect(wrapper.hasClass('co-button')).toBe(true)
//       expect(wrapper.hasClass('co-button--primary')).toBe(true)
//     })

//     it('ghost button', () => {
//       const wrapper = mount(CoButton, {
//         propsData: {
//           type: 'ghost'
//         }
//       })

//       expect(wrapper.hasClass('co-button')).toBe(true)
//       expect(wrapper.hasClass('co-button--ghost')).toBe(true)
//     })

//     it('success button', () => {
//       const wrapper = mount(CoButton, {
//         propsData: {
//           type: 'success'
//         }
//       })

//       expect(wrapper.hasClass('co-button')).toBe(true)
//       expect(wrapper.hasClass('co-button--success')).toBe(true)
//     })

//     it('error button', () => {
//       const wrapper = mount(CoButton, {
//         propsData: {
//           type: 'error'
//         }
//       })

//       expect(wrapper.hasClass('co-button')).toBe(true)
//       expect(wrapper.hasClass('co-button--error')).toBe(true)
//     })

//     it('link button', () => {
//       const wrapper = mount(CoButton, {
//         propsData: {
//           type: 'link'
//         }
//       })

//       expect(wrapper.hasClass('co-button')).toBe(true)
//       expect(wrapper.hasClass('co-button--link')).toBe(true)
//     })
//   })

//   describe('size prop', () => {
//     it('small size, small or sm', () => {
//       const wrapper = mount(CoButton, {
//         propsData: {
//           size: 'small'
//         }
//       })

//       expect(wrapper.hasClass('co-button')).toBe(true)
//       expect(wrapper.hasClass('co-button--small')).toBe(true)

//       wrapper.setProps({ size: 'sm' })

//       expect(wrapper.hasClass('co-button--small')).toBe(true)
//     })

//     it('large size, large or lg', () => {
//       const wrapper = mount(CoButton, {
//         propsData: {
//           size: 'large'
//         }
//       })

//       expect(wrapper.hasClass('co-button')).toBe(true)
//       expect(wrapper.hasClass('co-button--large')).toBe(true)

//       wrapper.setProps({ size: 'lg' })

//       expect(wrapper.hasClass('co-button--large')).toBe(true)
//     })
//   })

//   describe('nativeType 属性，控制组件的原生 type 属性', () => {
//     it('默认应该为 button', () => {
//       const wrapper = mount(CoButton)

//       expect(wrapper.hasAttribute('type', 'button')).toBe(true)
//     })

//     it('submit button', () => {
//       const wrapper = mount(CoButton, {
//         propsData: {
//           nativeType: 'submit'
//         }
//       })

//       expect(wrapper.hasAttribute('type', 'submit')).toBe(true)
//     })

//     it('reset button', () => {
//       const wrapper = mount(CoButton, {
//         propsData: {
//           nativeType: 'reset'
//         }
//       })

//       expect(wrapper.hasAttribute('type', 'reset')).toBe(true)
//     })
//   })

//   it('block button', () => {
//     const wrapper = mount(CoButton, {
//       propsData: {
//         block: true
//       }
//     })

//     expect(wrapper.hasClass('co-button')).toBe(true)
//     expect(wrapper.hasClass('co-button--block')).toBe(true)
//   })

//   it('disabled button', () => {
//     const wrapper = mount(CoButton, {
//       propsData: {
//         disabled: true
//       }
//     })

//     expect(wrapper.hasAttribute('disabled', 'disabled')).toBe(true)
//   })

//   it('loading button', () => {
//     const wrapper = mount(CoButton, {
//       propsData: {
//         loading: true
//       }
//     })

//     expect(wrapper.hasClass('co-button')).toBe(true)
//     expect(wrapper.hasClass('co-button--loading')).toBe(true)
//     expect(wrapper.contains(CoIcon)).toBe(true)

//     const icon = wrapper.find(CoIcon)

//     expect(icon.hasProp('type', 'load-c')).toBe(true)
//   })

//   describe('icon prop', () => {
//     it('set icon prop', () => {
//       const wrapper = mount(CoButton, {
//         propsData: {
//           icon: 'coffee'
//         }
//       })
//       const icon = wrapper.find(CoIcon)

//       expect(wrapper.contains(CoIcon)).toBe(true)
//       expect(icon.hasProp('type', 'coffee')).toBe(true)
//     })

//     it('如果同时设置 icon 和 loading 属性，则 loading 的优先级更高', () => {
//       const wrapper = mount(CoButton, {
//         propsData: {
//           loading: true,
//           icon: 'coffee'
//         }
//       })
//       const icons = wrapper.findAll(CoIcon)

//       expect(wrapper.contains(CoIcon)).toBe(true)
//       expect(icons.length).toBe(1)

//       const icon = icons.at(0)

//       expect(icon.hasProp('type', 'load-c')).toBe(true)
//     })
//   })

//   it('点击按钮会触发点击效果并添加 clicked 类', () => {
//     const spy = sinon.spy(CoButton.methods, 'onClick')
//     const clock = sinon.useFakeTimers()
//     const wrapper = mount(CoButton)

//     wrapper.trigger('click')

//     expect(spy.calledOnce).toBe(true)
//     expect(wrapper.hasClass('co-button--clicked')).toBe(true)

//     clock.next()

//     wrapper.update()
//     console.log(wrapper.html())
//     expect(wrapper.hasClass('co-button--clicked')).not.toBe(true)

//     spy.restore()
//     clock.restore()
//   })
// })
