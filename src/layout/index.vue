<template>
  <el-container class="project_container">
    <homebar />
    <sidebar />
    <app-main :isRouterShow="isRouterShow" />
  </el-container>
</template>

<script>
import { appMain, homebar, sidebar } from "./components";
import ResizeMixin from "./mixin/resizeHandler";
import "mutationobserver-shim";
import cssVars from "css-vars-ponyfill";

export default {
  name: "Layout",
  components: {
    homebar,
    sidebar,
    appMain
  },
  mixins: [ResizeMixin],
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
  },
  created() {
    this.setTheme();
  },
  methods: {
    setTheme() {
      let root = document.querySelector(":root");
      if (this.roleType === 0) {
        cssVars({
          variables: {
            "--themeColor": "#06367C",
            "--btHoverColor": "#3B5284",
            "--btActiveColor": "#3B5284",
            "--hoverColor": "#E7E8ED",
            "--tableHeadColor": "#f2f3f7",
            "--fontThemeColor": "#0266CC"
          }
        });
        root.style.setProperty("--themeColor", "#06367C");
        root.style.setProperty("--btHoverColor", "#3B5284");
        root.style.setProperty("--btActiveColor", "#3B5284");
        root.style.setProperty("--hoverColor", "#E7E8ED");
        root.style.setProperty("--tableHeadColor", "#f2f3f7");
        root.style.setProperty("--fontThemeColor", "#0266CC");
      } else {
        cssVars({
          variables: {
            "--themeColor": "#a80100",
            "--btHoverColor": "#c40d0c",
            "--btActiveColor": "#8b0100",
            "--hoverColor": "#f8e2e1",
            "--tableHeadColor": "#f8f5f5",
            "--fontThemeColor": "#a80100"
          }
        });
        root.style.setProperty("--themeColor", "#a80100");
        root.style.setProperty("--btHoverColor", "#c40d0c");
        root.style.setProperty("--btActiveColor", "#8b0100");
        root.style.setProperty("--hoverColor", "#f8e2e1");
        root.style.setProperty("--tableHeadColor", "#f8f5f5");
        root.style.setProperty("--fontThemeColor", "#a80100");
      }
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
