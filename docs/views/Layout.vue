<template>
  <div style="padding: 20px; width: 500px;">
    <co-card>
      <div slot="title">标题</div>
      <a href="#" slot="extra">按钮文本</a>
      测试文本
    </co-card>
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
</style>
