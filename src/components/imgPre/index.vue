<template>
  <div class="img-pre-box" v-if="visible">
    <img :src="src" @click="hideImgPreModal" />
    <span class="pre button" @click="check('pre')"
      ><i class="el-icon-arrow-left"></i
    ></span>
    <span class="next button" @click="check('next')"
      ><i class="el-icon-arrow-right"></i
    ></span>
    <span class="close button" @click="hideImgPreModal"
      ><i class="el-icon-close"></i
    ></span>
  </div>
</template>

<script>
import { Message } from "element-ui";
export default {
  props: ["list"],
  data() {
    return {
      visible: false,
      src: ""
    };
  },
  methods: {
    openImgPreModal(url) {
      this.visible = true;
      this.src = url;
    },
    hideImgPreModal() {
      this.visible = false;
      Message.closeAll();
    },
    check(type) {
      const list = this.list || [];
      let index = list.findIndex(item => item.url === this.src);
      if (type === "pre") {
        if (index <= 0) {
          this.$message("当前已是第一张图片");
        } else {
          this.src = list[index - 1].url;
        }
      } else {
        if (index >= list.length - 1) {
          this.$message("当前已是最后一张图片");
        } else {
          this.src = list[index + 1].url;
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.img-pre-box {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.82);
  z-index: 20;
  img {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    max-width: 90%;
    max-height: 90%;
    cursor: zoom-out;
  }
  .button {
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 30px;
    height: 30px;
    color: #fff;
    cursor: pointer;
    font-size: 30px;
  }
  .pre {
    left: 20px;
  }
  .next {
    right: 20px;
  }
  .close {
    right: 20px;
    top: 20px;
    margin: 0;
  }
}
</style>
