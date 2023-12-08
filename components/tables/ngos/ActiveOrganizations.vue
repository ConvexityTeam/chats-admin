<template>
  <div class="bg-white rounded-xl main">
    <div class="flex h-16 w-full items-center justify-between px-6">
      <h3 class="font-bold text-[1.125rem]">Organisations</h3>

      <!-- <div class="text-sm flex font-medium items-center justify-end">
        <span>Filter By</span>
      </div> -->
    </div>

    <Loading v-if="loading" :loading="loading" />

    <div v-else>
      <table class="table-auto w-full">
        <thead class="w-full">
          <tr>
            <th
              v-for="(header, index) in headers"
              :key="index"
              class="bg-[#f7f7f7] text-base font-medium px-6 py-4 text-left"
              :class="index == 0 && 'text-left'"
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
            <td>
              <nuxt-link :to="`ngos/${organisation.id}`">
                {{ organisation.name }}
              </nuxt-link>
            </td>
            <td>
              <nuxt-link :to="`ngos/${organisation.id}`">
                {{ organisation.email }}
              </nuxt-link>
            </td>
            <td>
              <nuxt-link :to="`ngos/${organisation.id}`">
                {{ formatMoney(organisation.disbursedSum) }}
              </nuxt-link>
            </td>
            <td class="count">
              <nuxt-link :to="`ngos/${organisation.id}`">
                {{ organisation.beneficiary_count }}
              </nuxt-link>
            </td>
            <td>
              <nuxt-link :to="`ngos/${organisation.id}`">
                <span
                  class="text-xs px-2 py-[.35rem] rounded-2xl capitalize"
                  :class="
                    organisation.status === 'activated'
                      ? 'text-[#337138] bg-[#D1F7C4]'
                      : 'text-[#3D435E] bg-[#E7EBF3]'
                  "
                >
                  {{ organisation.status }}
                </span>
              </nuxt-link>
            </td>

            <td>
              <Button
                :has-border="true"
                :has-icon="false"
                :text="
                  organisation.status == 'activated' ? 'Deactivate' : 'Activate'
                "
                :is-gray="organisation.status == 'activated'"
                class="text-[.875rem] !py-2 !px-3"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatMoney } from "~/controllers/utils";

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

const headers: Ref<any[]> = ref([
  "Name",
  "Email address",
  "Disbursed",
  "Beneficiaries",
  "Status",
  "Actions",
]);
</script>

<style lang="scss" scoped>
.main {
  box-shadow: 0px 3.17px 19.8125px rgba(174, 174, 192, 0.15);
}

table > tbody > tr > td {
  @apply align-middle  text-base px-6 py-4 text-left;

  &.count {
    @apply text-right px-12;
  }
}
</style>
