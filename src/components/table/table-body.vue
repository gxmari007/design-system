<template>
  <table class="co-table__body-table">
    <colgroup>
      <col v-for="column in columns" :style="{ width: `${column.realWidth || column.width}px` }">
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
            v-if="column.overflowTooltip || column.display.charLength > 0"
            placement="top"
            :content="item.row[column.prop]"
            style="width: 100%">
            <div :class="cellClasses(column.overflowTooltip)">{{ formatCell(item.row[column.prop], column.display.charLength) }}</div>
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
    formatCell(originText, len) {
      if (len === 0) return originText;

      const text = `${originText}`;
      const textLen = text.split('').length;

      if (textLen <= len) {
        return originText;
      }

      return `${`${text}`.split('').slice(0, len).join('')}...`;
    },
    setTdStyles(column, row) {
      let styles = {};

      if (column.display.minLength > 0) {
        const orderData = orderBy(this.data, column.prop, 'asc');

        if (orderData.indexOf(row) <= column.display.minLength - 1) {
          styles.backgroundColor = column.display.minBg;
          styles.color = column.display.minColor;
        }
      }

      if (column.display.maxLength > 0) {
        const orderData = orderBy(this.data, column.prop, 'desc');

        if (orderData.indexOf(row) <= column.display.maxLength - 1) {
          styles.backgroundColor = column.display.maxBg;
          styles.color = column.display.maxColor;
        }
      }

      styles = this.setCustomValue(column, row, styles);

      return styles;
    },
    setCustomValue(column, row, styles) {
      const { display } = column;
      const style = styles;

      if (!display.customEnabled) return style;

      const value = Number(row[column.prop]);

      if (isNaN(value)) return style;

      // 值范围设定
      if (display.customValueType === 'range') {
        const start = Number(display.beginValueType === 'include' ? display.beginValue : display.beginValue - 1);
        const end = Number(display.endValueType === 'include' ? display.endValue + 1 : display.endValue);

        if (!isNaN(start) && !isNaN(end) && inRange(value, start, end)) {
          style.backgroundColor = display.customBg;
          style.color = display.customColor;
        }
      }

      if (display.customValueType === 'min') {
        const orderData = orderBy(this.data, column.prop, 'desc');
        const start = Number(display.beginValueType === 'include' ? display.beginValue : display.beginValue - 1);
        const end = Number(orderData[0][column.prop] + 1);

        if (!isNaN(start) && !isNaN(end) && inRange(value, start, end)) {
          style.backgroundColor = display.customBg;
          style.color = display.customColor;
        }
      }

      if (display.customValueType === 'max') {
        const orderData = orderBy(this.data, column.prop, 'asc');
        const start = Number(orderData[0][column.prop]);
        const end = Number(display.endValueType === 'include' ? display.endValue + 1 : display.endValue);

        if (!isNaN(start) && !isNaN(end) && inRange(value, start, end)) {
          style.backgroundColor = display.customBg;
          style.color = display.customColor;
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
