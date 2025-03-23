<script lang="ts" setup>
import {Toaster} from "vue-sonner";
</script>

<template>
  <div>
    <Toaster />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <ClientOnly>
      <Toaster />
    </ClientOnly>
  </div>
</template>