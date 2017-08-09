<template>
  <div :class="classes" :style="styles">
    <div class="co-steps__head">
      <div class="co-steps__line">
        <div class="co-steps__line-inner" :style="innerStyles"></div>
      </div>
      <div class="co-steps__icon">
        <template v-if="finish">
          <co-icon
            v-if="steps.finishStatus === 'finish'"
            class="co-steps__finish"
            type="android-done"></co-icon>
          <co-icon
            v-if="steps.finishStatus === 'error'"
            class="co-steps__finish"
            type="android-close"></co-icon>
          <template v-if="steps.finishStatus === 'wait' || steps.finishStatus === 'process'">{{ index }}</template>
        </template>
        <template v-else>
          <co-icon
            v-if="steps.processStatus === 'finish'"
            class="co-steps__finish"
            type="android-done"></co-icon>
          <co-icon
            v-if="steps.processStatus === 'error'"
            class="co-steps__finish"
            type="android-close"></co-icon>
          <template v-if="steps.processStatus === 'wait' || steps.processStatus === 'process'">{{ index }}</template>
        </template>
      </div>
    </div>
    <div class="co-steps__main">
      <div class="co-steps__title">
        <slot name="title">{{ title }}</slot>
      </div>
      <div class="co-steps__description">
        <slot name="description">{{ description }}</slot>
      </div>
    </div>
  </div>
</template>

<script>
import CoIcon from 'components/icon';

export default {
  name: 'co-step',
  props: {
    title: String,
    description: String,
  },
  computed: {
    classes() {
      const prefixClass = 'co-steps__item';
      const { index, finish } = this;
      const { active, processStatus, finishStatus } = this.steps;
      const classes = [prefixClass];

      if (index > active + 1) {
        classes.push(`${prefixClass}--wait`);
      }

      if (finish) {
        classes.push(`${prefixClass}--${finishStatus}`);
      }

      if (index === active + 1) {
        classes.push(`${prefixClass}--${processStatus}`);
      }

      return classes;
    },
    styles() {
      const style = { width: '100%' };

      if (this.steps.direction === 'horizontal') {
        style.width = `${(100 / this.steps.childs.length).toFixed(1)}%`;
      }

      return style;
    },
    innerStyles() {
      const { index } = this;
      const { active } = this.steps;
      const style = { width: 0 };

      if (index === active) {
        style.width = '50%';
        style.transitionDelay = '150ms';
      } else if (index < active) {
        style.width = '100%';
        style.transitionDelay = '0ms';
      }

      return style;
    },
    steps() {
      let parent = this.$parent;

      while (parent && parent.$options.name !== 'co-steps') {
        parent = parent.$parent;
      }

      return parent;
    },
    index() {
      return this.steps ?
        this.steps.childs.indexOf(this) + 1 :
        1;
    },
    finish() {
      return this.index <= this.steps.active;
    },
  },
  mounted() {
    if (this.steps) {
      this.steps.slotChange();
    }
  },
  beforeDestroy() {
    if (this.steps) {
      this.steps.slotChange();
    }
  },
  components: {
    CoIcon,
  },
};
</script>
