<script setup lang="ts">

import Logo from "~/components/shared/logo.vue";
import {useAuthStore, useIsLoadingStore} from "#shared/store/auth.store";

const isLoadingStore = useIsLoadingStore();
const {push} = useRouter();

onMounted(async() => {
  isLoadingStore.set(true);
  try {
    const response: any = await fetch('/api/profile', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const user = await response.json();
    if(user.role !== 'ADMIN') {
      await push("/");
    }
  } finally {
    isLoadingStore.set(false);
  }
})

</script>

<template>
  <div class="wrapper">
      <UiCard class="py-10 px-20 backdrop-blur-md bg-white/10 border-none rounded-3xl">
        <UiCardHeader>
          <UiCardTitle class="mb-10">
            <Logo/>
          </UiCardTitle>
          <UiCardDescription class="mb-6 text-2xl font-bold text-white">
            Login
          </UiCardDescription>
        </UiCardHeader>

        <UiCardContent class="w-full placeholder:text-[#BCBEC0] text-xs font-medium">
          <UiInput
            type="email"
            label="Email"
            placeholder="username@gmail.com"
            class="dark:bg-gray-700"
          />
          <UiInput
            class="mt-4 dark:bg-gray-700"
            type="password"
            label="Password"
            placeholder="Password"
          />
        </UiCardContent>
        <UiCardFooter class="mt-6">
          <UiButton
              class="w-full bg-[#003465] text-lg font-bold text-white py-3 dark:hover:bg-[#003450]"
          >
            Войти
          </UiButton>
        </UiCardFooter>
      </UiCard>
  </div>
</template>

<style scoped>
  .wrapper {
    @apply w-screen h-screen flex items-center justify-center;
    background-image: url("./../../public/admin-login-background.png");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
  }
</style>