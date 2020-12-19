/*
 *@author: liujinming
 *@date: 2020-05-22 15:36:06
 *@description:  axios请求方法封装库
 */

import axios from "axios";
import { MessageBox, Message } from "element-ui";
import store from "@/store";
import { getToken, setToken } from "@/utils/auth";

export const URL_ENV = {
  // development: "http://192.168.12.156:9090", // 刘伟
  development: "http://114.55.106.156:9090", // 测试
  // development: "http://192.168.11.61:9090", // 岳佳伟
  // development: "http://47.114.107.2", // 正式服
  test: "http://test.admin.hzyotoy.com/api", // 测试服
  gray: "http://gray.admin.hzyotoy.com/api", // 灰度
  // test: "http://192.168.11.61:9090", // 测试服
  production: "http://smt.admin.hzyotoy.com/api" // 生产
};
const service = axios.create({
  baseURL: URL_ENV[process.env.VUE_APP_CURRENTMODE],
  timeout: 10000, // 10s
  headers: {
    "Content-Type": "application/json;charset=utf-8"
  }
});
// request interceptor
service.interceptors.request.use(
  config => {
    // 请求头携带token
    if (getToken()) {
      // 请求令牌
      config.headers["smt_ad-cookie"] = getToken();
    }
    return config;
  },
  error => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  response => {
    //本地设置token
    if (
      response.config.url.indexOf("/smallTarget/user/login") > -1 ||
      response.config.url.indexOf("/smallTarget/user/other/login") > -1 ||
      response.config.url.indexOf("smallTarget/user/thirdJumpLogin") > -1
    ) {
      if (response.headers["smt_ad-cookie"]) {
        setToken(response.headers["smt_ad-cookie"]);
      }
    }
    const res = response.data;
    //axios 同意错误码处理
    if (res.status == false) {
      Message.closeAll();
      Message({
        message: res.msg || "网络不给力，请稍后再试",
        type: "error",
        duration: 1 * 1000
      });

      //根据错误码进行特殊处理
      if (res.code == 106) {
        Message.closeAll();
        MessageBox.alert(res.msg || "由于您长时间未操作，请重新登录", "信息", {
          confirmButtonText: "确定",
          type: "warning",
          customClass: "message_alert",
          callback: action => {
            store.dispatch("user/resetToken").then(() => {
              location.reload();
            });
          }
        });
      }
      return Promise.reject(new Error(res.msg || "网络不给力，请稍后再试"));
    } else {
      return res;
    }
  },
  error => {
    console.log("err" + error); // for debug
    Message.closeAll();
    Message({
      message: "网络不给力，请稍后再试",
      type: "error",
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

export default service;
