// mixin
import { getScrollBarWidth } from '../../utils/help';

export default {
  data() {
    return {
      layout: {
        width: 0,
        height: 0,
        headerHeight: 0,
        leftFixedWidth: 0,
        rightFixedWidth: 0,
        fixedHeight: 0,
        fixedBodyHeight: 0,
        scrollX: false,
        scrollY: false,
        scrollBarWidth: getScrollBarWidth(),
      },
    };
  },
  methods: {
    doUpdateLayout() {
      this.$nextTick(() => {
        this.updateScrollY();
        this.updateHeight();
        this.updateLayout();
      });
    },
    // height, showHeader, data 变化的时候触发
    updateScrollY() {
      if (typeof this.height === 'undefined') return;

      const { bodyWrap } = this.$refs;

      if (this.$el && bodyWrap && !this.noData) {
        const body = this.$refs.body.$el;

        this.layout.scrollY = bodyWrap.offsetHeight < body.offsetHeight;
      }
    },
    // height, showHeader 变化的时候触发
    updateHeight() {
      const height = this.$el.clientHeight;
      const { header } = this.$refs;
      const { scrollX, scrollBarWidth } = this.layout;

      // 数据更新时可能 header 实例还未生成
      if (!header) return;

      if (this.showHeader) {
        const headerHeight = header.$el.offsetHeight;
        const bodyHeight = height - headerHeight;

        if (typeof this.height === 'number') {
          this.layout.height = bodyHeight;
        }

        this.layout.headerHeight = headerHeight;
        this.layout.fixedBodyHeight = scrollX ? bodyHeight - scrollBarWidth : bodyHeight;
      } else {
        if (typeof this.height === 'number') {
          this.layout.height = height;
        }

        this.layout.headerHeight = 0;
        this.layout.fixedBodyHeight = scrollX ? height - scrollBarWidth : height;
      }

      this.layout.fixedHeight = scrollX ? height - scrollBarWidth : height;
    },
    updateLayout() {
      const {
        flattenColumns,
        leftFixedColumns,
        rightFixedColumns,
        layout: { scrollBarWidth, scrollY },
      } = this;
      const tableWidth = this.$el.clientWidth;
      const tableRealWidth = tableWidth - (scrollY ? scrollBarWidth : 0);
      const flexColumns = flattenColumns.filter(column => (
        column.resizeWidth === null && typeof column.width === 'undefined'
      ));
      let tableMinWidth = 0;

      flattenColumns.forEach((column) => {
        tableMinWidth += column.resizeWidth ||
          column.width ||
          column.minWidth ||
          column.defaultMinWidth;
      });

      this.layout.scrollX = tableMinWidth > tableRealWidth;

      if (flexColumns.length > 0) {
        if (!this.layout.scrollX) {
          const flexWidth = tableRealWidth - tableMinWidth;
          const firstColumn = flexColumns[0];

          if (flexColumns.length === 1) {
            firstColumn.realWidth = (firstColumn.minWidth || firstColumn.defaultMinWidth) +
              flexWidth;
          } else {
            const allFlexColumnsWidth = flexColumns.reduce((acc, column) =>
              acc + (column.minWidth || column.defaultMinWidth),
            0);
            const proportion = flexWidth / allFlexColumnsWidth;
            let noneFirstWidth = 0;

            flexColumns.forEach((column, index) => {
              if (index === 0) return;

              const w = Math.floor((column.minWidth || column.defaultMinWidth) * proportion);

              noneFirstWidth += w;
              column.realWidth = (column.minWidth || column.defaultMinWidth) + w;
            });

            firstColumn.realWidth = (firstColumn.minWidth || firstColumn.defaultMinWidth) +
              flexWidth - noneFirstWidth;
          }
        }

        this.layout.width = Math.max(tableMinWidth, tableRealWidth);
      } else {
        this.layout.width = tableMinWidth;
      }

      if (leftFixedColumns.length > 0) {
        this.layout.leftFixedWidth = leftFixedColumns.reduce((acc, column) =>
          acc + column.realWidth,
        0);
      }

      if (rightFixedColumns.length > 0) {
        this.layout.rightFixedWidth = rightFixedColumns.reduce((acc, column) =>
          acc + column.realWidth,
        0);
      }
    },
  },
};
