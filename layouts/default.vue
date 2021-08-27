<template>
  <main class="w-full">
    <navbar></navbar>
    <section class="px-3 flex flex-row">
      <Nuxt />
    </section>
  </main>
</template>

<script>
import Vue from "vue";
import global from "~/mixins.js/global.js";
Vue.mixin(global);
export default {
  name: "AppLayout"
};
</script>
