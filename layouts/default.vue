<script setup lang="ts">
import {useAuthStore, useIsLoadingStore} from "#shared/store/auth.store";
import Loader from "~/components/shared/loader.vue";

const authStore = useAuthStore();
const isLoadingStore = useIsLoadingStore()


onMounted(async () => {
  isLoadingStore.set(true);
  try {
    const user: any = await fetch('/api/profile', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });

    if(user) {
      authStore.set(user);
    }
  } finally {
    isLoadingStore.set(false);
  }
})


</script>
<template>
  <Loader v-if="isLoadingStore.isLoading"/>
  <slot />
</template>

<style scoped>

</style>