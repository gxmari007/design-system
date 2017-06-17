<template>
  <table class="co-table__body-table">
    <colgroup>
      <col v-for="column in columns" :style="{ width: `${column.realWidth}px` }">
    </colgroup>
    <tbody>
      <tr v-for="item in currentData" @click="onClick($event, item.row)">
        <td
          v-for="column in columns"
          v-if="column.mergeColumn ? item[`dis-${column.prop}`] : true"
          :rowspan="column.mergeColumn ? item[`span-${column.prop}`] : false"
          :data-id="column.columnId"
          :style="setTdStyles(column, item.row)">
          <co-tooltip
            v-if="column.overflowTooltip"
            placement="left"
            :delay="1000"
            :content="item.row[column.prop]"
            style="width: 100%">
            <div :class="cellClasses(column.overflowTooltip)">{{ item.row[column.prop] }}</div>
          </co-tooltip>
          <div v-else :class="cellClasses(column.overflowTooltip)">{{ item.row[column.prop] }}</div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
// components
import CoTooltip from 'components/tooltip';
// libs
import orderBy from 'lodash/orderBy';
import inRange from 'lodash/inRange';
// utils
import { mergeColumn, getCellDom, getColumnByCell } from './utils';
// helps
import { colors } from './helps';

export default {
  name: 'table-body',
  props: {
    data: Array,
    columns: Array,
  },
  computed: {
    table() {
      return this.$parent;
    },
    currentData() {
      let data = this.data.map(row => ({ row }));

      data = mergeColumn(data, this.columns);

      return data;
    },
  },
  methods: {
    cellClasses(tooltip) {
      const prefix = 'co-table__cell';

      return {
        [prefix]: true,
        [`${prefix}--tooltip`]: tooltip,
      };
    },
    // 触发行与单元格的单击事件
    onClick(event, row) {
      this.handleEvent(event, row, 'click');
    },
    handleEvent(event, row, name) {
      const { table } = this;
      const cellDom = getCellDom(event);

      if (cellDom) {
        const column = getColumnByCell(table, cellDom);

        if (column) {
          table.$emit(`cell-${name}`, event, row, column, cellDom);
        }
      }

      table.$emit(`row-${name}`, event, row);
    },
    setTdStyles(column, row) {
      let styles = {};

      if (column.display.minLength > 0) {
        const orderData = orderBy(this.data, column.prop, 'asc');

        if (orderData.indexOf(row) <= column.display.minLength - 1) {
          const color = colors.findColor(column.display.minColor);

          styles.backgroundColor = color.bg;
          styles.color = color.font;
        }
      }

      if (column.display.maxLength > 0) {
        const orderData = orderBy(this.data, column.prop, 'desc');

        if (orderData.indexOf(row) <= column.display.maxLength - 1) {
          const color = colors.findColor(column.display.maxColor);

          styles.backgroundColor = color.bg;
          styles.color = color.font;
        }
      }

      if (column.display.middleValue) {
        const orderData = orderBy(this.data, column.prop, 'asc');
        const len = orderData.length;
        let index = 0;

        if (len % 2 === 0) {
          index = (len / 2 + (len + 1) / 2) / 2;
        } else {
          index = (len + 1) / 2;
        }

        if (orderData.indexOf(row) === index - 1) {
          const color = colors.findColor(column.display.middleValue);

          styles.backgroundColor = color.bg;
          styles.color = color.font;
        }
      }

      styles = this.setCustomValue(column, row, styles);

      return styles;
    },
    setCustomValue(column, row, styles) {
      const { display } = column;
      const style = styles;
      const { rangeEnabled, rangeType, rangeColor } = display;

      if (!rangeEnabled) return style;

      const value = Number(row[column.prop]);
      const orderData = orderBy(this.data, column.prop, 'asc');
      const color = colors.findColor(rangeColor);

      if (isNaN(value)) return style;

      // 值范围设定
      if (['in', 'ex'].indexOf(rangeType) !== -1) {
        const start = Number(display.min);
        const end = Number(display.max) + 1;

        if (!isNaN(start) && !isNaN(end) &&
          (rangeType === 'in' ? inRange(value, start, end) : !inRange(value, start, end))) {
          style.backgroundColor = color.bg;
          style.color = color.font;
        }
      }

      if (['ge', 'gt'].indexOf(rangeType) !== -1) {
        let start = Number(display.min);
        const end = Number(orderData[orderData.length - 1][column.prop]) + 1;

        start = rangeType === 'ge' ? start : start + 1;

        if (!isNaN(start) && !isNaN(end) && inRange(value, start, end)) {
          style.backgroundColor = color.bg;
          style.color = color.font;
        }
      }

      if (['le', 'lt'].indexOf(rangeType) !== -1) {
        const start = Number(orderData[0][column.prop]);
        let end = Number(display.max);

        end = rangeType === 'le' ? end + 1 : end;

        if (!isNaN(start) && !isNaN(end) && inRange(value, start, end)) {
          style.backgroundColor = color.bg;
          style.color = color.font;
        }
      }

      return style;
    },
  },
  components: {
    CoTooltip,
  },
};
</script>
