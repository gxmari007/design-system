import { Meta, Story } from '@storybook/vue3';

import Button from './button.vue';

export default {
  title: 'Button',
  component: Button,
} as Meta;

const Template: Story = (args) => ({
  components: {
    [Button.name]: Button,
  },
  setup() {
    return { args };
  },
  template: '<v-button v-bind="args">{{ args.default }}</v-button>',
});

export const Default = Template.bind({});
Default.args = {
  type: 'default',
  default: 'Default',
};

export const Primary = Template.bind({});
Primary.args = {
  type: 'primary',
  default: 'Primary',
};
