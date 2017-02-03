<template>
  <div class="test">
    <co-input style="width: 180px; vertical-align: top;" v-model="value" placeholder="test" icon="search"></co-input>
    <co-button type="primary">测试文本</co-button>
    <p>X<sup>2</sup>测试文本测试文本测试文本测试文本<br>测试文本测试文本<a href="">测试文本</a>测试文本测试文本测试文本</p>
    <hr>
    <abbr>asdfsd</abbr>
    <co-affix :offset-top="20" @change="onChange">
      <co-button type="primary">测试文本</co-button>
    </co-affix>
    <abbr title="asdf">asdfsd</abbr>
    <p>X<sup>2</sup>测试文本测试文本测试文本测试文本<br>测试文本测试文本<a href="">测试文本</a>测试文本测试文本测试文本</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show1: false,
      value: '',
    };
  },
  methods: {
    onChange(status) {
      console.log(status);
    },
  },
};
</script>

<style>
.test {
  height: 2000px;
  padding: 100px;
}
.bg {
  background-color: yellow;
  padding: 10px;
}
</style>
