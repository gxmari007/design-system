<template>
  <div :class="classes" v-clickoutside="closeDropdown">
    <div class="co-select__trigger" ref="reference" @mouseenter="onMouseenter" @mouseleave="onMouseleave">
      <co-icon
        v-if="clearable"
        v-show="clearShow"
        class="co-select__clear"
        type="ios-close"
        @click.native="clearModel"></co-icon>
      <co-input
        ref="input"
        class="co-select__input"
        v-model="label"
        :icon="icon"
        :placeholder="placeholder"
        :disabled="disabled"
        readonly
        @click.native="switchDropdown"></co-input>
    </div>
    <transition name="co-slide">
      <div
        v-show="visible"
        class="co-select__dropdown"
        :style="dropdownStyles"
        ref="popper">
        <ul class="co-select__list">
          <slot></slot>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
// components
import CoInput from 'components/input';
import CoIcon from 'components/icon';
// utils
import { oneOf } from 'utils/help';
// directives
import clickoutside from 'directives/clickoutside';
// libs
import listen from 'dom-helpers/events/listen';
// mixins
import popper from 'mixins/popper';

export default {
  name: 'co-select',
  componentName: 'co-select',
  mixins: [popper],
  directives: {
    clickoutside,
  },
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
    // 是否禁用 select
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // keydown 事件解绑
      keydownOff: null,
      // 所有 option 集合
      childs: [],
      width: 0,
      clearShow: false,
    };
  },
  computed: {
    classes() {
      const prefixClass = 'co-select';

      return {
        [prefixClass]: true,
        [`${prefixClass}--${this.size}`]: this.size !== undefined,
        [`${prefixClass}--open`]: this.visible,
      };
    },
    dropdownStyles() {
      const styles = {};

      if (this.width > 0) {
        styles.width = `${this.width}px`;
      }

      return styles;
    },
    model: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
        this.$emit('on-change', val);
      },
    },
    label() {
      if (this.isSelected) {
        return this.childs.find(child => child.value === this.model).label;
      }

      return '';
    },
    // 是否有值被选中
    isSelected() {
      return this.childs.some(child => child.value === this.model);
    },
    icon() {
      return this.clearShow ? null : 'arrow-down-b';
    },
  },
  watch: {
    visible(newVal) {
      if (!newVal) {
        this.$refs.input.$refs.input.blur();
      }
    },
  },
  created() {
    this.$on('select-option', this.onSelectOption);
    this.keydownOff = listen(document, 'keydown', this.onKeydown);
  },
  mounted() {
    this.updateChilds();
  },
  beforeDestroy() {
    if (this.keydownOff) {
      this.keydownOff();
    }
  },
  methods: {
    switchDropdown() {
      if (this.disabled) return;

      this.visible = !this.visible;
    },
    closeDropdown() {
      this.visible = false;
    },
    onSelectOption(value) {
      this.model = value;
      this.visible = false;
    },
    onKeydown(event) {
      if (this.visible) {
        // 按下 esc 关闭 select 目录
        if (event.keyCode === 27) {
          event.preventDefault();
          this.closeDropdown();
        }
      }
    },
    onMouseenter() {
      if (!this.disabled && this.clearable && this.isSelected) {
        this.clearShow = true;
      }
    },
    onMouseleave() {
      if (!this.disabled && this.clearable && this.isSelected) {
        this.clearShow = false;
      }
    },
    clearModel() {
      this.model = '';
      this.clearShow = false;
      this.closeDropdown();
    },
    updateChilds() {
      this.childs = this.$children.filter(child => child.$options.name === 'co-option');
    },
    slotChange() {
      this.$nextTick(() => {
        this.updateChilds();
      });
    },
  },
  components: {
    CoInput,
    CoIcon,
  },
};
</script>
