<template>
  <section>
    <!-- component -->
    <nav
      class="
        flex
        w:full
        items-center
        justify-between
        flex-wrap
        bg-white
        py-4
        lg:px-12
        shadow
        mb-4
        border-solid border-t-4 border-blue-700
      "
    >
      <div
        class="
          flex
          justify-between
          lg:w-auto
          w-full
          lg:border-b-0
          pl-6
          pr-2
          md:border-solid md:border-b-2
          border-gray-300
          md:pb-5
          lg:pb-0
        "
      >
        <div class="flex items-center flex-shrink-0 text-gray-800 mr-16">
          <img src="favicon.ico" alt="" class="w-8 h-8" />
          <span class="ml-2 font-semibold text-xl tracking-tight">Budget</span>
        </div>
        <div class="block lg:hidden">
          <button
            id="nav"
            class="
              flex
              items-center
              px-3
              py-2
              border-2
              rounded
              text-blue-700
              hover:text-blue-700 hover:border-blue-700
              focus:outline-0
            "
            @click="toggleMenu"
          >
            <svg
              class="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
      </div>

      <div
        class="
          menu
          w-full
          lg:block
          flex-grow
          lg:flex lg:items-center lg:w-auto lg:px-3
          px-8
        "
        :class="{ hidden: menuHidden }"
      >
        <div class="text-md font-bold text-blue-700 lg:flex-grow"></div>

        <div class="flex flex-col md:flex-row">
          <nuxt-link
            :to="{ name: 'index' }"
            class="
                block
                text-md
                px-4
                ml-2
                py-2
                rounded
                text-blue-700
                font-bold
                hover:text-white
                mt-4
                hover:bg-blue-700
                lg:mt-0
              "
            >Home</nuxt-link
          >
          <template v-if="isAuthenticated">
            <nuxt-link
              :to="{ name: 'friends' }"
              class="
                block
                text-md
                px-4
                ml-2
                py-2
                rounded
                text-blue-700
                font-bold
                hover:text-white
                mt-4
                hover:bg-blue-700
                lg:mt-0
              "
              >Friends</nuxt-link
            >

            <nuxt-link
              :to="{ name: 'groups' }"
              class="
                block
                text-md
                px-4
                ml-2
                py-2
                rounded
                text-blue-700
                font-bold
                hover:text-white
                mt-4
                hover:bg-blue-700
                lg:mt-0
              "
              >Groups</nuxt-link
            >
            <nuxt-link
              :to="{ name: 'expenses' }"
              class="
                block
                text-md
                px-4
                ml-2
                py-2
                rounded
                text-blue-700
                font-bold
                hover:text-white
                mt-4
                hover:bg-blue-700
                lg:mt-0
              "
              >Expenses</nuxt-link
            >

            <a
              href="javascript:void(0)"
              class="
                block
                text-md
                px-4
                py-2
                rounded
                border
                text-blue-900
                ml-2
                font-bold
                mt-4
                lg:mt-0
              "
              v-text="authUser.username"
            ></a>

            <a
              href="javascript:void(0)"
              class="
                block
                text-md
                px-4
                py-2
                rounded
                text-blue-700
                ml-2
                font-bold
                hover:text-white
                mt-4
                hover:bg-blue-700
                lg:mt-0
              "
              @click="logout"
              >Logout</a
            >
          </template>
          <template v-else>
            <nuxt-link
              :to="{ name: 'register' }"
              class="
                block
                text-md
                px-4
                py-2
                rounded
                text-blue-700
                ml-2
                font-bold
                hover:text-white
                mt-4
                hover:bg-blue-700
                lg:mt-0
              "
              >Register</nuxt-link
            >

            <nuxt-link
              :to="{ name: 'login' }"
              class="
                block
                text-md
                px-4
                ml-2
                py-2
                rounded
                text-blue-700
                font-bold
                hover:text-white
                mt-4
                hover:bg-blue-700
                lg:mt-0
              "
              >Login</nuxt-link
            >
          </template>
        </div>
      </div>
    </nav>
  </section>
</template>

<script>
export default {
  data() {
    return {
      menuHidden: true
    };
  },
  mounted() {},
  methods: {
    toggleMenu() {
      if (this.menuHidden) return (this.menuHidden = false);
      return (this.menuHidden = true);
    },
    async logout() {
      await this.$store.dispatch("auth/logout");
      this.$router.push({ name: "login" });
    }
  },
  computed: {}
};
</script>

<style scoped>
.nuxt-link-exact-active {
  font-weight: bold;
  color: #333;
}
.nuxt-link-exact-active:hover {
  color: #fff;
}
</style>
