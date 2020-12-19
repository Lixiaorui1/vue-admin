<template>
  <el-container class="project_container">
    <homebar />
    <sidebar />
    <app-main :isRouterShow="isRouterShow" />
  </el-container>
</template>

<script>
import { appMain, homebar, sidebar } from "./components";
import "mutationobserver-shim";

export default {
  name: "Layout",
  components: {
    homebar,
    sidebar,
    appMain
  },
  computed: {
    device() {
      return this.$store.state.app.device;
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader;
    },
    roleType() {
      return this.$store.state.user.roleType;
    },
    classObj() {
      return {
        mobile: this.device === "mobile"
      };
    }
  },
  data() {
    return {
      timer: null,
      isRouterShow: true
    };
  },
  watch: {
    roleType() {
      this.setTheme();
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
.project_container {
  height: 100%;
  background-color: rgb(242, 243, 247);
}
.main_container {
  position: relative;
  background: #f2f3f7;
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}
.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}
.mobile .fixed-header {
  width: 100%;
}
</style>
