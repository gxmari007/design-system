import { Meta, Story } from '@storybook/vue3';

import Button from './button.vue';

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    type: {
      options: ['default', 'primary', 'dashed', 'text', 'link'],
      control: { type: 'select' },
    },
  },
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
  default: 'Default Button',
};

export const Primary = Template.bind({});
Primary.args = {
  type: 'primary',
  default: 'Primary Button',
};

export const Dashed = Template.bind({});
Dashed.args = {
  type: 'dashed',
  default: 'Dashed Button',
};

export const Text = Template.bind({});
Text.args = {
  type: 'text',
  default: 'Text Button',
};

export const Link = Template.bind({});
Link.args = {
  type: 'link',
  default: 'Link Button',
};

export const Disabled: Story = (args) => ({
  components: {
    [Button.name]: Button,
  },
  setup() {
    return { args };
  },
  template: `
    <div>
      <v-button type="primary">Primary</v-button>
      <v-button type="primary" disabled>Primary(disabled)</v-button>
    </div>
    <div>
      <v-button>Default</v-button>
      <v-button disabled>Default(disabled)</v-button>
    </div>
  `,
});
