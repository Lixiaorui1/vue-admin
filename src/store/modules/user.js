import { loginAPI, getAuthor, autoLogin, thirdlogin } from "@/api/user";
import {
  getToken,
  removeToken,
  removePayIntergral,
  setCookie,
  setInfo,
  getCookie
} from "@/utils/auth";
//use for logout
import { resetRouter } from "@/router";
import router from "@/router";
import md5 from "js-md5";

const getDefaultState = () => {
  return {
    token: getToken(),
    userName: getCookie("userName"),
    name: "",
    roleType: Number(getCookie("roleType")),
    authBool: getCookie("authBool")
  };
};

const state = getDefaultState();

const mutations = {
  RESET_STATE: state => {
    Object.assign(state, getDefaultState());
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_ROLETYPE: (state, roleType) => {
    state.roleType = roleType;
  },
  SET_AUTH_BOOL: (state, authBool) => {
    state.authBool = authBool;
  }
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { userName, passWord } = userInfo;
    const mdPsw = md5(passWord);
    return new Promise((resolve, reject) => {
      loginAPI({ userName: userName.trim(), passWord: mdPsw })
        .then(response => {
          const data = response.entity;
          commit("SET_NAME", data.userName);
          commit("SET_ROLETYPE", data.role);
          commit("SET_AUTH_BOOL", data.authBool);
          const obj = {
            userName: data.usrName,
            roleType: data.role,
            authBool: data.authBool
          };
          setInfo(obj);
          resolve(response);
        })
        .catch(error => {
          console.log(error);
          reject(error);
        });
    });
  },

  // 用户授权请求
  getAuthor({ commit }, data) {
    return new Promise((resolve, reject) => {
      getAuthor({
        ReturnUrl:
          window.location.origin +
          "/index.html" +
          "?systemtype=0&oauthlt=1&ReturnType=1"
      })
        .then(response => {
          window.location.href = response.entity;
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // 用户授权登录
  autoLogin({ commit }, data) {
    return new Promise((resolve, reject) => {
      let LoginData = {
        code: data.code,
        ReturnUrl:
          window.location.origin +
          "/index.html" +
          "?systemtype=0&oauthlt=1&ReturnType=1",
        type: 1
      };
      autoLogin(LoginData)
        .then(response => {
          const { entity } = response;
          commit("SET_NAME", entity.usrName);
          commit("SET_ROLETYPE", entity.role);
          commit("SET_AUTH_BOOL", entity.authBool);
          const obj = {
            userName: entity.usrName,
            roleType: entity.role,
            authBool: entity.authBool
          };
          setInfo(obj);
          resolve();
        })
        .catch(error => {
          console.log(error);
          reject(error);
        });
    });
  },

  // 从运营平台跳转
  thirdlogin({ commit }, data) {
    return new Promise((resolve, reject) => {
      thirdlogin(data)
        .then(response => {
          const { entity } = response;
          commit("SET_NAME", entity.usrName);
          commit("SET_ROLETYPE", entity.role);
          commit("SET_AUTH_BOOL", entity.authBool);
          const obj = {
            userName: entity.usrName,
            roleType: entity.role,
            authBool: entity.authBool
          };
          setInfo(obj);
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // remove token,use for logout
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken(); // must remove  token  first
      removePayIntergral(); // 移除积分消耗
      commit("RESET_STATE");
      resolve();
      resetRouter();
    });
  },
  checkToken({ commit, state }) {
    if (state.token != "undefined" && state.token != undefined) {
      router.push("/");
    }
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
