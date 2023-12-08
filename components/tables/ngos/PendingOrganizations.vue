<template>
  <div class="bg-white rounded-xl main">
    <!-- Modal Here -->
    <section v-if="isOpen">
      <Modal
        id="create_new"
        :has-header="false"
        size="lg"
        :centered="false"
        @close="isOpen = false"
      >
        <NgosApprove :nin-data="ninData" @close="handleSucces" />
      </Modal>
    </section>

    <div class="flex h-16 w-full items-center justify-between px-6">
      <h3 class="font-bold text-[1.125rem]">Organisations</h3>
    </div>

    <Loading v-if="loading || isLoading" :loading="loading || isLoading" />

    <div v-else>
      <table class="table-auto w-full">
        <thead class="w-full">
          <tr>
            <th
              v-for="header in headers"
              :key="header"
              class="bg-[#f7f7f7] text-base font-medium px-6 py-4 text-left"
            >
              {{ header }}
            </th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(organisation, index) in organisations"
            :key="index"
            class="cursor-pointer"
            :class="index % 2 != 0 && 'bg-[#FCFCFE]'"
          >
            <td>{{ organisation.name }}</td>
            <td>{{ organisation.email }}</td>
            <td>{{ organisation.registration_id }}</td>
            <td>
              <span
                class="text-xs px-2 py-[.35rem] rounded-2xl capitalize text-[#3D435E] bg-[#E7EBF3]"
              >
                {{ organisation.status }}
              </span>
            </td>

            <td>
              <Button
                :has-border="true"
                :has-icon="false"
                text="Manually approve"
                class="text-[.875rem] !py-2 !px-3"
                @click="handleApproval(organisation.UserId)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  loading: {
    type: Boolean,
    default: false,
  },

  organisations: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["reload"]);

const ninData: Ref<object> = ref({});
const isOpen: Ref<boolean> = ref(false);
const isLoading: Ref<boolean> = ref(false);
const headers: Ref<any[]> = ref([
  "Organisations Name",
  "Email address",
  "Registration ID",
  "Status",
  "Actions",
]);

const handleApproval = async (id: string | number) => {
  try {
    isLoading.value = true;

    const { getLivenessData } = useApi();
    const { data } = await useAsyncData(() => getLivenessData(id));

    if (data) {
      ninData.value = { ...data?.value?.data, userId: id };
      isOpen.value = true;
    }

    console.log("DATA::::", data);
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};

const handleSucces = () => {
  isOpen.value = false;
  emit("reload");
};
</script>

<style lang="scss" scoped>
.main {
  box-shadow: 0px 3.17px 19.8125px rgba(174, 174, 192, 0.15);
}
table > tbody > tr > td {
  @apply align-middle  text-left  text-base px-6 py-4;
}
</style>
