<template>
  <form :class="classes">
    <slot></slot>
  </form>
</template>

<script>
// utils
import { oneOf } from 'utils/help';

const prefixClass = 'co-form';

export default {
  name: 'co-form',
  props: {
    // 表单数据对象
    model: Object,
    // 表单验证规则
    rules: Object,
    // 是否开启行内表单
    inline: {
      type: Boolean,
      default: false,
    },
    // 表单项标签的位置
    labelPosition: {
      type: String,
      default: 'right',
      validator(val) {
        return oneOf(val, ['left', 'right', 'top']);
      },
    },
    // 表单项标签的宽度
    labelWidth: Number,
    // 是否显示错误信息
    showMessage: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      fields: [],
    };
  },
  computed: {
    classes() {
      return [
        prefixClass,
        `${prefixClass}--label-${this.labelPosition}`,
        {
          [`${prefixClass}--inline`]: this.inline,
        },
      ];
    },
  },
  created() {
    this.$on('add-form-item', (field) => {
      if (field) {
        this.fields.push(field);
      }
    });

    this.$on('remove-form-item', (field) => {
      if (field) {
        const { fields } = this;

        fields.splice(fields.indexOf(field), 1);
      }
    });
  },
  methods: {
    // 验证所有规则
    validate(cb) {
      let valid = true;
      let lastIndex = this.fields.length - 1;

      this.fields.forEach((field, index) => {
        field.validate('', (error) => {
          if (error) {
            valid = false
          }

          if (index === lastIndex && typeof cb === 'function') {
            cb(valid);
          }
        });
      });
    },
    // 验证单个表单项
    validateField(prop, cb) {
      const field = this.fields.filter(field => field.prop === prop)[0];

      if (!field) {
        throw new Error('[coview error] Please check that the incoming prop from <co-form-item> is correct!');
      }

      field.validate('', cb);
    },
    // 重置所有规则
    resetFields() {
      this.fields.forEach(field => {
        field.resetField();
      });
    },
  },
};
</script>
