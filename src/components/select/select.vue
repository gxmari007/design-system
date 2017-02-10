<template>
  <div :class="classes" v-clickoutside="closeDropdown">
    <div class="co-select__wrap" ref="reference" @click="show = !show">
      <span class="co-select__value" v-if="isSelected">{{ model }}</span>
      <span class="co-select__placeholder" v-else>{{ placeholder }}</span>
      <co-icon class="co-select__arrow" type="arrow_drop_down"></co-icon>
      <co-icon class="co-select__clear" v-if="clearable" type="cancel" @click.native.stop="clearModel"></co-icon>
    </div>
    <co-select-dropdown :show="show">
      <slot></slot>
    </co-select-dropdown>
  </div>
</template>

<script>
// components
import CoIcon from 'components/icon';
import CoSelectDropdown from './select-dropdown';
// utils
import { oneOf } from 'utils/help';
// directives
import clickoutside from 'directives/clickoutside';
// libs
import listen from 'dom-helpers/events/listen';

const prefixClass = 'co-select';

export default {
  name: 'co-select',
  componentName: 'co-select',
  directives: { clickoutside },
  props: {
    // v-model
    value: null,
    // 尺寸大小
    size: {
      type: String,
      validator(val) {
        return oneOf(val, ['small', 'large']);
      },
    },
    // 占位提示文本
    placeholder: {
      type: String,
      default: '请选择',
    },
    // 是否可以清空选项
    clearable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // 控制下拉菜单显示或隐藏
      show: false,
      // keydown 事件解绑
      keydownOff: null,
      // 所有 option 的 value 集合
      values: [],
    };
  },
  computed: {
    classes() {
      return {
        [prefixClass]: true,
        [`${prefixClass}--${this.size}`]: this.size !== undefined,
        [`${prefixClass}--focus`]: this.show,
        [`${prefixClass}--clearable`]: this.clearable,
      };
    },
    // select 选中的值
    model() {
      if (this.isSelected) {
        return this.value;
      }

      return '';
    },
    // 是否有值被选中
    isSelected() {
      return this.values.indexOf(this.value) > -1;
    },
  },
  created() {
    this.$on('select-option', this.onSelectOption);
    this.keydownOff = listen(document, 'keydown', this.onKeydown);
  },
  beforeDestroy() {
    if (this.keydownOff) {
      this.keydownOff();
    }
  },
  methods: {
    closeDropdown() {
      this.show = false;
    },
    onSelectOption(value) {
      this.$emit('input', value);
      this.show = false;
    },
    onKeydown(e) {
      if (this.show) {
        // 按下 esc 关闭 select 目录
        if (e.keyCode === 27) {
          this.show = false;
        }
      }
    },
    // 清空选中的值
    clearModel() {
      this.show = false;
      this.$emit('input', '');
    },
  },
  components: {
    CoIcon,
    CoSelectDropdown,
  },
};
</script>
