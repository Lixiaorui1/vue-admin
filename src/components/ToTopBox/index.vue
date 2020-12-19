<template>
  <div class="to-top-box">
    <slot></slot>
    <el-button
      class="toTop"
      v-if="hasToTopButton"
      size="mini"
      type="text"
      @click="tableTop"
    >
      <i class="iconfont iconfanhuidingbu"></i>
    </el-button>
  </div>
</template>

<script>
export default {
  name: "ToTopBox",
  props: {},
  components: {},
  data() {
    return {
      hasToTopButton: false
    };
  },
  computed: {},
  watch: {},
  mounted() {
    $(".app_main").bind("scroll", this.getToTopButton);
  },
  beforeDestroy() {
    $(".app_main").unbind("scroll", this.getToTopButton);
  },
  methods: {
    tableTop() {
      this.$nextTick(() => {
        $(".app_main").animate({ scrollTop: 0 }, 500);
      });
    },
    getToTopButton() {
      const scrollTop = $(".app_main").scrollTop();
      if (scrollTop > document.body.clientHeight / 5) {
        this.hasToTopButton = true;
      } else {
        this.hasToTopButton = false;
      }
    }
  }
};
</script>

<style lang="scss">
.to-top-box {
  .toTop {
    cursor: pointer;
    padding: 0;
    position: fixed;
    bottom: 50px;
    right: 20px;
    display: inline-block;
    z-index: 99;
    width: 40px;
    height: 40px;
    background: #c1c4c9 !important;
    color: #fff !important;
    border-radius: 4px;
    .iconfont {
      font-size: 20px !important;
    }
  }
  .toTop:hover {
    background: var(--themeColor) !important;
  }
}
</style>
