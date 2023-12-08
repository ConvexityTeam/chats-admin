<template>
  <div class="relative flex min-h-screen justify-between">
    <div class="w-64 min-h-screen bg-[#F7F9FB]">
      <PartialsSideBar />
    </div>

    <div class="flex-1 w-full min-h-full mx-auto bg-white">
      <PartialsTopBar />

      <div class="p-8">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});
</script>

<style scoped></style>
