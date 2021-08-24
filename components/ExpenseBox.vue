<template>
  <box type="col" class="mb-4">
    <div class="mb-2">
      <table class="w-full">
        <tbody>
          <tr>
            <td><b>Type</b></td>
            <td>{{ expense.type }}</td>
          </tr>
          <tr>
            <td><b>Amount</b></td>
            <td>{{ expense.amount }}</td>
          </tr>
          <tr>
            <td><b>Details</b></td>
            <td>{{ expense.description }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="flex flex-row space-x-2">
      <nuxt-link
        :to="{ name: 'expenses-id-edit', params: { id: expense.id } }"
        class="bg-blue-500 hover:bg-blue-700 text-white px-2 py-1"
      >
        Edit
      </nuxt-link>
      <button
        class="bg-red-500 hover:bg-red-700 text-white px-2 py-1"
        @click="del(expense)"
      >
        Delete
      </button>
    </div>
  </box>
</template>

<script>
import Box from "./Box.vue";
export default {
  props: {
    components: { Box },
    expense: {
      require: true,
      type: Object
    }
  },
  methods: {
    del(expense) {
      this.$emit("delete", expense);
    }
  }
};
</script>

<style></style>
