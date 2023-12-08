import { useAuthStore } from "~/store/authentication";

const authStore = useAuthStore();

export default defineNuxtRouteMiddleware((_to, _from) => {
  if (authStore.token) {
    return navigateTo("/ngos");
  }
});
