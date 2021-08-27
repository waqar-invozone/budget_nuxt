<template>
  <section class="w-full">
    <alert
      :message="alert.message"
      :type="alert.type"
      @clear="alert.message = ''"
    ></alert>

    <input type="text" v-model="search.slug" />
    <button @click="searchUser">Search</button>
    <div>
      <p>Search Results</p>
      <div v-for="user in search.results" :key="user.id">
        <b>{{ user.username }} : </b>
        <button @click="addFriend(user)">Add Friend</button>
      </div>
    </div>

    <ul v-if="friends.length">
      <li v-for="friend in friends" :key="friend.id">{{ friend.username }}</li>
    </ul>
    <p v-else>No Friend</p>
  </section>
</template>

<script>
export default {
  name: "Friends",
  middleware: ["auth"],
  data() {
    return {
      search: {
        slug: "",
        results: []
      },
      friends: []
    };
  },
  mounted() {
    this.getUsersList();
  },
  methods: {
    async getUsersList() {
      try {
        this.friends = await this.$axios.$get("friends/" + this.authId);
      } catch (e) {
        console.error(e.message);
      }
    },
    async searchUser() {
      try {
        if (this.search.slug != "") {
          let res = await this.$axios.$get("/search/users/" + this.search.slug);
          if (res.status == 200) {
            this.search.results = res.data;
            this.makeAlert("Got results", "success");
          }
        } else {
          this.makeAlert("Need search");
        }
      } catch (error) {
        console.error(error.message);
      }
    },
    addFriend(user) {
      alert("Adding friend");
    }
  },
  computed: {}
};
</script>
