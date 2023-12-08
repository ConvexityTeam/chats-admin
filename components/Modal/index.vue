<template>
  <div
    class="fixed top-0 left-0 !w-screen !h-screen overflow-auto z-50 bg-primary-blue bg-opacity-30 py-6"
    @click="closeModal"
  >
    <section
      class="relative modal h-auto mx-auto bg-white p-6 rounded-lg box-shadow"
      :style="`width: ${modalSizes} !important;`"
    >
      <div class="relative flex pb-4" :class="centered && 'justify-center'">
        <h3
          v-show="hasHeader"
          class="text-[1.5rem] font-bold text-primary-blue"
        >
          {{ title }}
        </h3>

        <button type="button" class="absolute top-0 right-0" @click="close">
          <IconClose />
        </button>
      </div>

      <div class="overflow-auto">
        <slot></slot>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  id: {
    type: String,
    default: "",
    required: true,
  },
  title: {
    type: String,
    default: "",
    required: true,
  },
  size: {
    type: String,
    default: "md",
  },
  centered: {
    type: Boolean,
    default: false,
  },
  buttonModified: {
    type: Boolean,
    default: false,
  },
  hasHeader: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["close"]);
const modalSizes = computed(() => {
  switch (props.size) {
    case "xs":
      return "18.75rem";
    case "sm":
      return "29.25rem";
    case "lg":
      return "44rem";
    case "xl":
      return "71.25rem";
    default:
      return "31.25rem";
  }
});

window.addEventListener("keyup", (e) => {
  if (e.key === "Escape") return close();
});

const closeModal = () => {
  window.addEventListener(
    "click",
    (event) => {
      if (!event.target.closest(".modal")) {
        close();
      }
    },
    false
  );
};
const close = () => {
  emit("close", props.id);
};
</script>

<style lang="scss" scoped>
.box-shadow {
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.04);
}
</style>
