<template>
  <section class="p-4 md:flex w-full md:justify-center">
    <div v-if="isAuthenticated">
      <h1>Welcome {{ authUser.username }}</h1>
    </div>
    <div v-else class="md:w-1/4">
      <box>
        Please login to continue
      </box>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Home",
  head() {
    return {
      title: "Home"
    };
  },
  computed: {
    ...mapGetters({
      isAuthenticated: "auth/isAuthenticated",
      authUser: "auth/authUser"
    })
  }
};
</script>
