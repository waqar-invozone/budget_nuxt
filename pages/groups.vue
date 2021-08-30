<template>
  <section class="w-full">
    <alert
      :message="alert.message"
      :type="alert.type"
      @clear="alert.message = ''"
    ></alert>
    <h1 class="text-lg font-bold">All Groups</h1>
    <hr class="mb-3" />

    <box class="mb-3">
      <button
        class="text-white px-2 py-1 bg-blue-500 hover:bg-blue-700 rounded"
        @click="$refs.addGroup.show()"
      >
        Add Group
      </button>
    </box>

    <div v-if="groups.length">
      <div class="grid md:grid-cols-4 md:gap-x-2 mb-2">
        <box
          v-for="group in groups"
          :key="group.id"
          :heading="group.name"
          type="col"
          class="mb-2"
        >
          <ul>
            <li v-for="user in group.users" :key="user.id">
              {{ user.username }}
              <span class="text-gray-400">{{
                user.id == authId ? " ~you" : ""
              }}</span>
            </li>
          </ul>

          <template v-slot:footer>
            <div class="border-t p-2">
              <button
                class="bg-blue-400 px-2 py-1 text-white rounded"
                @click="selectGroupForEdit(group)"
              >
                Edit
              </button>
              <button
                class="bg-blue-600 px-2 py-1 text-white rounded"
                @click="showAddFriendPopup(group)"
              >
                Add Friend
              </button>
              <button
                class="bg-red-400 px-2 py-1 text-white rounded"
                v-if="isCreator(group)"
                @click="deleteGroup(group.id)"
              >
                Delete
              </button>
            </div>
          </template>
        </box>
      </div>
    </div>
    <div v-else>
      <box>
        <p>No group made yet</p>
      </box>
    </div>
    <!-- Add Group PopUp -->
    <pop-up ref="addGroup" heading="Add new group">
      <template v-slot:content>
        <form-group label="Group Name :" id="name" inline="true">
          <input
            v-model="new_group"
            type="text"
            id="name"
            placeholder="New Group"
            class="w-full border-b border-gray-200 focus:outline-none focus:border-blue-500"
            required
          />
        </form-group>
      </template>
      <template v-slot:action>
        <button
          type="button"
          class="px-4 py-2 bg-green-500 hover:bg-green-600 rounded text-white"
          @click="addGroup"
        >
          Add
        </button>
      </template>
    </pop-up>

    <!-- Edit Group PopUp -->
    <pop-up ref="editGroup" :heading="`Edit Group : ${edit_group_title}`">
      <template v-slot:content>
        <form-group label="Group Name :" id="edit-name" inline="true">
          <input
            v-model="edit_group.name"
            type="text"
            id="edit-name"
            placeholder="Group Name"
            class="w-full border-b border-gray-200 focus:outline-none focus:border-blue-500"
            required
          />
        </form-group>
      </template>
      <template v-slot:action>
        <button
          type="button"
          class="px-4 py-2 bg-green-500 hover:bg-green-600 rounded text-white"
          @click="updateGroup"
        >
          Save
        </button>
      </template>
    </pop-up>

    <!-- Add Friend PopUp -->
    <pop-up ref="addFriend" :heading="`Add friend to ${edit_group_title}`">
      <template v-slot:content>
        <form-group label="Group Name :" id="name" inline="true">
          <!-- show list of friends not already in the group -->
          <select
            class="w-full border border-gray-500 p-1 rounded"
            v-model="userIdToAddToGroup"
          >
            <option value="">Select Friend</option>
            <option
              :value="friend.id"
              v-for="friend in friends"
              :key="friend.id"
              v-text="friend.username"
            ></option>
          </select>
        </form-group>
      </template>
      <template v-slot:action>
        <button
          type="button"
          class="px-4 py-2 bg-green-500 hover:bg-green-600 rounded text-white"
          @click="addUserToGroup()"
        >
          Add
        </button>
      </template>
    </pop-up>
  </section>
</template>

