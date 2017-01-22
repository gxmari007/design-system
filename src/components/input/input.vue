<template>
  <div class="co-input">
    <textarea
      v-if="type === 'textarea'"
      class="co-input__textarea"
      :placeholder="placeholder"
      :readonly="readonly"
      :disabled="disabled"
      :rows="rows"
      :autofocus="autofocus"></textarea>
    <template v-else>
      <co-icon
        v-if="icon"
        class="co-input__icon"
        :type="icon"
        @click.native="onIconClick"></co-icon>
      <input
        class="co-input__input"
        :value="value"
        :type="type"
        :placeholder="placeholder"
        :readonly="readonly"
        :disabled="disabled"
        :autocomplete="autocomplete"
        :autofocus="autofocus"
        @input="onInput">
    </template>
  </div>
</template>

<script>
import CoIcon from '../icon';

export default {
  name: 'co-input',
  props: {
    value: [String, Number],
    type: {
      type: String,
      default: 'text',
    },
    placeholder: String,
    readonly: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    icon: String,
    rows: {
      type: Number,
      default: 2,
    },
    autocomplete: {
      type: String,
      default: 'off',
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onIconClick() {
      this.$emit('icon-click');
    },
    onInput(e) {
      this.$emit('input', e.target.value);
    },
  },
  components: {
    CoIcon,
  },
};
</script>
