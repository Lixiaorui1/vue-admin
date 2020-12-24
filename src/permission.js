import router from "./router";
import NProgress from "nprogress"; // progress bar
import store from "./store";
import "nprogress/nprogress.css"; // progress bar style
import { getToken } from "@/utils/auth";
NProgress.configure({ showSpinner: false }); // NProgress Configuration
/*
 *@author: liujinming
 *@date: 2020-05-19 11:36:08
 *@description: 需要重新构建登录权限的问题
 */
router.beforeEach(async (to, from, next) => {
  NProgress.start();

  if (to.path !== "/login") {
    if (getToken()) {
      next();
    } else {
      next({
        path: "/login"
      });
    }
  } else {
    next();
  }
  NProgress.done();
});

router.afterEach(() => {});