<script>
export default {
  name: "Groups",
  middleware: ["auth"],
  data() {
    return {
      new_group: "",
      edit_group_title: "",
      edit_group: {
        name: null,
        id: null
      },
      userIdToAddToGroup: 0,
      friends: [],
      groups: [],
      alert: {
        message: "",
        type: "error"
      }
    };
  },
  mounted() {
    this.getGroups();
    this.getFriends();
  },
  methods: {
    async getGroups() {
      try {
        let res = await this.$axios.$get("groups", this.hedaerOptions);

        this.groups = [...res];
      } catch (error) {
        console.error(error.message);
      }
    },
    async getFriends() {
      try {
        let { requests, friends } = await this.$axios.$get(
          "friends/" + this.authId
        );
        let ids = requests.reduce((acc, item) => {
          if (item.status == "accept") {
            if (item.userId == this.authId) acc.push(item.friendId);
            acc.push(item.userId);
          }
          return acc;
        }, []);

        this.friends = friends.filter(item => ids.includes(item.id));
      } catch (e) {
        console.error(e.message);
      }
    },

    async addGroup() {
      try {
        if (this.new_group.length > 0) {
          let res = await this.$axios.$post(
            "groups",
            {
              name: this.new_group,
              createdBy: this.authUser.id
            },
            this.hedaerOptions
          );
          if (res.status) {
            this.new_group = "";
            this.makeAlert("Group added", "success");
            this.getGroups();
          } else {
            this.makeAlert(res.message);
          }
        } else {
          this.makeAlert("Group Name field is required.");
        }
      } catch (error) {
        console.error(error.message);
      }
      this.$refs.addGroup.hide();
    },
    async updateGroup() {
      try {
        const group_id = this.edit_group.id;
        let res = await this.$axios.$put(
          "groups/" + group_id,
          this.edit_group,
          this.hedaerOptions
        );
        if (res.status == true && res.updated) {
          this.groups[
            this.groups.findIndex(item => item.id == group_id)
          ].name = this.edit_group.name;
          this.clearEditGroup();
          this.makeAlert("Updated successfully", "success");
        }
      } catch (error) {
        console.error(error.message);
      }
    },
    async deleteGroup(group_id) {
      try {
        let res = await this.$axios.$delete(
          "groups/" + group_id,
          this.hedaerOptions
        );
        if (res.status == true) {
          this.makeAlert("Group deleted successfully", "success");
          this.groups.splice(
            this.groups.findIndex(item => item.id == group_id),
            1
          );
        }
      } catch (error) {
        console.error(error.message);
      }
    },
    async addFriendToGroup() {
      await this.$axios.$post();
    },
    async addUserToGroup() {
      try {
        let group = this.groups.find(item => item.id == this.edit_group.id);
        let user = this.friends.find(
          item => item.id == this.userIdToAddToGroup
        );

        if (group.users.find(item => item.id == this.userIdToAddToGroup)) {
          return this.makeAlert("User already in group");
        }

        let res = await this.$axios.$post(
          "/groups/user/" + this.edit_group.id + "/" + this.userIdToAddToGroup
        );

        if (res) {
          group.users.push(user);
          this.clearEditGroup();
          this.$refs.addFriend.hide();
          this.userIdToAddToGroup = "";
          return this.makeAlert("User added in group", "success");
        }
      } catch (e) {
        console.error(e.message);
        this.makeAlert("Something went wrong");
      }
    },
    selectGroupForEdit(group, showpopup = true) {
      const { id, name, ...other } = group;
      this.edit_group = { id, name };
      this.edit_group_title = name;
      if (showpopup) this.$refs.editGroup.show();
    },
    clearEditGroup() {
      this.edit_group = { id: null, name: null };
      this.edit_group_title = "";
      this.$refs.editGroup.hide();
    },
    makeAlert(msg, type = "error") {
      this.alert.message = msg;
      this.alert.type = type;
    },
    isCreator(group) {
      return this.authId == group.creator.id;
    },
    showAddFriendPopup(group) {
      this.$refs.addFriend.show();
      this.selectGroupForEdit(group, false);
    }
  },
  computed: {}
};
</script>
