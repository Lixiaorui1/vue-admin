<template>
  <div class="side_bar_container">
    <div class="local_time">
      {{ localTime }}
      <div class="symbol" v-if="showSymbol">:</div>
    </div>
    <el-menu
      class="el_menu_list"
      text-color="#404040"
      active-text-color="#fff"
      :default-active="activeMenu"
      ref="menu"
      router
      @select="select"
    >
      <siderbar-item
        v-for="item in menuList"
        :row="item"
        :key="item.name"
      ></siderbar-item>
    </el-menu>
  </div>
</template>

<script>
import { USER_MENU } from "@/const";
import siderbarItem from "./sidebarItem";
import moment from "moment";
export default {
  name: "Sidebar",
  components: { siderbarItem },
  data() {
    return {
      activeMenu: "",
      openMenu: "",
      time: null,
      localTime: "",
      showSymbol: false
    };
  },
  computed: {
    menuList() {
      const list = this.$router.options.routes.find(item => item.path === "/")
        .children;
      return list
        .filter(item => !(item.meta && item.meta.noMenu))
        .map(item => ({ ...item, path: `/${item.path}` }));
    }
  },
  watch: {
    $route: {
      handler(newRouter, oldRouter) {
        // 监听路由变化（刷新或浏览器后退按钮的时候高亮）
        this.activeMenu = this.$route.path;
      },
      immediate: true
    }
  },
  created() {
    this.timer = setInterval(() => {
      this.getTime();
      this.showSymbol = !this.showSymbol;
    }, 1000);
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
  methods: {
    getTime() {
      const week = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"][
        Number(moment().format("e"))
      ];
      const date = moment().format("YYYY-MM-DD");
      const hours = moment().format("HH");
      const minutes = moment().format("mm");
      this.localTime = `${date}, ${hours} ${minutes} ${week}`;
    },
    select(index) {
      // if (this.activeMenu === index) {
      this.$store.dispatch("app/setRouterShow", false);
      this.$nextTick(() => {
        this.$store.dispatch("app/setRouterShow", true);
        document.title = this.$route.name;
      });
      // }
      this.activeMenu = index;
    }
  }
};
</script>

<style lang="scss">
@import "~@/styles/variables.scss";
.side_bar_container {
  position: absolute;
  top: $headerHeight;
  left: 0;
  width: $sideBarWidth;
  height: calc(100% - #{$headerHeight});
  background-color: #fff;
  box-shadow: 1px 0 6px 0 rgba(0, 21, 41, 0.09);
  .local_time {
    position: absolute;
    z-index: 9;
    top: 10px;
    left: 19px;
    font-size: 14px;
    .symbol {
      position: absolute;
      left: 102px;
      top: -1px;
    }
  }
  .el_menu_list {
    border: none;
    padding: 35px 0 16px 0;
    box-sizing: border-box;
    .el-submenu__title {
      .iconfont {
        color: #404040;
        margin-right: 8px;
      }
      // .el-submenu__icon-arrow {
      //   display: none;
      // }
      &:hover {
        background-color: var(--hoverColor);
      }
    }
    .el-submenu {
      &.is-opened.is-active {
        background: #f0f3f7;
        .el-submenu__title {
          span {
            font-family: PingFangSC-Regular;
            font-weight: 900;
            font-size: 16px;
          }
        }
        .el-menu-item {
          &.is-active {
            font-family: PingFangSC-Regular;
            font-weight: 900;
            font-size: 14px;
          }
        }
        .el-menu--inline {
          background: #f0f3f7;
        }
      }
      &.is-active:not(.is-opened) {
        background: var(--hoverColor);
        border-right: 4px solid var(--themeColor);
        span {
          font-family: PingFangSC-Regular;
          font-weight: 900;
          font-size: 16px;
        }
        .el-menu-item.is-active {
          border-right: none;
        }
      }
    }
    .el-menu--inline {
      .el-menu-item {
        padding-left: 48px !important;
      }
    }
    .el-menu-item {
      height: 38px;
      line-height: 38px;
      padding-left: 20px !important;
      min-width: 0;
      .iconfont {
        color: #404040;
        margin-right: 8px;
        vertical-align: top;
      }
      span {
        font-family: PingFangSC-Regular;
        font-size: 14px;
      }
      &:hover {
        background-color: var(--hoverColor);
      }
      &.is-active {
        font-family: PingFangSC-Regular;
        font-weight: 900;
        font-size: 16px;
        .iconfont {
          font-weight: normal;
        }
        span {
          font-size: 16px;
        }
      }
    }
  }
}
</style>
