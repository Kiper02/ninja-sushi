<script setup lang="ts">
import ModalConfirmation from "~/components/admin/shared/modal-confirmation.vue";
import ModalCreateCategory from "~/components/admin/products/modal-create-category.vue";
import {useIsLoadingStore} from "#shared/store/auth.store";
import {toast} from "vue-sonner";

interface ICategory {
  id: string;
  name: string;
  icon: string;
}

const isLoadingStore = useIsLoadingStore();
const dataCategoriesRef = ref<ICategory[]>([]);

onMounted(async () => {
  try {
    isLoadingStore.set(true);
    const response = await fetch('/api/admin/categories', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      }
    })
    dataCategoriesRef.value = await response.json();
  } catch (error) {
    toast("Произошла ошибка при получении категорий")
  } finally {
    isLoadingStore.set(false);
  }
})

const isModalCreateCategory = ref(false)
const isModal = ref(false);
const currentCategoryId = ref<string | null>(null)


const openModal = (id: string) => {
  currentCategoryId.value = id;
  isModal.value = true;
}

const deleteCategory = () => {
  if (!currentCategoryId.value) return;
  dataCategoriesRef.value = dataCategoriesRef.value.filter((c) => c.id !== currentCategoryId.value);
  isModal.value = false;
}

const closeModal = () => {
  isModal.value = false;
}

const openModalCreateCategory = () => {
  isModalCreateCategory.value = true;
}

const closeModalCreateCategory = () => {
  isModalCreateCategory.value = false;
}


</script>

<template>
  <section class="w-full text-[#06152B] dark:text-white">
    <div class="mt-6 flex items-center justify-end">
      <UiButton class="bg-[#333333] dark:bg-[#bb82f6]" @click="openModalCreateCategory">Добавить</UiButton>
    </div>

    <div class="mt-3 w-full bg-white dark:bg-[#1a1d1a]">
      <div class="grid grid-cols-[100px_1fr_120px] items-center gap-4 w-full bg-[#F1F4FA] dark:bg-[#252824] py-8 px-12 mb-4">
        <p class="text-lg font-bold">Иконка</p>
        <p class="text-lg font-bold">Название</p>
        <div></div>
      </div>

      <ul class="flex flex-col">
        <li
            v-for="item in dataCategoriesRef"
            :key="item.id"
            class="grid grid-cols-[100px_1fr_120px] items-center gap-4 px-12 py-4"
        >
          <div class="min-h-[40px] flex items-center">
            <NuxtImg :src="item.icon" class="max-w-[40px] max-h-[40px]" />
          </div>
          <p class="text-base font-medium">{{ item.name }}</p>
          <div class="flex justify-end">
            <UiButton
                class="bg-[#333333] dark:bg-[#bb82f6]"
                @click="openModal(item.id)"
            >
              Удалить
            </UiButton>
          </div>
        </li>
      </ul>
    </div>

    <ModalCreateCategory
        v-if="isModalCreateCategory"
        @close="closeModalCreateCategory"
    />

    <ModalConfirmation
        v-if="isModal"
        text="категорию"
        name-button="Удалить"
        :on-action="deleteCategory"
        @close="closeModal"
    />
  </section>
</template>

<style scoped>
</style>