<template>
  <section>
    <label
      for=""
      class="block mt-3 text-sm text-gray-700 text-center font-semibold"
    >
      Login
    </label>
    <alert
      :message="error.message"
      :type="error.type"
      @clear="error.message = ''"
    ></alert>
    <form method="#" action="#" @submit.prevent="login" class="mt-10">
      <div>
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="
            mt-1
            block
            w-full
            p-2
            border-none
            bg-gray-200
            h-11
            shadow-lg
            hover:bg-gray-100
            focus:bg-gray-100 focus:outline-none focus:ring
          "
          required
        />
      </div>

      <div class="mt-7">
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="
            mt-1
            p-2
            block
            w-full
            border-none
            bg-gray-200
            h-11
            shadow-lg
            hover:bg-gray-100
            focus:bg-gray-100 focus:outline-none focus:ring
          "
          required
        />
      </div>

      <div class="mt-7 flex">
        <div class="w-full text-right">
          <a
            class="underline text-sm text-gray-600 hover:text-gray-900"
            href="#"
          >
            Forgot Password?
          </a>
        </div>
      </div>

      <div class="mt-7">
        <button
          class="
            bg-blue-500
            w-full
            py-3
            rounded-xl
            text-white
            shadow-xl
            hover:shadow-inner
            focus:outline-none
            transition
            duration-500
            ease-in-out
            transform
            hover:-translate-x hover:scale-105
          "
        >
          Login
        </button>
      </div>

      <div class="mt-7">
        <div class="flex justify-center items-center">
          <label class="mr-2">Not joined yet?</label>
          <nuxt-link
            to="/register"
            class="
              text-blue-500
              transition
              duration-500
              ease-in-out
              transform
              hover:-translate-x hover:scale-105
            "
          >
            Register
          </nuxt-link>
        </div>
        <div class="flex justify-center items-center">
          <nuxt-link :to="{ name: 'index' }"> Back to Home</nuxt-link>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
export default {
  layout: "auth",
  name: "login",
  data() {
    return {
      email: "",
      password: "",
      error: {
        message: "",
        type: ""
      }
    };
  },
  methods: {
    async login() {
      try {
        const credentials = {
          email: this.email,
          password: this.password
        };

        const { result, msg } = await this.$store.dispatch(
          "auth/login",
          credentials
        );
        if (result) {
          return this.$router.push("/");
        }
        this.error.message = msg;
      } catch (e) {
        this.error.message = e.message;
        console.error(e.trace);
      }
    }
  }
};
</script>
