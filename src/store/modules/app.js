import { DEFAULT_THEME_COLOR } from "@/const";

const getDefaultState = () => {
  return {
    isRouterShow: true,
    defultTheme: { ...DEFAULT_THEME_COLOR },
    themeColor: localStorage.getItem("themeColor")
      ? JSON.parse(localStorage.getItem("themeColor"))
      : { ...DEFAULT_THEME_COLOR },
    visitedViews: localStorage.getItem("visitedViews")
      ? JSON.parse(localStorage.getItem("visitedViews"))
      : []
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
  },
  ADD_VISITED_VIEWS: (state, data) => {
    if (state.visitedViews.findIndex(item => item.path === data.path) === -1) {
      state.visitedViews.push({
        name: data.name,
        path: data.path
      });
      localStorage.setItem("visitedViews", JSON.stringify(state.visitedViews));
    }
  },
  DEL_VISITED_VIEWS: (state, data) => {
    state.visitedViews = state.visitedViews.filter(
      item => item.path !== data.path
    );
    localStorage.setItem("visitedViews", JSON.stringify(state.visitedViews));
  },
  SET_VISITED_VIEWS: (state, data) => {
    state.visitedViews = data;
    localStorage.setItem("visitedViews", JSON.stringify(state.visitedViews));
  }
};

const actions = {
  setRouterShow({ commit }, data) {
    commit("SET_ROUTER_SHOW", data);
  },
  setThemeColor({ commit }, data) {
    commit("SET_THEME_COLOR", data);
  },
  resetThemeColor({ commit }) {
    commit("RESET_STATE");
  },
  addVisitedViews({ commit }, data) {
    commit("ADD_VISITED_VIEWS", data);
  },
  delVisitedViews({ commit }, data) {
    commit("DEL_VISITED_VIEWS", data);
  },
  setVisitedViews({ commit }, data) {
    commit("SET_VISITED_VIEWS", data);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
