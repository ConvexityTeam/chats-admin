<template>
  <div>
    <!-- Modals Here -->
    <div v-if="modalId == 'add_vendor'">
      <Modal
        id="add_vendor"
        title="Add Vendor"
        size="lg"
        :centered="false"
        @close="closeModal"
      >
        <VendorsAdd
          :is-submitting="isSubmitting"
          @addVendor="handleAddVendor"
        />
      </Modal>
    </div>

    <!-- Privacy Holder component -->
    <PartialsPrivacyHolder
      create-btn-text="Add Vendor"
      @create="createVendor('add_vendor')"
    />

    <div class="mt-6">
      <TablesVendors
        :vendors="vendors"
        :headers="headers"
        :loading="loading"
        @handleChangeStatus="handleChangeStatus"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Swal from "sweetalert2/dist/sweetalert2.js";
import { useToast } from "~/composables/useToast";
import { UpdateStatus, Vendor } from "~/composables/useApi";

const modalId = ref("");
const closeModal = (id: string) => {
  modalId.value = "";
};
const createVendor = (id: string) => {
  modalId.value = id;
};
const isSubmitting = ref(false);

const toast = useToast();
const headers = ref([
  { title: "Name" },
  { title: "Email Address" },
  { title: "Amount sold" },
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

const vendors: Ref<any[]> = ref([]);
const loading: Ref<boolean> = ref(false);

onMounted(() => {
  fetchAllVendors();
});

const { getAllVendors, addVendor, updateStatus } = useApi();

const fetchAllVendors = async () => {
  loading.value = true;
  const { data, error } = await useAsyncData("all-vendors", () =>
    getAllVendors()
  );

  if (data) vendors.value = data.value.data.splice(0, 8);
  else if (error) toast.error("Error Fetching");

  loading.value = false;
};

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

const handleAddVendor = async (payload: Vendor) => {
  isSubmitting.value = true;

  const { data, error } = useAsyncData(() => addVendor(payload));

  if (data) {
    toast.success("success");
    fetchAllVendors();
  } else if (error) toast.error("Something went wrong");

  isSubmitting.value = false;
};

const handleProceed = async (data: UpdateStatus) => {
  const { data: res, error } = useAsyncData(() => updateStatus(data));

  if (res) {
    toast.success("success");
    fetchAllVendors();
  } else if (error) toast.error("Something went wrong");
};
</script>
