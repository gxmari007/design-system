import { shallow } from 'vue-test-utils';
import { createRenderer } from 'vue-server-renderer';
import CoIcon from '@/components/icon';

describe('CoIcon', () => {
  it('type prop', () => {
    const wrapper = shallow(CoIcon, {
      propsData: { type: 'ant-design' },
    });

    expect(wrapper.hasClass('anticon')).toBe(true);
    expect(wrapper.hasClass('anticon-ant-design')).toBe(true);
  });

  it('spin prop', () => {
    const wrapper = shallow(CoIcon, {
      propsData: { spin: true },
    });

    expect(wrapper.hasClass('anticon-spin')).toBe(true);
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
