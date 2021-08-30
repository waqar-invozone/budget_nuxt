<template>
  <div
    class="fixed w-3/4 md:w-1/4 right-0 top-5 shadow-lg z-20 "
    v-show="message.length"
  >
    <div
      class="flex-grow p-3 text-white font-bold rounded"
      :class="selectedClass"
      v-text="message"
    ></div>
    <span
      class="absolute -top-2 -left-2 bg-gray-200 rounded-full cursor-pointer"
      id="times"
      @click="$emit('clear')"
      >&times;</span
    >
  </div>
</template>

<script>
export default {
  name: "Alert",
  props: {
    message: {
      default: ""
    },
    type: {
      default: "info"
    }
  },
  data() {
    return {
      info: "bg-blue-400",
      error: "bg-red-400",
      success: "bg-green-400",
      warning: "bg-yellow-400"
    };
  },
  computed: {
    selectedClass() {
      if (this.type != "") {
        return this[this.type];
      }
      return this.error;
    }
  }
};
</script>

<style scoped>
#times {
  width: 12px;
  height: 12px;
  line-height: 7px;
  padding: 2px;
  font-size: 13px;
  text-align: center;
}
</style>
