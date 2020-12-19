<template>
  <section class="app_main" ref="appMain">
    <transition name="fade-transform" mode="out-in">
      <div class="app_main_content">
        <to-top-box>
          <router-view> </router-view>
        </to-top-box>
      </div>
    </transition>
  </section>
</template>

<script>
import toTopBox from "@/components/ToTopBox";
import routerView from "@/components/routerView";
import { mapGetters } from "vuex";
export default {
  name: "AppMain",
  components: {
    toTopBox,
    routerView
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
}
.app_main_content {
  min-width: 1200px;
  padding: 16px 20px 0 20px;
}
</style>
