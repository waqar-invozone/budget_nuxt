export default function({ store, app: { $axios }, redirect }) {
  const IGNORED_PATHS = ["/login", "/logout", "/register"];

  $axios.onRequest(config => {
    if (store.state.auth.access_token) {
      config.headers.token = store.state.auth.access_token;
    }

    return config;
  });
}
