<script setup lang="ts">

import Aside from "~/components/admin/shared/aside.vue";
import {useAuthStore, useIsLoadingStore} from "#shared/store/auth.store";

const authStore = useAuthStore();
const isLoadingStore = useIsLoadingStore()
const { push } = useRouter()

onMounted(async () => {
  isLoadingStore.set(true);
  try {
    const response = await fetch('/api/profile', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });
    console.log(response)

    const user = await response.json();

    if(!response.ok) {
      await push("/admin/login");
    }

    if(user) {
      if(user.role !== 'ADMIN') {
        await push("/");
      }
      authStore.set(user);
    }
  } finally {
    isLoadingStore.set(false);
  }
})

</script>



<template>
  <div class="flex bg-[#F1F4FA] pr-8 gap-8 dark:bg-[#252824]">
    <Aside />
    <slot class="py-8"/>
  </div>
</template>
style
<style scoped>

</style>