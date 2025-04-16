<script setup lang="ts">
import {asideData} from "~/components/admin/shared/aside.data";
import Logo from "~/components/shared/logo.vue";
import {useAsideStore} from "#shared/store/aside.store";
import {watch} from 'vue';
import {useRoute} from 'vue-router';

const asideStore = useAsideStore();
const route = useRoute();

asideStore.syncWithRoute(route.path);

watch(() => route.path, (newPath) => {
  asideStore.syncWithRoute(newPath);
});
</script>

<template>
  <aside class="h-screen bg-white py-6 px-5 dark:bg-[#1a1d1a]">
    <Logo/>
    <div class="flex flex-col items-center mt-8 gap-10">
      <NuxtLink
          :class="{'active': item.id === asideStore.id}"
          class="flex items-center gap-6 w-full relative py-[15px] px-[15px] group"
          v-for="item in asideData"
          :key="item.id"
          :to="item.link"
      >
        <NuxtImg :src="item.icon" class="h-8 w-8 z-10"/>
        <p class="text-gray-500 font-medium text-xl relative">
          {{item.name}}
          <span
              class="absolute -bottom-2 left-0 h-1 bg-[#727baa] rounded-full
                   transition-all duration-300 ease-out"
              :class="{'w-0': item.id !== asideStore.id, 'w-full': item.id === asideStore.id}"
          ></span>
        </p>
      </NuxtLink>
    </div>
  </aside>
</template>

<style scoped>
.active p {
  color: blueviolet;
  position: relative;
}

.active::before {
  content: '';
  position: absolute;
  top: 0;
  left: -20px;
  width: 35%;
  height: 100%;
  background-color: #60bfa6;
  border-radius: 0 5px 5px 0;
  animation: slideIn 0.3s ease-out forwards;
}

@keyframes slideIn {
  from {
    transform: translateX(-10px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>