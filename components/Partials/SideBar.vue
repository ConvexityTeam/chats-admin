<template>
  <div class="pt-5 w-full h-full flex flex-col bg-transprent">
    <div class="mb-8">
      <img src="~/assets/images/logo.svg" alt="logo" class="ml-6 h-ful l" />
    </div>

    <div class="px-6 flex flex-1 h-full flex-col justify-between">
      <div class="flex flex-col space-y-4 justify-between">
        <div v-for="(sideNav, index) in sideNavs" :key="index">
          <nuxt-link
            :to="sideNav.route"
            class="flex space-x-3.5 cursor-pointer items-center justify-start rounded-xl px-3.5 py-3 font-medium"
            :class="
              sideNav.route === currentActiveRoute
                ? 'bg-primary-green text-white'
                : 'bg-transparent text-[#4F627D]'
            "
          >
            <span>
              <IconSideBar
                :title="sideNav.name.toLowerCase()"
                :is-active="sideNav.route == currentActiveRoute"
              />
            </span>

            <span class="text-[1.125rem]"> {{ sideNav.name }} </span>
          </nuxt-link>
        </div>
      </div>

      <div class="justify-self-end my-4 flex flex-col">
        <div
          class="flex space-x-3.5 flex-end cursor-pointer items-center text-primary-red justify-start rounded-xl px-3.5 py-3 font-medium"
          @click="logout"
        >
          <span>
            <IconSideBar title="logout" />
          </span>

          <span class="text-[1.125rem]"> Logout </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/store/authentication";
const route = useRoute();
const router = useRouter();
const { logout } = useAuthStore();

const currentActiveRoute = computed(() => route.fullPath);
const sideNavs = ref([
  { name: "NGOs", route: "/ngos", isHovered: false },
  { name: "Donors", route: "/donors", isHovered: false },
  { name: "Vendors", route: "/vendors", isHovered: false },
  { name: "Beneficiaries", route: "/beneficiaries", isHovered: false },
  { name: "Campaigns", route: "/campaigns", isHovered: false },
  { name: "Settings", route: "/settings", isHovered: false },
]);
</script>

<style lang="scss" scoped>
.nuxt-link-active {
  @apply my-[6px] bg-primary-green py-2 font-medium text-white;
  svg {
    fill: white;
  }
}
.Logout {
  &.nuxt-link-active {
    @apply bg-[#E42C66];
  }
}
</style>
