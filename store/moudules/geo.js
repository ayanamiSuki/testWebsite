const state = () => ({
  position: {},
  hotPlace: []
});

const mutations = {
  setPosition(state, val) {
    state.position = val;
  },
  getHotPlace(state, val) {
    state.hotPlace = val;
  }
};

const actions = {
  setPosition: ({ commit }, position) => {
    commit("setPosition", position);
  },
  getHotPlace: ({ commit, hotPlace }) => {
    commit("getHotPlace", hotPlace);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
