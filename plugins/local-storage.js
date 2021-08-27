import createPersistedState from "vuex-persistedstate";
import * as Cookies from "js-cookie";
import cookie from "cookie";

export default ({ store, req, isDev }) => {
  createPersistedState({
    key: "authentication-cookie",
    paths: ["auth.access_token", "auth.user", "auth.user_id"],
    storage: {
      getItem: key =>
        process.client
          ? Cookies.get(key)
          : cookie.parse(req.headers.cookie || "")[key],
      setItem: (key, value) =>
        Cookies.set(key, value, { expires: 14, secure: !isDev }),

      removeItem: key => Cookies.remove(key)
    }
  })(store);
};
