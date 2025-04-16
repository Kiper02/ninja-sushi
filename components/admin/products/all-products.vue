<script setup lang="ts">
import {useIsLoadingStore} from "#shared/store/auth.store";
import {toast} from "vue-sonner";
import type {VolumeUnit, WeightUnit} from "@prisma/client";
import {watchDebounced} from '@vueuse/core'
import ModalCreateProduct from "~/components/admin/products/modal-create-product.vue";

interface ICategory {
  id: string;
  name: string;
  icon: string;
}

interface IProduct {
  id: string;
  name: string;
  price: number;
  weight?: number;
  weighUnit?: WeightUnit;
  volume?: number;
  volumeUnit?: VolumeUnit;
}

const isLoadingStore = useIsLoadingStore();
const productsRef = ref<IProduct[]>([])
const categoriesRef = ref<ICategory[]>([])
const selectedCategoryId = ref<string | undefined>(undefined)
const searchQuery = ref<string | undefined>(undefined);
const isModal = ref(false);

const closeModal = () => {
  isModal.value = false;
}

const openModal = () => {
  isModal.value = true;
}

const loadCategories = async () => {
  try {
    isLoadingStore.set(true)
    const response = await fetch('/api/admin/categories')
    categoriesRef.value = await response.json();
  } catch (error) {
    toast.error("Произошла ошибка при получении категорий")
  } finally {
    isLoadingStore.set(false)
  }
}

const fetchProducts = async () => {
  try {
    isLoadingStore.set(true)
    const params = new URLSearchParams()
    if(searchQuery.value) params.append("name", searchQuery.value)
    if(selectedCategoryId.value) params.append("categoryId", selectedCategoryId.value)

    const response = await fetch(`/api/admin/products?${params.toString()}`)
    productsRef.value = await response.json()
  } catch (error) {
    toast.error("Произошла ошибка при получении товаров")
  } finally {
    isLoadingStore.set(false)
  }
}

onMounted(async () => {
  await loadCategories()
  await fetchProducts()
})

watchDebounced(
    searchQuery,
    () => fetchProducts(),
    { debounce: 300 }
)

watch(selectedCategoryId, fetchProducts)
</script>

<template>
  <section class="w-full text-[#06152B] mt-6 dark:text-white">
    <div class="bg-white py-4 px-9 rounded-xl flex items-center gap-10 dark:bg-[#0f120e]">
      <UiInput
          v-model="searchQuery"
          type="text"
          placeholder="Введите название"
          class="dark:bg-[#252824]"
      />
      <UiSelect
          v-model="selectedCategoryId"
          class="w-[200px]"
      >
        <UiSelectTrigger class="dark:bg-[#252824]">
          <UiSelectValue placeholder="Выберите категорию" />
        </UiSelectTrigger>
        <UiSelectContent>
          <UiSelectGroup>
            <UiSelectLabel>Категория</UiSelectLabel>
            <UiSelectItem
                v-for="item in categoriesRef"
                :value="item.id"
                :key="item.id"
            >
              {{ item.name }}
            </UiSelectItem>
          </UiSelectGroup>
        </UiSelectContent>
      </UiSelect>
      <UiButton @click="openModal" class="dark:bg-[#bb82f6]">
        Добавить товар
      </UiButton>
    </div>

    <div class="mt-2">
      <div class="flex items-center gap-5 py-8 px-20">
        <p>Название</p>
        <p>Цена</p>
      </div>

      <ul class="flex flex-col gap-9">
        <li
            class="flex items-center gap-10"
            v-for="item in productsRef"
        >
          <div class="flex items-center">
            <NuxtImg src=""/>
            <p>{{item.name}}</p>
          </div>

          <p>{{item.price}}</p>
        </li>
      </ul>
    </div>

    <ModalCreateProduct
      v-if="isModal"
      @close="closeModal"
    />
  </section>
</template>

<style scoped>

</style>