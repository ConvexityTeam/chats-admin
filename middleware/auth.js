import { useAuthStore } from "~/store/authentication";

const authStore = useAuthStore();
const { token } = authStore;

export default defineNuxtRouteMiddleware((_to, _from) => {
  if (!token) {
    return navigateTo("/");
  }
});
