<template>
  <div class="border box-border shadow-md w-full rounded">
    <div v-if="heading.length > 0" class="p-3 border-b">
      <h1 class="font-bold">
        {{ heading }}
      </h1>
    </div>
    <section class="p-4 flex" :class="typeClass">
      <slot></slot>
    </section>

    <slot name="footer"></slot>
  </div>
</template>

<script>
export default {
  name: "Box",
  props: {
    heading: {
      require: false,
      default: ""
    },
    type: {
      require: false,
      default: "row"
    }
  },
  computed: {
    typeClass() {
      if (this.type == "col") {
        return "flex-col";
      }
      return "flex-row";
    }
  }
};
</script>
