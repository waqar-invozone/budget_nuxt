<template>
  <section class="p-4 md:flex w-full md:justify-center">
    <div v-if="isAuthenticated" class="md:w-1/4">
      <box>
        <h1 class="text-md">Welcome {{ authUser.username }}</h1>
      </box>
    </div>
    <div v-else class="md:w-1/4">
      <box>
        Please login to continue
      </box>
    </div>
  </section>
</template>

<script>
export default {
  name: "Home",
  head() {
    return {
      title: "Home"
    };
  }
};
</script>
