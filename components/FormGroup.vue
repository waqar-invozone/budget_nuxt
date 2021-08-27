<template>
  <div class="w-full mb-4" :class="[inline ? 'flex flex-row' : '']">
    <label
      :for="id"
      :class="[!inline ? 'w-full' : 'min-w-max pr-2']"
      v-text="label"
    ></label>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "FormGroup",
  props: {
    label: {
      require: true
    },
    id: {
      require: true
    },
    inline: {
      default: false
    }
  },
  computed: {}
};
</script>
