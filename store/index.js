export const state = () => ({
  user: null,
  token: null
});

export const mutations = {
  login(state, user) {
    state.user = user;
    state.token = user.apiToken;
  },
  logout(state) {
    state.user = null;
    state.token = null;
  }
};

export const getters = {
  isAuth(state) {
    return state.token;
  },
  authUser(state) {
    return state.user;
  }
};
