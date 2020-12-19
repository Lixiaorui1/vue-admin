import Cookies from "js-cookie";

const state = {
  isRouterShow: true
};

const mutations = {
  SET_ROUTER_SHOW: (state, data) => {
    state.isRouterShow = data;
  }
};

const actions = {
  setRouterShow({ commit }, data) {
    commit("SET_ROUTER_SHOW", data);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
