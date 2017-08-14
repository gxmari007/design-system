<template>
  <div style="padding: 20px; width: 500px;">
    <co-steps style="margin-bottom: 20px;" :active="active" process-status="process">
      <co-step icon="social-nodejs" title="步骤 1" description="这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的描述性文字"></co-step>
      <co-step icon="social-sass" title="步骤 2" description="这是一段很长很长很长的描述性文字"></co-step>
      <co-step title="步骤 3" description="这是一段很长很长很长的描述性文字"></co-step>
      <co-step title="步骤 4">
        <!-- <co-icon slot="icon" type="android-close"></co-icon> -->
        <span slot="description">哈哈哈</span>
      </co-step>
    </co-steps>
    <co-button @click.native="onClick">下一步</co-button>
    <!-- <div class="hold">
      <picture :imgs="imgs"></picture>
    </div> -->
  </div>
</template>

<script>
import picture from './picture';

export default {
  data() {
    return {
      active: 1,
      imgs: [
        // { src: 'http://img4.imgtn.bdimg.com/it/u=4245345110,3192216996&fm=26&gp=0.jpg', width: 480, height: 300 },
        // { src: 'http://img4.imgtn.bdimg.com/it/u=4245345110,3192216996&fm=26&gp=0.jpg', width: 480, height: 300 },
        // { src: 'http://img.zcool.cn/community/046725568e356200000138cfb14ba4.jpg', width: 1239, height: 1239 },
        // { src: 'https://xieranmaya.github.io/images/cats/photo-115203323.jpg', width: 500, height: 333 },
        // { src: 'https://xieranmaya.github.io/images/cats/stock-photo-81988949.jpg', width: 333, height: 500 },
        // { src: 'http://img4.imgtn.bdimg.com/it/u=4245345110,3192216996&fm=26&gp=0.jpg', width: 480, height: 300 },
        // { src: 'http://img4.imgtn.bdimg.com/it/u=4245345110,3192216996&fm=26&gp=0.jpg', width: 480, height: 300 },
        // { src: 'http://img.zcool.cn/community/046725568e356200000138cfb14ba4.jpg', width: 1239, height: 1239 },
        // { src: 'https://xieranmaya.github.io/images/cats/photo-115203323.jpg', width: 500, height: 333 },
        // { src: 'https://xieranmaya.github.io/images/cats/stock-photo-81988949.jpg', width: 333, height: 500 },
      ],
    };
  },
  methods: {
    onClick() {
      if (this.active === 4) {
        this.active = 0;
      } else {
        this.active += 1;
      }
    },
  },
  components: {
    picture,
  },
};
</script>

<style lang="less">
.hold {
  height: 500px;
  overflow-y: auto;
  background-color: gray;
}
</style>
