<template>
  <div class="w-full">
    <section class="flex w-full justify-center">
      <div class="w-full md:w-1/2">
        <alert
          :message="alertMessage"
          :type="alertType"
          @clear="alertMessage = ''"
        ></alert>
        <box heading="Edit Expense">
          <form class="w-full" @submit.prevent="updateExpense">
            <form-group for="type" label="Expense Type :">
              <input
                type="text"
                id="type"
                v-model="type"
                class="w-full focus:bg-gray-100 p-2 focus:outline-none focus:border-blue-600 border-b"
                placeholder="e.g Dinner"
                autofocus
              />
            </form-group>

            <form-group for="amount" label="Expense Amount :">
              <input
                type="number"
                id="amount"
                v-model="amount"
                class="w-full focus:bg-gray-100 p-2 focus:outline-none focus:border-blue-600 border-b"
                placeholder="e.g Your Expense Amount"
              />
            </form-group>

            <form-group for="description" label="Details :">
              <textarea
                id="description"
                v-model="description"
                class="w-full focus:bg-gray-100 p-2 focus:outline-none focus:border-blue-600 border-b"
                placeholder="e.g Your Expense Amount"
              ></textarea>
            </form-group>

            <button
              type="button"
              @click="$router.push('/expenses')"
              class="px-3 py-2 bg-red-500 hover:bg-red-700 text-white rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              class="px-3 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded"
            >
              Save
            </button>
          </form>
        </box>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      expense: Object,
      expense_id: 0,
      alertMessage: "",
      alertType: "",
      type: "",
      amount: 0,
      description: ""
    };
  },
  async mounted() {
    try {
      this.expense_id = this.$route.params.id;
      let res = await this.$axios.$get(
        `expenses/${this.expense_id}`,
        this.headerOptions
      );

      if (res.status === true) {
        let expense = res.data;
        Object.assign(this.expense, expense);
        this.type = expense.type;
        this.amount = expense.amount;
        this.description = expense.description;
        return;
      }
      return;
    } catch (error) {
      console.log(error);
      this.makeAlert(error.message);
    }
  },
  methods: {
    async updateExpense() {
      try {
        if (!this.validateData()) {
          return false;
        }

        let req_data = {
          type: this.type,
          amount: this.amount,
          description: this.description,
          createdBy: this.isAuth.id
        };
        let res = await this.$axios.$put(
          "/expenses/" + this.expense_id,
          req_data,
          this.headerOptions
        );

        if (res.status == true) {
          if (res.updated == 1) {
            this.makeAlert("Modified Successfully", "success");
          } else {
            this.makeAlert("Already up to date", "info");
          }
          return;
        } else {
          this.alertType = "error";
          this.alertMessage = res.message;
        }
      } catch (err) {
        console.error(err, "in error catch");
      }
    },
    validateData() {
      if (this.type.length == 0) {
        this.makeAlert("Type Feild is required");
        return false;
      }
      if (this.amount.length == 0) {
        this.makeAlert("Amount Feild is required");
        return false;
      }
      return true;
    },
    makeAlert(message, type = "error") {
      this.alertMessage = message;
      this.alertType = type;
    }
  },
  computed: {
    headerOptions() {
      return {
        headers: {
          token: this.isAuth.token
        }
      };
    },
    ...mapGetters(["isAuth"])
  }
};
</script>
