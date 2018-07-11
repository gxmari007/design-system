<template>
  <i :class="classes" />
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class CoIcon extends Vue {
  /**
   * props
   */
  // 是否有旋转动画
  @Prop({ default: false })
  spin!: boolean

  // 图标名称
  @Prop({ required: true })
  type!: string

  /**
   * computed
   */
  get classes(): (string | object)[] {
    const prefixClass = 'anticon';

    return [prefixClass, `${prefixClass}-${this.type}`, {
      [`${prefixClass}-spin`]: this.spin,
    }];
  }
}
</script>
