<template>
  <section class="w-full">
    <box class="mb-4">
      <nuxt-link
        :to="{ name: 'expenses-add' }"
        class="bg-blue-500 text-white p-3 border-blue-400 hover:bg-blue-700 rounded border"
      >
        New Expense
      </nuxt-link>

      <div class="ml-2 align-middle">
        <b>Total Expense: ${{ totalExpense }}</b>
      </div>
    </box>

    <h2 class="text-lg font-bold mb-2">Your Expenses</h2>

    <div v-if="list.length > 0">
      <div class="grid md:gap-x-2 md:grid-cols-3">
        <expense-box
          v-for="item in list"
          :key="item.id"
          :expense="item"
          @delete="deleteExpense"
        ></expense-box>
      </div>
    </div>

    <div v-else>
      <box>
        <p>No Record found</p>
      </box>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Expenses",
  middleware: ["auth"],
  head() {
    return {
      title: "Expenses"
    };
  },
  data() {
    return {
      list: []
    };
  },
  async mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      try {
        let data = await this.$axios.$get("/expenses", this.headerOptions);

        this.list = [...data];
      } catch (err) {
        console.log(err);
        this.list = [];
      }
    },
    async deleteExpense(expense) {
      let res = await this.$axios.$delete(
        "/expenses/" + expense.id,
        this.headerOptions
      );
      if (res.status == true) {
        this.list.splice(
          this.list.findIndex(item => item.id == expense.id),
          1
        );
      }
    }
  },
  computed: {
    ...mapGetters(["isAuth"]),
    headerOptions() {
      return {
        headers: {
          token: this.isAuth.token
        }
      };
    },
    totalExpense() {
      if (this.list.length > 0) {
        return this.list.reduce((acc, item) => {
          return acc + item.amount / 1;
        }, 0);
      }
      return 0;
    }
  }
};
</script>
