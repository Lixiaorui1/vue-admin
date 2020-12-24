import {
  getToken,
  removeToken,
  setInfo,
  setToken,
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
  login({ commit }, userInfo) {
    const { userName, passWord } = userInfo;
    const mdPsw = md5(passWord);
    return new Promise((resolve, reject) => {
      commit("SET_NAME", userName);
      const obj = {
        userName
      };
      setInfo(obj);
      setToken(passWord);
      resolve();
    });
  },

  // remove token,use for logout
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken(); // must remove  token  first
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
