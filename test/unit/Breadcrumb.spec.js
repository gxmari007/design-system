import { shallowMount, mount, createLocalVue } from '@vue/test-utils';
import CoBreadcrumb from '@/components/breadcrumb';

const CoBreadcrumbItem = CoBreadcrumb.Item;

describe('CoBreadcrumb', () => {
  const localVue = createLocalVue();

  localVue.component(CoBreadcrumbItem.name, CoBreadcrumbItem);

  it('组件名称应该为 CoBreadcrumb', () => {
    const wrapper = shallowMount(CoBreadcrumb);

    expect(wrapper.name()).toBe('CoBreadcrumb');
  });

  it('separator 属性', () => {
    const wrapper = shallowMount(CoBreadcrumb);

    expect(wrapper.props().separator).toBe('/');
  });

  it('CoBreadcrumbItem 可以获取到 CoBreadcrumb 的 separator 属性', () => {
    const wrapper = mount(CoBreadcrumb, {
      propsData: { separator: '>' },
      slots: {
        default: [
          '<co-breadcrumb-item>Home</co-breadcrumb-item>',
          '<co-breadcrumb-item>Application Center</co-breadcrumb-item>',
        ],
      },
      localVue,
    });
    const itemsWrapper = wrapper.findAll(CoBreadcrumbItem);

    expect(itemsWrapper.length).toBe(2);
    expect(itemsWrapper.at(0).vm.separator).toBe('>');
  });
});
