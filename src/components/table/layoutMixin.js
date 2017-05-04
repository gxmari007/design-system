import { getScrollBarWidth } from 'utils/help';

export default {
  data() {
    return {
      layout: {
        scrollY: false,
        bodyWidth: 0,
        scrollBarWidth: getScrollBarWidth(),
      },
    };
  },
  methods: {
    doUpdateLayout() {
      this.updateLayout();
      this.updateScrollY();
    },
    updateLayout() {
      // const { scrollBarWidth } = this;
      const tableWidth = this.$el.clientWidth;
      const flattenColumns = this.columns;
      const flexColumns = flattenColumns.filter(column => typeof column.width === 'undefined');
      let bodyMinWidth = 0;

      // 判断是否含有自适应宽度列
      if (flexColumns.length > 0) {
        flattenColumns.forEach((column) => {
          bodyMinWidth += column.realWidth;
        });

        // 判断是否含有水平滚动条
        // if (bodyMinWidth < tableWidth - scrollBarWidth) {}

        this.layout.bodyWidth = Math.max(bodyMinWidth, tableWidth);
      } else {
        flattenColumns.forEach((column) => {
          bodyMinWidth += column.realWidth;
        });

        this.layout.bodyWidth = bodyMinWidth;
      }
    },
    // 获取垂直滚动条的宽度
    updateScrollY() {
      if (typeof this.height === 'undefined') return;

      const bodyWrapper = this.$refs.body;

      if (this.$el && bodyWrapper) {
        const bodyTable = bodyWrapper.querySelector('.co-table__body-table');

        this.scrollY = bodyWrapper.offsetHeight < bodyTable.offsetHeight;
      }
    },
  },
};
