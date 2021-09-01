export const AUTH_MUTATIONS = {
  SET_USER: "SET_USER",
  SET_PAYLOAD: "SET_PAYLOAD",
  LOGOUT: "LOGOUT"
};

export const state = () => ({
  access_token: null, // JWT access token
  user: null, // user
  user_id: null
});

export const mutations = {
  // store the logged in user in the state
  [AUTH_MUTATIONS.SET_USER](state, user) {
    state.user = user;
    state.user_id = user.id;
  },

  // store new or updated token fields in the state
  [AUTH_MUTATIONS.SET_PAYLOAD](state, access_token) {
    state.access_token = access_token;
  },

  // clear our the state, essentially logging out the user
  [AUTH_MUTATIONS.LOGOUT](state) {
    state.user_id = null;
    state.user = null;
    state.access_token = null;
  }
};

export const actions = {
  async login({ commit, dispatch }, credentials) {
    // make an API call to login the user with an email address and password
    try {
      const { status, data } = await this.$axios.post("login", credentials);
      if (status == 200 && data.status == true) {
        commit(AUTH_MUTATIONS.SET_USER, data.data);
        commit(AUTH_MUTATIONS.SET_PAYLOAD, data.data.apiToken);
        return {
          result: true,
          msg: "Login success"
        };
      }
      return {
        result: false,
        msg: data.message
      };
    } catch (e) {
      return {
        result: false,
        msg: e.message
      };
    }
  },

  async register({ commit }, request_data) {
    try {
      // make an API call to register the user
      const { status, data } = await this.$axios.post("register", request_data);

      if (data.status == true) {
        // commit the user and tokens to the state
        commit(AUTH_MUTATIONS.SET_USER, data.data);
        commit(AUTH_MUTATIONS.SET_PAYLOAD, data.data.apiToken);
        return {
          result: true,
          msg: "Register"
        };
      }
      return {
        result: false,
        msg: data.message
      };
    } catch (error) {
      return {
        result: false,
        msg: error.message
      };
    }
  },

  async refresh({ commit, state }) {
    const { refresh_token } = state;

    // make an API call using the refresh token to generate a new access token
    const {
      data: {
        data: { payload }
      }
    } = await this.$axios.post("/api/auth/refresh", { refresh_token });

    commit(AUTH_MUTATIONS.SET_PAYLOAD, payload);
  },

  logout({ commit, state }) {
    commit(AUTH_MUTATIONS.LOGOUT);
  }
};

export const getters = {
  isAuthenticated: state => state.access_token && state.access_token !== "",
  authUser: state => state.user,
  authId: state => state.user_id
};
