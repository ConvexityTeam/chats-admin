<template>
  <div>
    <!-- Modal Here -->
    <section v-if="isOpen">
      <Modal
        id="new_ngo"
        title="Add Organization"
        size="sm"
        :centered="false"
        @close="isOpen = false"
      >
        <NgosAdd />
      </Modal>
    </section>

    <!-- Privacy Holder component -->
    <PartialsPrivacyHolder
      search-placeholder="Search organisations..."
      create-btn-text="Create new "
      @create="isOpen = true"
      @input="(value: string) => (searchText = value)"
    />

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
      <TablesNgosActiveOrganizations
        v-if="activeTab == 'active'"
        :organisations="filteredOrganisations"
        :loading="pending"
      />

      <TablesNgosPendingOrganizations
        v-else
        :organisations="filteredOrganisations"
        :loading="pending"
        @reload="handleReload"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const isOpen: Ref<boolean> = ref(false);

const activeTab: Ref<string> = ref("active");
const searchText: Ref<string> = ref("");

const tabs: Ref<any[]> = ref([
  { title: "Active", id: "active" },
  { title: "Pending approval", id: "pending" },
]);

const organisations = computed(() => {
  return data?.value?.data ?? [];
});

const activeOrganisations = computed(() => {
  return organisations.value.filter((o) => o.status === "activated") || [];
});

const pendingOrganisations = computed(() => {
  return organisations.value.filter((o) => o.status === "pending") || [];
});

const filteredOrganisations = computed(() => {
  const organisationTab =
    activeTab.value === "active"
      ? activeOrganisations.value
      : pendingOrganisations.value;

  return organisationTab.filter((o) => {
    return o.name.toLowerCase().includes(searchText.value.toLowerCase());
  });
});

const { getAllNGOs } = useApi();
const { data, pending, refresh } = await useAsyncData(() => getAllNGOs(), {
  server: false,
  lazy: true,
});

const handleReload = () => {
  activeTab.value = "active";
  refresh();
};
</script>
