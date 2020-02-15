const state = () => ({
  menu: []
});

const mutations = {
  getMenu(state, val) {
    state.menu = val;
  }
};

const actions = {
  getMenu: ({ commit, menu }) => {
    commit("getMenu", menu);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
