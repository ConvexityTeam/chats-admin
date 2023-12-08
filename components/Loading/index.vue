<template>
  <div
    v-loading.fullscreen.lock="loading"
    element-loading-background="#0000009b"
    class="my-5 text-center"
  ></div>
</template>

<script lang="ts">
export default {
  props: {
    loading: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
};
</script>
