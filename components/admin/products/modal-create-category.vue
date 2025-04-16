<script setup lang="ts">
import { ref } from 'vue';
import { useIsLoadingStore } from "#shared/store/auth.store";
import {toast} from "vue-sonner";

const emit = defineEmits(['close']);
const fileInput = ref<HTMLInputElement | null>(null);
const previewImage = ref<string | null>(null);
const isDragging = ref(false);
const name = ref<string | undefined>();
const selectedFile = ref<File | null>(null);

const isLoadingStore = useIsLoadingStore();

const handleBackdropClick = (event: MouseEvent) => {
  if (event.target === event.currentTarget) {
    emit('close');
  }
};

const create = async () => {
  if (!name.value || !selectedFile.value) {
    alert('Пожалуйста, заполните все поля');
    return;
  }

  try {
    isLoadingStore.set(true);

    const formData = new FormData();
    formData.append('name', name.value);
    formData.append('file', selectedFile.value);

    const response = await fetch(`/api/admin/categories`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      toast ('Ошибка при создании категории');
    }

    emit('close');
  } catch (error) {
    console.error('Ошибка:', error);
    toast('Произошла ошибка при создании категории');
  } finally {
    isLoadingStore.set(false);
  }
};

const handleFileChange = (e: Event) => {
  const input = e.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    processFile(input.files[0]);
  }
};

const handleDrop = (e: DragEvent) => {
  e.preventDefault();
  isDragging.value = false;

  if (e.dataTransfer && e.dataTransfer.files.length) {
    processFile(e.dataTransfer.files[0]);
  }
};

const handleDragOver = (e: DragEvent) => {
  e.preventDefault();
  isDragging.value = true;
};

const handleDragLeave = () => {
  isDragging.value = false;
};

const processFile = (file: File) => {
  if (!file.type.match('image.*')) {
    toast('Пожалуйста, выберите изображение');
    return;
  }

  selectedFile.value = file;
  const reader = new FileReader();
  reader.onload = (e) => {
    previewImage.value = e.target?.result as string;
  };
  reader.readAsDataURL(file);
};

const triggerFileInput = () => {
  fileInput.value?.click();
};

const removeImage = () => {
  previewImage.value = null;
  selectedFile.value = null;
  if (fileInput.value) {
    fileInput.value.value = '';
  }
};
</script>

<template>
  <div
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      @click="handleBackdropClick"
  >
    <UiCard
        class="w-full max-w-md mx-4 flex flex-col items-center p-5"
        @click.stop
    >
      <div class="flex flex-col items-center gap-3 p-4 w-full">
        <UiCardTitle>Создание категории</UiCardTitle>
        <UiCardContent class="text-center w-full">
          <UiInput
              class="mt-3 w-full"
              type="text"
              placeholder="Название категории..."
              v-model="name"
          />

          <div
              class="mt-4 w-full border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors"
              :class="{
              'border-blue-500 bg-blue-50': isDragging,
              'border-gray-300 hover:border-gray-400': !isDragging && !previewImage,
              'border-transparent': previewImage
            }"
              @click="!previewImage && triggerFileInput()"
              @drop="handleDrop"
              @dragover="handleDragOver"
              @dragleave="handleDragLeave"
          >
            <input
                ref="fileInput"
                type="file"
                class="hidden"
                accept="image/*"
                @change="handleFileChange"
            />

            <template v-if="!previewImage">
              <div class="flex flex-col items-center justify-center space-y-2">
                <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                </svg>
                <p class="text-sm text-gray-600">
                  <span class="font-medium text-blue-600 hover:text-blue-500">Нажмите для загрузки</span>
                  или перетащите изображение
                </p>
                <p class="text-xs text-gray-500">PNG, JPG, GIF (макс. 5MB)</p>
              </div>
            </template>

            <template v-else>
              <div class="relative">
                <img
                    :src="previewImage"
                    alt="Превью"
                    class="max-h-48 mx-auto rounded-md object-contain"
                />
                <button
                    @click.stop="removeImage"
                    class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            </template>
          </div>
        </UiCardContent>

        <UiCardFooter class="w-full flex justify-center">
          <UiButton @click="emit('close')" class="mr-3">
            Отмена
          </UiButton>
          <UiButton @click="create" variant="destructive">
            Создать
          </UiButton>
        </UiCardFooter>
      </div>
    </UiCard>
  </div>
</template>