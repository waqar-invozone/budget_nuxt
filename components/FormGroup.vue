<template>
  <div class="w-full mb-4">
    <label :for="id" class="w-full" v-text="label"></label><br />
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
    }
  }
};
</script>
