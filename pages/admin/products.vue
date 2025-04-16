<script setup lang="ts">

import {buttonsData} from "~/components/admin/products/buttons.data";
import {useProductButtonsStore} from "#shared/store/product-buttons.store";
import AllProducts from "~/components/admin/products/all-products.vue";
import Category from "~/components/admin/products/category.vue";
import Ingredients from "~/components/admin/products/ingredients.vue";

useSeoMeta({
  title: 'Categories',
})

definePageMeta({
  layout: 'admin',
})

const components: Record<number, Component> = {
  1: AllProducts,
  2: Category,
  3: Ingredients
};
const productStore = useProductButtonsStore();
const activeButtonId = computed(() => productStore.id);
const activeComponent = computed(() => components[activeButtonId.value]);



</script>

<template>
  <section class="pt-9 w-full">
    <h1 class="text-[#06152B] font-bold text-2xl dark:text-white">Продукты</h1>

    <div class="w-full flex justify-between mt-8">
      <div class="flex items-center bg-white rounded-lg overflow-hidden border-none dark:bg-[#1a1d1a]">
        <UiButton
            v-for="item in buttonsData"
            :key="item.id"
            :class="item.id === activeButtonId ? 'btn-active' : 'btn'"
            @click="productStore.set(item.id)"
            class="border-none font-bold text-sm"
        >
          {{item.name}}
        </UiButton>
      </div>

      <select>

      </select>
    </div>

    <component :is="activeComponent" />

  </section>
</template>

<style scoped>
  .btn {
    background-color: white;
    border-radius: 0;
    color: #06152B;
    @apply dark:bg-[#1a1d1a] dark:text-white
  }

  .btn-active {
    background-color: #333333;
    color: #fff;
    border-radius: 0;
    @apply dark:bg-[#bb82f6] dark:text-black;
  }
</style>