<template>
  <div :class="classes" :style="styles">
    <div class="co-steps__head">
      <div class="co-steps__line">
        <div class="co-steps__line-inner" :style="innerStyles"></div>
      </div>
      <div :class="iconClasses">
        <slot name="icon">
          <step-icon
            :status="status"
            :finish-status="steps.finishStatus"
            :process-status="steps.processStatus"
            :index="index"
            :icon="icon"></step-icon>
        </slot>
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
import StepIcon from './step-icon';

export default {
  name: 'co-step',
  props: {
    title: String,
    description: String,
    icon: String,
  },
  computed: {
    classes() {
      const prefixClass = 'co-steps__item';
      const {
        status,
        steps: {
          processStatus,
          finishStatus,
        },
      } = this;
      const classes = [prefixClass];

      switch (status) {
        case 'wait':
          classes.push(`${prefixClass}--wait`);
          break;
        case 'process':
          classes.push(`${prefixClass}--${processStatus}`);
          break;
        default:
          classes.push(`${prefixClass}--${finishStatus}`);
      }

      return classes;
    },
    iconClasses() {
      return this.icon ? 'co-steps__custom-icon' : 'co-steps__icon';
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
      const { active, direction } = this.steps;
      const style = {};

      if (direction === 'horizontal') {
        style.width = 0;
      } else {
        style.height = 0;
      }

      if (index === active) {
        if (direction === 'horizontal') {
          style.width = '50%';
        } else {
          style.height = '50%';
        }

        style.transitionDelay = '150ms';
      } else if (index < active) {
        if (direction === 'horizontal') {
          style.width = '100%';
        } else {
          style.height = '100%';
        }

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
    status() {
      const { index, steps: { active } } = this;

      if (index <= active) return 'finish';
      if (index > active + 1) return 'wait';

      return 'process';
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
    StepIcon,
  },
};
</script>
