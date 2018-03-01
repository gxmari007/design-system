<template>
  <div class="co-date-picker__panel">
    <div class="co-date-picker__header">
      <co-icon :class="iconClasses('prev')" type="android-arrow-dropleft"></co-icon>
      <span class="co-date-picker__panel-label">2017年</span>
      <span class="co-date-picker__panel-label">7月</span>
      <co-icon :class="iconClasses('next')" type="android-arrow-dropright"></co-icon>
    </div>
  </div>
</template>

<script>
import CoIcon from 'components/icon';

export default {
  name: 'co-date-panel',
  methods: {
    iconClasses(type) {
      const prefixClass = 'co-date-picker';

      return [
        prefixClass,
        `${prefixClass}__icon`,
        `${prefixClass}__${type}`,
      ];
    },
  },
  components: {
    CoIcon,
  },
};
</script>
