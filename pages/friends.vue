<template>
  <section class="w-full">
    <alert
      :message="alert.message"
      :type="alert.type"
      @clear="alert.message = ''"
    ></alert>

    <!-- Tabs List -->
    <box class="mb-3">
      <button
        type="button"
        :class="[
          isActive == 'list' ? 'bg-blue-500 text-white' : 'border border-blue'
        ]"
        class="px-2 py-1 text-sm md:text-md hover:bg-blue-700 hover:text-white rounded mr-1 md:mr-2"
        @click="isActive = 'list'"
      >
        Friends List
      </button>

      <button
        type="button"
        :class="[
          isActive == 'requests'
            ? 'bg-blue-500 text-white'
            : 'border border-blue'
        ]"
        class="px-2 py-1  hover:bg-blue-700 hover:text-white rounded mr-1 md:mr-2"
        @click="isActive = 'requests'"
      >
        Friend Requests
      </button>

      <button
        type="button"
        :class="[
          isActive == 'add' ? 'bg-blue-500 text-white' : 'border border-blue'
        ]"
        class="px-2 py-1  hover:bg-blue-700 hover:text-white rounded"
        @click="isActive = 'add'"
      >
        Add Friend
      </button>
    </box>

    <!-- Tabs Content -->

    <!-- List of friends -->
    <box v-if="isActive == 'list'">
      <ul v-if="friends.length" class="list-disc ml-4">
        <li v-for="friend in friends" :key="friend.id">
          {{ friend.username }} - {{ friend.email }}
        </li>
      </ul>
      <p v-else>You have no friend yet.</p>
    </box>

    <!-- List of friend request end -->

    <template v-if="isActive == 'requests'">
      <div v-if="request_list.length" class="w-full">
        <box v-for="request in request_list" :key="request.userId" type="col">
          <div>
            <b>Request From : </b> {{ findUser(request.userId).username }}
          </div>
          <div><b> To : </b> {{ findUser(request.friendId).username }}</div>
          <div><b>Status : </b> {{ request.status }}</div>
          <div
            v-if="request.friendId == authId && request.status == 'pending'"
            class="mt-2"
          >
            <button
              class="px-2 py-1 bg-green-500 text-white"
              @click="acceptRequest(request)"
            >
              Accept
            </button>
            <button
              class="px-2 py-1 bg-red-500 text-white"
              @click="rejectRequest(request)"
            >
              Reject
            </button>
          </div>
        </box>
      </div>
      <box v-else>No friend request</box>
    </template>

    <!-- Add friend Request -->

    <box v-if="isActive == 'add'" type="col" class="md:w-1/2 mx-auto">
      <div class="flex mb-4">
        <input
          type="text"
          v-model="search.slug"
          placeholder="Search for friend"
          class="p-2 focus:outline-none border-b flex-grow shadow-inner"
        />
        <button @click="searchUser" class="px-2 py-1 bg-blue-500 text-white ">
          Search
        </button>
      </div>

      <div v-if="search.results.length > 0">
        <h1 class="text-md mb-2 font-bold">Search Results</h1>
        <box v-for="user in search.results" :key="user.id" class="mb-2">
          <p class="flex-grow">
            <b>{{ user.username }}</b> <br />
            {{ user.email }}
          </p>
          <button
            class="bg-green-500 text-white px-2 py-1 rounded"
            @click="addFriend(user)"
          >
            Add Friend
          </button>
        </box>
      </div>
      <div v-else-if="search.slug.length > 0">
        <p>No result found</p>
      </div>
    </box>
  </section>
</template>

<script>
import Box from "../components/Box.vue";
export default {
  components: { Box },
  name: "Friends",
  middleware: ["auth"],
  data() {
    return {
      isActive: "list",
      search: {
        slug: "",
        results: []
      },
      request_list: [],
      user_list: []
    };
  },
  mounted() {
    this.getUsersList();
  },
  methods: {
    async getUsersList() {
      try {
        let { requests, friends } = await this.$axios.$get(
          "friends/" + this.authId
        );

        if (requests && friends) {
          this.request_list = [...requests];
          this.user_list = [...friends];
        }
      } catch (e) {
        console.error(e.message);
      }
    },
    async searchUser() {
      try {
        if (this.search.slug != "") {
          let data = await this.$axios.$get(
            "/search/users/" + this.search.slug
          );
          this.search.results = data;
        } else {
          this.makeAlert("Search input is empty");
        }
      } catch (error) {
        console.error(error.message);
      }
    },
    async addFriend(user) {
      try {
        if (true) {
          // add condition to check if its already in friends list
          let data = await this.$axios.$post("/friends/add/" + user.id);

          this.makeAlert("Request submit successfully", "success");
        } else {
          this.makeAlert("Search input is empty");
        }
      } catch (error) {
        console.error(error.message);
      }
    },
    async acceptRequest(req) {
      let res = await this.$axios.$post("/friends/accept/" + req.userId);
      if (res.status == true) {
        req.status = "accept";
      }
    },
    async rejectRequest(req) {
      let res = await this.$axios.$post("/friends/reject/" + req.userId);
      if (res.status == true) {
        req.status = "reject";
      }
    },
    findUser(id) {
      return this.user_list.find(item => item.id == id);
    }
  },

  computed: {
    friends() {
      let ids = this.request_list.reduce((acc, item) => {
        if (item.status == "accept") {
          if (item.userId == this.authId) acc.push(item.friendId);
          acc.push(item.userId);
        }
        return acc;
      }, []);

      return this.user_list.filter(item => ids.includes(item.id));
    }
  }
};
</script>
