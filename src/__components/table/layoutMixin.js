import { getScrollBarWidth } from 'utils/help';

export default {
  data() {
    return {
      layout: {
        // 是否存在水平滚动条
        scrollX: false,
        // 是否存在垂直滚动条
        scrollY: false,
        // 图表的实际宽度
        bodyWidth: 0,
        bodyHeight: 0,
        // 滚动条宽度
        scrollBarWidth: getScrollBarWidth(),
      },
    };
  },
  methods: {
    doUpdateLayout() {
      this.$nextTick(() => {
        this.updateScrollY();
        this.updateLayout();
        this.updateHeight();
      });
    },
    updateLayout() {
      const { scrollBarWidth, scrollY } = this.layout;
      const bodyWidth = this.$el.clientWidth;
      const bodyRealWidth = bodyWidth - (scrollY ? scrollBarWidth : 0);
      const flattenColumns = this.columns;
      const flexColumns = flattenColumns.filter(column => typeof column.finalWidth === 'undefined');
      let bodyMinWidth = 0;

      flattenColumns.forEach((column) => {
        bodyMinWidth += column.finalWidth || column.minWidth || 80;
      });

      // 判断是否含有自适应宽度列
      if (flexColumns.length > 0) {
        // 判断是否含有水平滚动条
        if (bodyMinWidth < bodyRealWidth) {
          const flexWidth = bodyRealWidth - bodyMinWidth;

          this.layout.scrollX = false;

          if (flexColumns.length === 1) {
            flexColumns[0].realWidth = (flexColumns[0].minWidth || 80) + flexWidth;
          } else if (flexColumns.length > 1) {
            const allFlexColumnsWidth = flexColumns.reduce((acc, column) =>
              acc + (column.minWidth || 80),
            0);
            const proportion = flexWidth / allFlexColumnsWidth;
            let noneFirstWidth = 0;

            flexColumns.forEach((column, index) => {
              if (index === 0) return;

              const w = Math.floor((column.minWidth || 80) * proportion);

              noneFirstWidth += w;
              column.realWidth = (column.minWidth || 80) + w;
            });

            flexColumns[0].realWidth = (flexColumns[0].minWidth || 80) + flexWidth - noneFirstWidth;
          }
        } else {
          this.layout.scrollX = true;
        }

        this.layout.bodyWidth = Math.max(bodyMinWidth, bodyWidth);
      } else {
        this.layout.scrollX = bodyMinWidth > bodyRealWidth;
        this.layout.bodyWidth = bodyMinWidth;
      }
    },
    // 判断是否含有垂直滚动条
    updateScrollY() {
      if (typeof this.height === 'undefined') return;

      const bodyWrapper = this.$refs.body;

      if (this.$el && bodyWrapper) {
        const bodyTable = bodyWrapper.querySelector('.co-table__body-table');

        this.layout.scrollY = bodyWrapper.offsetHeight < bodyTable.offsetHeight;
      }
    },
    updateHeight() {
      this.$nextTick(() => {
        const height = this.$el.clientHeight;
        const { header } = this.$refs;

        if (this.showHeader) {
          const headerHeight = header.offsetHeight;

          if (typeof this.height === 'number') {
            this.layout.bodyHeight = height - headerHeight;
          }
        } else if (typeof this.height === 'number') {
          this.layout.bodyHeight = height;
        }
      });
    },
  },
};
