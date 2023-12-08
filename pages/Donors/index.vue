<template>
  <div>
    <!-- Privacy Holder component -->
    <PartialsPrivacyHolder :has-create-button="false" />

    <div>
      <div class="flex items-center space-x-3">
        <span
          v-for="(tab, index) in tabs"
          :key="index"
          class="cursor-pointer px-2 pb-4 text-[1.125rem] text-center"
          :class="
            tab.id === activeTab
              ? 'border-primary-green font-bold  border-b-2 text-primary-green'
              : 'text-primary-gray font-medium'
          "
          @click="activeTab = tab.id"
        >
          {{ tab.title }}
        </span>
      </div>

      <div class="mt-6">
        <TablesDonorsAllDonors v-if="activeTab == 'all_donors'" />
        <TablesDonorsWithdrawRequest v-if="activeTab == 'withrdraw_request'" />
        <!-- <TablesDonorsTransactions  /> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const modalId = ref("");
const closeModal = (id: string) => {
  modalId.value = "";
};
const openModal = (id: string) => {
  modalId.value = id;
};

const activeTab = ref("all_donors");
const tabs = ref([
  { title: "All Donors", id: "all_donors" },
  { title: "Withdraw Request", id: "withrdraw_request" },
]);
</script>
