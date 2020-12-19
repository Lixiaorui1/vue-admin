<template>
  <div class="header">
    <div class="header_title">
      管理后台模板
    </div>
    <el-dropdown
      placement="bottom-end"
      class="right_name_box"
      @command="handleCommeand"
    >
      <span class="el_dropdown_link">
        {{ UserName }}<i class="el-icon-caret-bottom"></i>
      </span>
      <el-dropdown-menu slot="dropdown" class="dropdown_menu">
        <el-dropdown-item command="themeColor">自定义颜色</el-dropdown-item>
        <el-dropdown-item command="loginout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <color-draw :visible.sync="drawer"></color-draw>
  </div>
</template>
<script>
import { getCookie, setCookie } from "@/utils/auth";
import { logout } from "@/api/user";
import { PREDEFINE_COLORS, OPTIONS } from "../const";
import colorDraw from "./colorDraw";
import ColorDraw from "./colorDraw.vue";
export default {
  computed: {
    roleType() {
      return this.$store.state.user.roleType;
    }
  },
  components: { colorDraw },
  data() {
    return {
      GameType: "0",
      UserName: getCookie("UserName"),
      RoleName: "",
      drawer: false,
      options: OPTIONS
    };
  },
  created() {
    this.GameType = this.$store.state.user.gameType
      ? this.$store.state.user.gameType
      : getCookie("RoleType");
    switch (getCookie("RoleType")) {
      case "1":
        this.RoleName = "管理员";
        break;
      case "2":
        this.RoleName = "普通员工";
        break;
      case "3":
        this.RoleName = "代理商";
        break;
    }
  },
  methods: {
    async logout() {
      setCookie("st-cookie", "");
      await logout();
      await this.$store.dispatch("user/resetToken");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
    checkColor() {
      console.log(1);
      this.drawer = true;
    },
    handleCommeand(val) {
      const obj = {
        loginout: this.logout,
        themeColor: this.checkColor
      };
      obj[val]();
    }
  }
};
</script>

<style lang="scss">
@import "~@/styles/variables.scss";
.header {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 4;
  width: 100%;
  line-height: $headerHeight;
  height: $headerHeight;
  margin: 0;
  color: #ffffff;
  font-size: 22px;
  background-color: var(--themeColor);
  box-shadow: 0 1px 4px 0 rgba(0, 21, 41, 0.12);
  .header_title {
    display: inline-block;
    font-weight: normal;
    margin-left: 20px;
    letter-spacing: 1px;
    line-height: 48px;
    height: 50px;
    .icon {
      width: 176px;
      height: 50px;
    }
    .iconfont {
      font-size: 20px;
    }
  }
  .my_integral {
    float: right;
    font-size: 14px;
    font-weight: normal;
    margin-right: 24px;
    .iconfont {
      position: relative;
      top: 2px;
    }
  }
  .right_name_box {
    float: right;
    font-size: 14px;
    margin-right: 20px;
    color: #dbdbdb;
    cursor: pointer;
    .el_dropdown_link {
      display: inline-block;
      height: 100%;
      .el-icon-caret-bottom {
        margin-left: 7px;
      }
    }
    &:hover {
      color: #fff;
    }
  }
  .color_draw {
    .color_txt {
      line-height: 1;
      position: relative;
      top: -14px;
      left: 12px;
    }
  }
}
.dropdown_menu {
  margin-top: 0 !important;
  padding: 0;
  .el-dropdown-menu__item {
    width: 96px;
    height: 44px;
    line-height: 44px;
    padding: 0 14px;
    text-align: center;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #404040;
    border-bottom: 1px solid #ececec;
    &:last-child {
      border-bottom: none;
    }
    &:hover {
      color: #404040;
      background-color: var(--hoverColor);
    }
  }
  .popper__arrow,
  .popper__arrow::after {
    display: none;
  }
}
</style>
