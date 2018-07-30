<template>
  <section class="code-box">
    <div class="code-box__demo">
      <slot name="demo" />
    </div>
    <div class="code-box__desc markdown" :style="descStyles">
      <div class="code-box__title">
        <slot name="title" />
      </div>
      <div class="markdown">
        <slot name="desc" />
      </div>
      <span class="code-box__expand" @click="toggleCode">
        <img
          class="code-box__expand-icon"
          :style="codeHideStyles"
          src="../assets/code1.svg"
          alt="expand code" />
        <img
          class="code-box__expand-icon"
          :style="codeShowStyles"
          src="../assets/code2.svg"
          alt="expand code" />
      </span>
    </div>
    <div :class="codeClasses" v-show="showCode">
      <pre :class="`language-${lang}`"><code v-html="codeFomate"></code></pre>
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
  data() {
    return {
      showCode: false,
    };
  },
  computed: {
    codeFomate() {
      const code = this.code.replace(/\n/, '');

      return Prism.highlight(code, Prism.languages[this.lang], this.lang);
    },
    codeClasses() {
      return ['code-box__code', `language-${this.lang}`];
    },
    codeHideStyles() {
      return { opacity: this.showCode ? 0 : .55 };
    },
    codeShowStyles() {
      return { opacity: this.showCode ? .55 : 0 };
    },
    descStyles() {
      return {
        borderBottom: this.showCode ? '1px dashed #ebedf0' : 'none',
      };
    },
  },
  methods: {
    toggleCode() {
      this.showCode = !this.showCode;
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

  &__expand {
    position: absolute;
    right: 16px;
    bottom: 23px;
    width: 16px;
    height: 16px;
    cursor: pointer;
  }

  &__expand-icon {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    transition: opacity .4s;
  }

  &__code {
    padding: 18px 16px;

    pre {
      padding: 0;
      margin: 0;
      border-radius: 0 0 2px 2px;
    }
  }
}
</style>
