<template>
  <div
    class="fixed z-10 inset-0 overflow-y-auto"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
    v-if="status == 'up'"
  >
    <div
      class="flex items-center justify-center min-h-screen pt-2 px-2 pb-20 text-center sm:block sm:p-0"
    >
      <!--
      Background overlay, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100"
        To: "opacity-0"
    -->
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      ></div>

      <span
        class="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
        >&#8203;</span
      >

      <!--
      Modal panel, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        To: "opacity-100 translate-y-0 sm:scale-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100 translate-y-0 sm:scale-100"
        To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    -->
      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
      >
        <div v-if="heading.length > 0" class="bg-gray-50 px-4 py-3 sm:px-6">
          <h1 class="font-bold">
            {{ heading }}
          </h1>
        </div>
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <slot name="content"></slot>
        </div>

        <div class="px-4 py-3 text-right">
          <slot name="action"></slot>
          <button
            @click="hide"
            class="rounded bg-gray-100 px-4 py-2  hover:bg-gray-200 focus:outline-none"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PopUp",
  props: {
    heading: {
      require: false,
      default: ""
    }
  },
  data() {
    return {
      status: "down"
    };
  },
  methods: {
    hide() {
      this.status = "down";
    },
    show() {
      this.status = "up";
    }
  }
};
</script>
