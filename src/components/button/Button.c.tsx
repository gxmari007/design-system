import { Vue, Component, Prop } from 'vue-property-decorator';
import { VNode, CreateElement } from 'vue';

@Component
export default class CoButton extends Vue {
  /**
   * props
   */
  // 是否为幽灵按钮
  @Prop({
    type: Boolean,
    default: false,
  })
  private ghost!: boolean;

  // 点击跳转的地址，此时组件为 a 链接
  @Prop(String)
  private href!: string;

  // button 原生 html 属性
  @Prop({ default: 'button' })
  private htmlType!: string;

  /**
   * computed
   */
  get classes() {
    const prefixClass = 'co-button';

    return [prefixClass, {
      [`${prefixClass}--ghost`]: this.ghost,
    }];
  }

  /**
   * methods
   */
  private renderDefaultSlot(): VNode[] | null {
    if (this.$slots.default) {
      return this.$slots.default.map((vnode) => {
        if (vnode.text) {
          return <span>{vnode.text.trim()}</span>;
        }

        return vnode;
      });
    }

    return null;
  }

  private renderButton(): VNode {
    return (
      <button
        class={this.classes}
        type={this.htmlType}>
        {this.renderDefaultSlot()}
      </button>
    );
  }

  private renderLink(): VNode {
    return (
      <a href={this.href}>
        <span>{this.$slots.default}</span>
      </a>
    );
  }

  private render(): VNode {
    if (this.href) {
      return this.renderLink();
    }

    return this.renderButton();
  }
}
