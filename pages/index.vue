<template>
  <div class="flex bg-[#FAFAFA] min-h-screen justify-between items-center">
    <div class="w-[27.5rem] block mx-auto my-10">
      <img
        src="~/assets/images/logo.svg"
        class="m-auto h-[3.875rem] text"
        alt="logo"
      />

      <div class="mt-16 bg-white rounded-2xl box-shadow">
        <h3
          class="text-center text-2xl py-6 font-medium text-primary-blue border-b-[1px] border=[#FEFEFE]"
        >
          Admin Login
        </h3>

        <form class="p-6" @submit.prevent="login">
          <div class="flex flex-col mb-4">
            <label for="password" class="block mb-2 text-sm font-medium">
              Email Address
            </label>

            <div class="flex relative items-center bg-primary-light rounded-lg">
              <span class="inline-flex items-center pl-4 pr-3 text-sm">
                <IconEmail />
              </span>

              <input
                id="email"
                v-model="payload.email"
                type="email"
                placeholder="email"
              />
            </div>
          </div>

          <div class="flex flex-col">
            <label for="password" class="block mb-2 text-sm font-medium">
              Password
            </label>

            <div class="flex relative items-center bg-primary-light rounded-lg">
              <span class="inline-flex items-center pr-3 pl-4">
                <IconLock />
              </span>

              <input
                id="password"
                v-model="payload.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="password"
                autocomplete="current-password"
              />

              <div
                class="absolute right-0 top-0 my-auto h-full bg-transparent flex justify-center items-center px-[1.125rem] cursor-pointer"
                @click="showPassword = !showPassword"
              >
                <IconEyes :title="showPassword ? 'open' : 'close'" />
              </div>
            </div>
          </div>

          <div class="block w-full mt-8">
            <Button
              type="submit"
              text="Login"
              class="w-full"
              :disabled="loading"
              :loading="loading"
            />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LoginCredentials } from "~/composables/useApi";
import { useAuthStore } from "~/store/authentication";

definePageMeta({
  layout: "auth",
});

const showPassword: Ref<boolean> = ref(false);
const loading: Ref<boolean> = ref(false);
const payload = ref<LoginCredentials>({
  email: "",
  password: "",
});

const router = useRouter();
const { setAuthUser, setAuthToken } = useAuthStore();

const login = async () => {
  try {
    loading.value = true;
    const { login: authLogin } = useApi();

    const { data } = await useAsyncData(() => authLogin(payload.value));

    if (data) {
      const { token, user } = data?.value?.data;
      setAuthToken(token);
      setAuthUser(user);
      router.push("/ngos");
    }
  } catch (__err) {
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="scss" scoped>
.box-shadow {
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.04);
}

input {
  @apply bg-transparent focus:bg-transparent block flex-1 min-w-0 w-full rounded-tr-lg rounded-br-lg text-primary-black p-[1.125rem] pl-1 outline-0 border-0;
}
</style>
