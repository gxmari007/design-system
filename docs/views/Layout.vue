<template>
  <div class="test">
    <co-form :label-width="60" :model="form" :rules="formRules">
      <co-form-item label="姓名" prop="name">
        <co-input v-model="form.name"></co-input>
      </co-form-item>
      <co-form-item label="测试" prop="test">
        <co-checkbox-group v-model="form.test">
          <co-checkbox label="吃饭"></co-checkbox>
          <co-checkbox label="睡觉"></co-checkbox>
          <co-checkbox label="睡觉1"></co-checkbox>
          <co-checkbox label="睡觉2"></co-checkbox>
        </co-checkbox-group>
      </co-form-item>
    </co-form>
    {{ form }}
    <co-table :data="data" border>
      <co-table-column label="日期" prop="table_1" sortable></co-table-column>
      <co-table-column label="姓名" prop="table_2" sortable></co-table-column>
    </co-table>
    <div ref="demo" class="demo" :style="styles">
      <span class="h lt" @mousedown="mousedown" @mouseup="mouseup" @mousemove="onMousemoveLt"></span>
      <span class="h rt" @mousedown="mousedown" @mouseup="mouseup" @mousemove="onMousemoveRt"></span>
      <span class="h rb"></span>
      <span class="h lb" @mousedown="mousedown" @mouseup="mouseup" @mousemove="onMousemoveLt"></span>
    </div>
  </div>
</template>

<script>
import offset from 'dom-helpers/query/offset';
import on from 'dom-helpers/events/on';

export default {
  data() {
    return {
      form: {
        name: '',
        test: [],
      },
      formRules: {
        name: [
          { required: true, message: '不能为空', trigger: 'change, blur' },
        ],
        test: [
          { required: true, type: 'array', message: '至少选择1项', trigger: 'change' },
          { type: 'array', max: 2, message: '最多选择2项', trigger: 'change' },
        ],
      },
      data: [
        { 'table_1': '空', 'table_2': 10 },
        { 'table_1': '空', 'table_2': 20 },
        { 'table_1': '空', 'table_2': 50 },
        { 'table_1': '空', 'table_2': 40 },
        { 'table_1': '空', 'table_2': 30 },
      ],
      move: false,
      width: 0,
      height: 0,
      top: 0,
      left: 0,
    };
  },
  computed: {
    styles() {
      const styles = {};

      if (this.width) {
        styles.width = `${this.width}px`;
      }

      if (this.height) {
        styles.height = `${this.height}px`;
      }

      if (this.top) {
        styles.top = `${this.top}px`;
      }

      if (this.left) {
        styles.left = `${this.left}px`;
      }

      return styles;
    },
  },
  mounted() {
    on(document, 'mouseup', this.mouseup);
    on(document, 'mousemove', this.onMousemoveLt);
    on(document, 'mousemove', this.onMousemoveRt);
    on(document, 'mousemove', this.onMousemoveLt);
  },
  methods: {
    mousedown() {
      this.move = true;
    },
    mouseup() {
      this.move = false;
    },
    onMousemoveLt(event) {
      if (this.move) {
        const { top, left, width, height } = offset(this.$refs.demo);
        const { x, y } = event;
        const w = x > left ? width - (x - left) : width + left - x;
        const h = y > top ? height - (y - top) : height + top - y;

        if (w >= 100 && h >= 100) {
          this.top = y;
          this.left = x;
          this.width = w;
          this.height = h;
        }
      }
    },
    onMousemoveRt(event) {
      if (this.move) {
        const { top, left, height } = offset(this.$refs.demo);
        const { x, y } = event;
        const w = x - left;
        const h = y > top ? height - (y - top) : height + top - y;

        if (w >= 100 && h >= 100) {
          this.top = y;
          this.width = w;
          this.height = h;
        }
      }
    },
    onMousemoveLt(event) {
      if (this.move) {
        const { top, left, width, height } = offset(this.$refs.demo);
        const { x, y } = event;
        const w = x > left ? width - (x - left) : width + left - x;
        const h = y - top;

        if (w >= 100 && h >= 100) {
          this.left = x;
          this.width = w;
          this.height = h;
        }
      }
    },
  },
};
</script>

<style>
.test {
  position: relative;
  padding: 80px;
  height: 2000px;
}
.demo {
  position: relative;
  top: 50px;
  left: 50px;
  width: 500px;
  height: 500px;
  border: 1px solid #ddd;
}
.h {
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: #ddd;
}
.lt {
  top: 0;
  left: 0;
}
.lb {
  bottom: 0;
  left: 0;
}
.rt {
  top: 0;
  right: 0;
}
.rb {
  bottom: 0;
  right: 0;
}
</style>
