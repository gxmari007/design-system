import CoIcon from 'components/icon';
import emitter from 'mixins/emitter';

export default {
  name: 'expand-icon',
  mixins: [emitter],
  props: {
    row: Object,
    expandable: Boolean,
    isNeedIndent: Boolean,
    expanded: Boolean,
  },
  methods: {
    onClick(e) {
      if (e.target !== e.currentTarget) return;

      this.dispatch('table-body', 'on-expanded', !this.expanded, this.row);
    },
  },
  render() {
    const { expandable, isNeedIndent, expanded } = this;
    const iconType = expanded ? 'ios-minus-empty' : 'ios-plus-empty';

    if (expandable) {
      return (
        <co-icon
          class="co-table__expand"
          type={iconType}
          nativeOnClick={this.onClick}></co-icon>
      );
    } else if (isNeedIndent) {
      return <span class="co-table__expand co-table__expand--space">.</span>;
    }

    return null;
  },
  components: {
    CoIcon,
  },
};
