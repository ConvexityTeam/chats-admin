<template>
  <div class="flex justify-between items-center px-3 mb-8">
    <div class="flex justify-between items-center space-x-4">
      <span v-if="hasSearchField">
        <Search
          :placeholder="searchPlaceholder"
          @input="(value: string) => $emit('input', value)"
        />
      </span>

      <span v-if="hasFilterOption"> <Filter /> </span>
    </div>

    <div class="flex justify-between items-center space-x-4">
      <div v-if="hasExportButton">
        <Button
          :has-border="true"
          :has-icon="true"
          text="Export"
          icon-name="export"
          class="!py-3.5"
          @click="$emit('export')"
        />
      </div>

      <div v-show="hasCreateButton">
        <Button
          :text="createBtnText"
          :has-icon="true"
          icon-name="add"
          class="!p-4"
          @click="$emit('create')"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  hasSearchField: {
    type: Boolean,
    default: true,
  },
  hasExportButton: {
    type: Boolean,
    default: true,
  },
  hasCreateButton: {
    type: Boolean,
    default: true,
  },
  hasFilterOption: {
    type: Boolean,
    default: false,
  },
  createBtnText: {
    type: String,
    default: "Create",
  },
  searchPlaceholder: {
    type: String,
    default: "",
  },
  filterPlaceholder: {
    type: String,
    default: "Filter",
  },
});

// emits
defineEmits(["export", "create", "input"]);
</script>
