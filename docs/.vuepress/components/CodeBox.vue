<template>
  <section class="code-box">
    <div class="code-box__demo">
      <slot name="demo" />
    </div>
    <div class="code-box__desc markdown">
      <div class="code-box__title">
        <slot name="title" />
      </div>
      <div class="markdown">
        <slot name="desc" />
      </div>
    </div>
    <div :class="codeClasses">
      <pre :class="`language-${lang}`">
        <code v-html="codeFomate"></code>
      </pre>
    </div>
  </section>
</template>

<script>
import Prism from 'prismjs';

export default {
  name: 'CodeBox',
  props: {
    code: String,
    lang: {
      type: String,
      default: 'html',
    },
  },
  computed: {
    codeFomate() {
      return Prism.highlight(this.code, Prism.languages[this.lang]);
    },
    codeClasses() {
      return ['code-box__code', `language-${this.lang}`];
    },
  },
};
</script>

<style lang="less">
.code-box {
  border: 1px solid #ebedf0;
  border-radius: 2px;
  margin-bottom: 16px;

  &__demo {
    border-bottom: 1px solid #ebedf0;
    padding: 42px 24px 50px;
  }

  &__desc {
    position: relative;
    padding: 18px 32px;
  }

  &__title {
    position: absolute;
    top: -14px;
    padding: 1px 8px;
    margin-left: -8px;
    font-weight: 500;
    color: #314659;
    background-color: #fff;
  }
}
</style>
