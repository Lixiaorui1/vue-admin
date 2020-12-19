import { DEFAULT_THEME_COLOR } from "@/const";

const getDefaultState = () => {
  return {
    isRouterShow: true,
    defultTheme: { ...DEFAULT_THEME_COLOR },
    themeColor: localStorage.getItem("themeColor")
      ? JSON.parse(localStorage.getItem("themeColor"))
      : { ...DEFAULT_THEME_COLOR }
  };
};

const state = getDefaultState();

const mutations = {
  RESET_STATE: state => {
    Object.assign(state, getDefaultState());
  },
  SET_ROUTER_SHOW: (state, data) => {
    state.isRouterShow = data;
  },
  SET_THEME_COLOR: (state, data) => {
    state.themeColor = data;
    localStorage.setItem("themeColor", JSON.stringify(data));
  }
};

const actions = {
  setRouterShow({ commit }, data) {
    commit("SET_ROUTER_SHOW", data);
  },
  setThemeColor({ commit }, data) {
    commit("SET_THEME_COLOR", data);
  },
  resetThemeColor() {
    commit("RESET_STATE");
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
