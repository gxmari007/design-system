<template>
  <div style="padding: 20px; width: 500px;">
    <co-button type="primary" @click.native="visible = true">显示对话框</co-button>
    <co-button @click.native="show = !show">show</co-button>{{ show }}
    <div v-transfer-dom>
      <co-modal v-if="show" v-model="visible" title="对话框"></co-modal>
    </div>
    <co-input-number v-model="height"></co-input-number>
    <co-carousel :height="height">
      <co-carousel-item>
        <div class="item" style="background: red;"></div>
      </co-carousel-item>
      <co-carousel-item>
        <div class="item" style="background: yellow;"></div>
      </co-carousel-item>
    </co-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      show: true,
      height: 200,
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
};
</script>

<style lang="less">
.item {
  height: 100%;
}
</style>
