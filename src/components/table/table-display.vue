<template>
  <co-dialog v-model="model" ref="modal" title="列显示设置" width="420" center @on-cancel="onCancel">
    <co-form :model="display" :label-width="86">
      <header class="co-table__head">
        <span>列宽</span>
      </header>
      <co-form-item label="最多显示字数">
        <co-input-number v-model="display.charLength" :min="0"></co-input-number>
      </co-form-item>
      <header class="co-table__head">
        <span>颜色</span>
      </header>
      <co-form-item label="最小值后">
        <co-row>
          <co-col span="8">
            <co-input-number v-model="display.minLength" :min="0"></co-input-number>
            <span>个</span>
          </co-col>
          <co-col span="16">
            <co-select v-model="display.minColor" placeholder="选择颜色" :disabled="display.minLength === 0" clearable>
              <co-option v-for="(item, index) in colors" :key="index" :value="item.name" :label="item.name">
                <div class="color-container">
                  <span>{{ item.name }}</span>
                  <span class="color" :style="{ backgroundColor: item.value.bg }"></span>
                </div>
              </co-option>
            </co-select>
          </co-col>
        </co-row>
      </co-form-item>
      <co-form-item label="最大值前">
        <co-row>
          <co-col span="8">
            <co-input-number v-model="display.maxLength" :min="0"></co-input-number>
            <span>个</span>
          </co-col>
          <co-col span="16">
            <co-select v-model="display.maxColor" placeholder="选择颜色" :disabled="display.maxLength === 0" clearable>
              <co-option v-for="(item, index) in colors" :key="index" :value="item.name" :label="item.name">
                <div class="color-container">
                  <span>{{ item.name }}</span>
                  <span class="color" :style="{ backgroundColor: item.value.bg }"></span>
                </div>
              </co-option>
            </co-select>
          </co-col>
        </co-row>
      </co-form-item>
      <co-form-item label="中间值">
        <co-select v-model="display.middleValue" placeholder="选择颜色" clearable>
          <co-option v-for="(item, index) in colors" :key="index" :value="item.name" :label="item.name">
            <div class="color-container">
              <span>{{ item.name }}</span>
              <span class="color" :style="{ backgroundColor: item.value.bg }"></span>
            </div>
          </co-option>
        </co-select>
      </co-form-item>
      <header class="co-table__head">
        <span>范围值</span>
      </header>
      <co-checkbox v-model="display.rangeEnabled" style="margin-bottom: 15px;">设置自定义范围值</co-checkbox>
      <co-form-item label="范围">
        <co-select v-model="display.rangeType" :disabled="!display.rangeEnabled" clearable>
          <co-option
            v-for="(item, index) in ranges"
            :key="index"
            :value="item.value"
            :label="item.name">{{ item.name }}</co-option>
        </co-select>
      </co-form-item>
      <co-row>
        <co-col span="12">
          <co-form-item label="最小值">
            <co-input-number v-model="display.min" :disabled="!display.rangeEnabled || !minEnabled" style="width: 100%;"></co-input-number>
          </co-form-item>
        </co-col>
        <co-col span="12">
          <co-form-item label="最大值">
            <co-input-number v-model="display.max" :disabled="!display.rangeEnabled || !maxEnabled" style="width: 100%;"></co-input-number>
          </co-form-item>
        </co-col>
      </co-row>
      <co-form-item label="颜色">
        <co-select
          v-model="display.rangeColor"
          placeholder="选择颜色"
          :disabled="!display.rangeEnabled || display.rangeType === ''"
          clearable>
          <co-option v-for="(item, index) in colors" :key="index" :value="item.name" :label="item.name">
            <div class="color-container">
              <span>{{ item.name }}</span>
              <span class="color" :style="{ backgroundColor: item.value.bg }"></span>
            </div>
          </co-option>
        </co-select>
      </co-form-item>
    </co-form>
    <div slot="footer">
      <co-button type="ghost" @click.native="closeModal">取消</co-button>
      <co-button type="primary" @click.native="onSave">确定</co-button>
    </div>
  </co-dialog>
</template>

<script>
// components
import CoDialog from 'components/modal';
import { CoForm, CoFormItem } from 'components/form';
import CoInputNumber from 'components/input_number';
import CoInput from 'components/input';
import { CoRow, CoCol } from 'components/layout';
import { CoSelect, CoOption } from 'components/select';
import CoTooltip from 'components/tooltip';
import { CoRadioGroup, CoRadio } from 'components/radio';
import { CoButton } from 'components/button';
import { CoCheckbox } from 'components/checkbox';
// libs
import cloneDeep from 'lodash/cloneDeep';
// helps
import { colors } from './helps';

export default {
  name: 'table-display',
  props: {
    value: Boolean,
    column: Object,
  },
  data() {
    return {
      display: cloneDeep(this.column.display),
      colors: colors.values,
      ranges: [
        { name: '包含', value: 'in' },
        { name: '不包含', value: 'ex' },
        { name: '大于或等于', value: 'ge' },
        { name: '小于或等于', value: 'le' },
        { name: '大于', value: 'gt' },
        { name: '小于', value: 'lt' },
        { name: '等于', value: 'eq' },
        { name: '不等于', value: 'ne' },
      ],
    };
  },
  computed: {
    model: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
    minEnabled() {
      return ['in', 'ex', 'ge', 'gt', 'eq', 'ne'].indexOf(this.display.rangeType) !== -1;
    },
    maxEnabled() {
      return ['in', 'ex', 'le', 'lt'].indexOf(this.display.rangeType) !== -1;
    },
  },
  watch: {
    value(newVal) {
      if (newVal) {
        this.display = cloneDeep(this.column.display);
      }
    },
  },
  methods: {
    onCancel() {
      this.display = cloneDeep(this.column.display);
    },
    closeModal() {
      this.$refs.modal.close();
      this.onCancel();
    },
    onSave() {
      Object.assign(this.column.display, this.display);
      this.$refs.modal.close();
    },
  },
  components: {
    CoDialog,
    CoForm,
    CoFormItem,
    CoInputNumber,
    CoInput,
    CoRow,
    CoCol,
    CoSelect,
    CoOption,
    CoTooltip,
    CoRadioGroup,
    CoRadio,
    CoButton,
    CoCheckbox,
  },
};
</script>

<style lang="less" scoped>
.color-container {
  line-height: 18px;
}

.color {
  display: inline-block;
  width: calc(~"100% - 15px");
  height: 10px;
}
</style>
