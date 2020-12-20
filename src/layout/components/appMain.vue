<template>
  <section class="app_main" ref="appMain">
    <div class="app_main_content">
      <tags-view class="tags_view_box"></tags-view>
      <transition name="fade-transform" mode="out-in">
        <div class="view_main_content" v-if="isRouterShow">
          <to-top-box>
            <router-view> </router-view>
          </to-top-box>
        </div>
      </transition>
    </div>
  </section>
</template>

<script>
import toTopBox from "@/components/ToTopBox";
import routerView from "@/components/routerView";
import tagsView from "./tagsViews";
import { mapGetters } from "vuex";
export default {
  name: "AppMain",
  components: {
    toTopBox,
    routerView,
    tagsView
  },
  data() {
    return {
      view: false
    };
  },
  computed: {
    ...mapGetters(["isRouterShow"])
  },
  watch: {}
};
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";
@import "~@/styles/mixin.scss";
.app_main {
  @include scrollBar;
  position: relative;
  top: $headerHeight;
  left: $sideBarWidth;
  width: calc(100% - #{$sideBarWidth});
  height: calc(100% - #{$headerHeight});
  box-sizing: border-box;
  overflow-y: auto;
  .view_main_content {
    padding: 16px 20px 0 20px;
  }
}
.app_main_content {
  min-width: 1200px;
}
</style>
