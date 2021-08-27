<template>
  <div class="w-full mb-4 cursor-pointer" @click="$emit('clear')">
    <div
      class="w-full p-3 text-white font-bold"
      v-show="message.length"
      :class="selectedClass"
      v-text="message"
    ></div>
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
