<template>
  <div class="bg-white rounded-xl main">
    <div class="flex h-16 w-full items-center justify-between px-6">
      <h3 class="font-bold text-[1.125rem]">Donors</h3>

      <div class="text-sm flex font-medium items-center justify-end">
        <span>Filter By</span>
      </div>
    </div>

    <Loading v-if="loading" />

    <div v-else>
      <table class="table-auto w-full">
        <thead class="w-full">
          <tr>
            <th
              v-for="(header, index) in headers"
              class="bg-[#f7f7f7] text-base font-medium px-6 py-4"
              :class="index == 0 && 'text-left'"
            >
              {{ header.title }}
            </th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(donor, index) in donors"
            :key="donor.email"
            class="cursor-pointer"
            :class="index % 2 != 0 && 'bg-[#FCFCFE]'"
            @click.stop="$router.push(`/donors/${donor.id}`)"
          >
            <td>{{ donor.name }}</td>
            <td>{{ donor.email }}</td>
            <td>{{ formatMoney(donor.total_donation) }}</td>
            <td class="">
              {{ donor.total_ngo }} /
              {{ donor.total_campaign }}
            </td>
            <td>
              <span
                class="text-xs px-2 py-[.35rem] rounded-2xl capitalize"
                :class="
                  donor.status.toLowerCase() == 'activated'
                    ? 'text-[#337138] bg-[#D1F7C4]'
                    : 'text-[#3D435E] bg-[#E7EBF3]'
                "
              >
                {{ donor.status }}
              </span>
            </td>

            <td
              @click.stop="
                handleChangeStatus({
                  userId: donor.UserId,
                  status:
                    donor.status.toLowerCase() == 'activated'
                      ? 'suspended'
                      : 'activated',
                })
              "
            >
              <Button
                :has-border="true"
                :has-icon="false"
                :text="
                  donor.status.toLowerCase() == 'activated'
                    ? 'Deactivate'
                    : 'Activate'
                "
                :is-gray="donor.status.toLowerCase() == 'activated'"
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
import Swal from "sweetalert2/dist/sweetalert2.js";
import { formatMoney } from "~/controllers/utils";
import { UpdateStatus } from "~/rep";
import { useToast } from "~/composables/useToast";

const headers = ref([
  { title: "Name" },
  { title: "Email address" },
  { title: "Total Donation" },
  { title: "NGOs / Campaigns" },
  { title: "Status" },
  { title: "Actions" },
]);

const swal = Swal.mixin({
  customClass: {
    confirmButton:
      "bg-primary-green rounded-xl px-3.5 py-3 font-medium ml-2 text-white",
    // cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false,
});

const donors: Ref<any[]> = ref([]);
const loading: Ref<boolean> = ref(false);
const { getAllDonors } = useApi();
const toast = useToast();

const fetchDonors = async () => {
  loading.value = true;
  const { data, error } = await useAsyncData("all-donors", () =>
    getAllDonors()
  );

  if (data) donors.value = data.value.data.splice(0, 8);
  else if (error) toast.error("Error Fetching Donors");

  loading.value = false;
};

onBeforeMount(() => {
  fetchDonors();
});

const handleChangeStatus = (data: UpdateStatus) => {
  swal
    .fire({
      title: "Proceed ?",
      // text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, proceed!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        // swal.fire(
        //   'Deleted!',
        //   'Your file has been deleted.',
        //   'success'
        // )

        handleProceed(data);
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        // swal.fire(
        //   'Cancelled',
        //   'Your imaginary file is safe :)',
        //   'error'
        // )
      }
    });
};

const handleProceed = async (data: UpdateStatus) => {
  // console.table('DATAAA', data)
  // await donorsRepo.updateStatus(data)
  // fetchDonors()
};
</script>

<style lang="scss" scoped>
.main {
  box-shadow: 0px 3.17px 19.8125px rgba(174, 174, 192, 0.15);
}

table > tbody > tr > td {
  @apply align-middle text-center mx-auto text-base px-6 py-4;
}

table > tbody > tr > td:first-child {
  @apply text-left;
}
</style>
