export default function({ store, redirect }) {
  if (store.state.auth.access_token == null) {
    return redirect({ name: "login" });
  }
}
