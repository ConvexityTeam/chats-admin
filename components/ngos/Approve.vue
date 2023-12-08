<template>
  <div>
    <div class="mt-4 px-3 pb-2">
      <!-- Name Section here  here -->
      <div class="flex gap-8">
        <!-- Liveness Capture -->
        <section class="w-[35%]">
          <div class="h-[205px] border-1 mb-3 rounded-[15px]">
            <img
              :src="ninData?.liveness_capture"
              :alt="ninData?.first_name"
              class="object-contain"
            />
          </div>

          <div class="font-bold text-[1.25rem] text-center">
            Liveness capture
          </div>

          <!-- NIN Picture -->
          <div class="pt-10">
            <div class="h-[205px] border-1 mb-3 rounded-[15px]">
              <img
                :src="ninData?.nin_photo_url"
                :alt="ninData?.first_name"
                class="object-contain"
              />
            </div>

            <div class="font-bold text-[1.25rem] text-center">NIN capture</div>
          </div>
        </section>

        <div class="col-span-3 flex flex-col space-y-4 w-[65%]">
          <div class="">
            <label for="first-name" class="font-medium block text-base mb-2">
              First Name
            </label>
            <input
              id="first-name"
              :value="ninData?.first_name"
              readonly
              type="text"
              placeholder="Enter firstname"
              class="text-base p-4 rounded-md font-normal w-full outline-none ring-0 bg-[#E3E4E8]"
            />
          </div>

          <div class="">
            <label for="last-name" class="font-medium block text-base mb-2">
              Last Name
            </label>
            <input
              id="last-name"
              :value="ninData?.surname"
              readonly
              type="text"
              placeholder="Enter lastname"
              class="text-base p-4 rounded-md font-normal w-full outline-none ring-0 bg-[#E3E4E8]"
            />
          </div>

          <div class="">
            <label for="nin" class="font-medium block text-base mb-2">
              National Identification Number
            </label>
            <input
              id="nin"
              :value="ninData?.nin"
              readonly
              type="text"
              placeholder="Enter lastname"
              class="text-base p-4 rounded-md font-normal w-full outline-none ring-0 bg-[#E3E4E8]"
            />
          </div>

          <div class="">
            <label for="phone-number" class="font-medium block text-base mb-2">
              Phone Number
            </label>
            <input
              id="phone-number"
              :value="ninData?.phone"
              readonly
              type="text"
              placeholder="(759) 012-3985"
              class="text-base p-4 rounded-md font-normal w-full outline-none ring-0 bg-[#E3E4E8]"
            />
          </div>

          <div class="">
            <label for="address" class="font-medium block text-base mb-2">
              Address</label
            >
            <input
              id="address"
              :value="ninData?.address"
              readonly
              type="text"
              placeholder=""
              class="text-base p-4 rounded-md font-normal w-full outline-none ring-0 bg-[#E3E4E8]"
            />
          </div>

          <div class="pb-3 pt-5 w-full">
            <Button
              :has-icon="false"
              text="Manually approve"
              custom-styles="height:50px"
              :loading="loading"
              :disabled="loading"
              class="px-8"
              @click="approveOrganization"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToast } from "~/composables/useToast";

const props = defineProps({
  ninData: {
    type: Object,
    default: () => {},
  },
});

const loading: Ref<boolean> = ref(false);
const emit = defineEmits(["close"]);
const toast = useToast();

const approveOrganization = async () => {
  try {
    loading.value = true;

    console.log("TEST::", props.ninData);

    const { updateNgoStatus } = useApi();
    const { data } = await useAsyncData(() =>
      updateNgoStatus({ userId: props.ninData.userId, status: "activated" })
    );

    if (data.value) {
      toast.success(data.value?.message);
      emit("close");
    }
  } catch (_err) {
  } finally {
    loading.value = false;
  }
  // console.log(payload.value)
};
</script>

<style lang="scss" scoped>
input {
  @apply h-[52px];
}
</style>
