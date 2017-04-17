<template>
  <co-modal v-model="model" ref="modal" title="显示设置" width="500" center @on-cancel="onCancel">
    <co-form :model="display" :label-width="90">
      <co-form-item label="最多显示字数">
        <co-input-number v-model="display.charLength" :min="0"></co-input-number>
      </co-form-item>
      <co-form-item label="最小值前">
        <co-row>
          <co-col span="7">
            <co-input-number v-model="display.minLength" :min="0"></co-input-number>
            <span>个</span>
          </co-col>
          <co-col span="8">
            <co-select v-model="display.minBg" placeholder="选择背景颜色">
              <co-option value="#f33b32">红色</co-option>
              <co-option value="#0e90d2">蓝色</co-option>
              <co-option value="#10a100">绿色</co-option>
            </co-select>
          </co-col>
          <co-col span="1"></co-col>
          <co-col span="8">
            <co-select v-model="display.minColor" placeholder="选择字体颜色">
              <co-option value="#333">黑色</co-option>
              <co-option value="#fff">白色</co-option>
            </co-select>
          </co-col>
        </co-row>
      </co-form-item>
      <co-form-item label="最大值前">
        <co-row>
          <co-col span="7">
            <co-input-number v-model="display.maxLength" :min="0"></co-input-number>
            <span>个</span>
          </co-col>
          <co-col span="8">
            <co-select v-model="display.maxBg" placeholder="选择背景颜色">
              <co-option value="#f33b32">红色</co-option>
              <co-option value="#0e90d2">蓝色</co-option>
              <co-option value="#10a100">绿色</co-option>
            </co-select>
          </co-col>
          <co-col span="1"></co-col>
          <co-col span="8">
            <co-select v-model="display.maxColor" placeholder="选择字体颜色">
              <co-option value="#333">黑色</co-option>
              <co-option value="#fff">白色</co-option>
            </co-select>
          </co-col>
        </co-row>
      </co-form-item>
      <template v-if="false">
        <co-checkbox v-model="display.customEnabled">{{ display.customEnabled ? '开启' : '禁用' }}自定义范围值</co-checkbox>
        <co-form-item label="自定义范围值">
          <co-radio-group v-model="display.customValueType" type="button">
            <co-radio label="range">值范围</co-radio>
            <co-radio label="min">至少</co-radio>
            <co-radio label="max">至多</co-radio>
          </co-radio-group>
        </co-form-item>
        <co-form-item label="开始值：">
          <co-row>
            <co-col span="10">
              <co-radio-group v-model="display.beginValueType" type="button">
                <co-radio label="include">包含</co-radio>
                <co-radio label="exclude">不包含</co-radio>
              </co-radio-group>
            </co-col>
            <co-col span="14">
              <co-input-number
              v-model="display.beginValue"
              :disabled="display.customValueType === 'max'"></co-input-number>
            </co-col>
          </co-row>
        </co-form-item>
        <co-form-item label="结束值：">
          <co-row>
            <co-col span="10">
              <co-radio-group v-model="display.endValueType" type="button">
                <co-radio label="include">包含</co-radio>
                <co-radio label="exclude">不包含</co-radio>
              </co-radio-group>
            </co-col>
            <co-col span="14">
              <co-input-number
              v-model="display.endValue"
              :disabled="display.customValueType === 'min'"></co-input-number>
            </co-col>
          </co-row>
        </co-form-item>
        <co-form-item>
          <co-row>
            <co-col span="8">
              <co-select v-model="display.customBg" placeholder="选择背景颜色">
                <co-option value="#f33b32">红色</co-option>
                <co-option value="#0e90d2">蓝色</co-option>
                <co-option value="#10a100">绿色</co-option>
              </co-select>
            </co-col>
            <co-col span="1"></co-col>
            <co-col span="8">
              <co-select v-model="display.customColor" placeholder="选择字体颜色">
                <co-option value="#333">黑色</co-option>
                <co-option value="#fff">白色</co-option>
              </co-select>
            </co-col>
          </co-row>
        </co-form-item>
      </template>
    </co-form>
    <div slot="footer">
      <co-button type="ghost" @click.native="closeModal">取消</co-button>
      <co-button type="primary" @click.native="onSave">确定</co-button>
    </div>
  </co-modal>
</template>

<script>
// components
import CoModal from 'components/modal';
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

export default {
  name: 'table-display',
  props: {
    value: Boolean,
    column: Object,
  },
  data() {
    return {
      display: cloneDeep(this.column.display),
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
    CoModal,
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
