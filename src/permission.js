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

  let urlData = window.location.href.split("?");
  let urlObj = {};
  if (urlData[1]) {
    let urlDataArr = urlData[1].split("&");
    urlDataArr.forEach(item => {
      urlObj[item.split("=")[0]] = item.split("=")[1];
    });
  }

  if (to.path !== "/login") {
    if (urlObj.code) {
      await store
        .dispatch("user/autoLogin", urlObj)
        .then(response => {
          window.history.pushState(null, null, "?");
          next({ path: "/" });
        })
        .catch(error => {
          console.log(error);
          window.history.pushState(null, null, "?");
          next({ path: "/login" });
        });
    } else if (urlObj.temptoken) {
      // 如果是工具后台或运营后台直接登录
      await store
        .dispatch("user/thirdlogin", urlObj)
        .then(() => {
          window.history.pushState(null, null, "?");
          next({ path: "/" });
        })
        .catch(error => {
          window.history.pushState(null, null, "?");
          next({ path: "/login" });
        });
    } else if (getToken()) {
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
