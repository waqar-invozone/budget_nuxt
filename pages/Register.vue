<template>
  <section>
    <label
      for=""
      class="block mt-3 text-sm text-gray-700 text-center font-semibold"
    >
      Register
    </label>
    <alert
      :message="error.message"
      :type="error.type"
      @clear="error.message = ''"
    ></alert>
    <form @submit.prevent="register" class="mt-10" autocomplete="off">
      <div>
        <input
          type="text"
          v-model="username"
          placeholder="Enter your name"
          name="username"
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

      <div class="mt-7">
        <input
          v-model="email"
          type="email"
          placeholder="Enter your email"
          name="email"
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

      <div class="mt-7">
        <input
          v-model="password"
          type="password"
          placeholder="Enter your password"
          name="password"
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
          Register
        </button>
      </div>
      <div class="mt-7">
        <div class="flex justify-center items-center">
          <label class="mr-2">Already register?</label>
          <NuxtLink
            to="/login"
            class="
              text-blue-500
              transition
              duration-500
              ease-in-out
              transform
              hover:-translate-x hover:scale-105
            "
          >
            Login
          </NuxtLink>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
export default {
  layout: "auth",
  name: "register",
  data() {
    return {
      username: "",
      email: "",
      password: "",
      error: {
        message: "",
        type: ""
      }
    };
  },
  methods: {
    async register() {
      try {
        let { data } = await this.$axios.post("register", {
          username: this.username,
          email: this.email,
          password: this.password
        });

        if (data.status == true) {
          this.$store.commit("login", data.data);
          return this.$router.push("/");
        }
        this.error.message = data.message;
      } catch (err) {
        console.log(err.message);
      }
    }
  }
};
</script>
