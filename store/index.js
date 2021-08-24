export const state = () => ({
  token: false
});

export const mutations = {
  login(state, token) {
    state.token = token;
  },
  logout(state) {
    state.token = false;
  }
};

export const getters = {
  isAuth(state) {
    return state.token;
  }
};
