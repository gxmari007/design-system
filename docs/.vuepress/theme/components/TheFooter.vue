<template>
  <footer class="footer">
    <co-row>
      <co-col v-for="(item, index) in links" :key="index" :xs="24" :sm="24" :md="6">
        <div class="footer__item">
          <h2>{{ item.text }}</h2>
          <div v-for="(child, i) in item.children" :key="i">
            <a :href="child.link">{{ child.text }}</a>
            <template v-if="child.desc">
              <span> - </span>{{ child.desc }}
            </template>
            <template v-if="child.icon">
              <span> - </span>
              <co-icon :type="child.icon" />
            </template>
          </div>
        </div>
      </co-col>
    </co-row>
  </footer>
</template>

<script>
export default {
  name: 'TheFooter',
  computed: {
    links() {
      return this.$site.themeConfig.footer;
    },
  },
};
</script>

<style lang="less">
.footer {
  position: relative;
  z-index: 100;
  font-size: 14px;
  color: hsla(0, 0%, 100%, .65);
  background-color: #000;
  padding: 86px 144px 93px;

  .co-row {
    text-align: center;
  }

  &__item {
    display: inline-block;
    text-align: left;

    > h2 {
      position: relative;
      font-size: 16px;
      font-weight: 500;
      color: #fff;
      margin: 0 auto 24px;
    }

    > div {
      margin: 12px 0;
    }
  }

  a {
    color: hsla(0, 0%, 100%, .9);
  }
}
</style>
