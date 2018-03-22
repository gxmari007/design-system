import { shallow } from '@vue/test-utils';
import { createRenderer } from 'vue-server-renderer';
import CoIcon from '@/components/icon';

describe('CoIcon', () => {
  it('type prop', () => {
    const wrapper = shallow(CoIcon, {
      propsData: { type: 'ant-design' },
    });

    expect(wrapper.classes()).toContain('anticon');
    expect(wrapper.classes()).toContain('anticon-ant-design');
  });

  it('spin prop', () => {
    const wrapper = shallow(CoIcon, {
      propsData: {
        type: 'ant-design',
        spin: true,
      },
    });

    expect(wrapper.classes()).toContain('anticon-spin');
  });

  it('match snapshot', () => {
    const renderer = createRenderer();
    const wrapper = shallow(CoIcon, {
      propsData: { type: 'ant-design' },
    });

    renderer.renderToString(wrapper.vm, (err, str) => {
      if (err) throw new Error(err);
      expect(str).toMatchSnapshot();
    });
  });
});
