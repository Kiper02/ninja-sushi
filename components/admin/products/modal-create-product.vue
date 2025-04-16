<script setup lang="ts">
import { ref } from 'vue';
import {SelectValue} from "~/components/ui/select";
import {toast} from "vue-sonner";

interface ICategory {
  id: string;
  name: string;
  icon: string;
}

const emit = defineEmits(['close']);
const selectCategory = ref<number | null>(null);
const categories = ref<ICategory[]>([])

onMounted(async () => {
  try {
    const response = await fetch('/api/admin/categories', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      }
    })
    categories.value = await response.json();
  } catch (error) {
    toast("Произошла ошибка при получении категорий")
  }
})

const create = async () => {

};


</script>

<template>
  <div
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
  >
    <UiCard
        class="w-full max-w-md mx-4 flex flex-col items-center p-5"
        @click.stop
    >
      <div class="flex flex-col items-center gap-3 p-4 w-full">
        <UiCardTitle>Создание товара</UiCardTitle>

        <UiCardContent class="flex flex-col items-center gap-3 p-4 w-full">
          <UiInput
            placeholder="Название"
          />
          <UiInput
            placeholder="Цена"
          />
          <UiInput
            placeholder="Вес"
          />
          <UiSelect>
            <UiSelectTrigger>
              <SelectValue placeholder="Выберите вес"/>
            </UiSelectTrigger>

            <UiSelectContent>
              <UiSelectGroup>
                <UiSelectLabel>Вес</UiSelectLabel>
                <UiSelectItem value="KG">
                  Килограмм
                </UiSelectItem>
                <UiSelectItem value="G">
                  Грамм
                </UiSelectItem>
              </UiSelectGroup>
            </UiSelectContent>
          </UiSelect>

          <UiInput
              placeholder="Объём"
          />
          <UiSelect>
            <UiSelectTrigger>
              <SelectValue placeholder="Выберите объём"/>
            </UiSelectTrigger>

            <UiSelectContent>
              <UiSelectGroup>
                <UiSelectLabel>Объём</UiSelectLabel>
                <UiSelectItem value="KG">
                  Литр
                </UiSelectItem>
                <UiSelectItem value="G">
                  Миллилитр
                </UiSelectItem>
              </UiSelectGroup>
            </UiSelectContent>
          </UiSelect>

          <div class="flex items-center space-x-2 w-full">
            <UiCheckbox id="terms"/>
            <label
                for="terms"
            >
              Острый
            </label>
          </div>
          <div class="flex items-center space-x-2 w-full">
            <UiCheckbox id="terms"/>
            <label
                for="terms"
            >
              Для вегетарианцев
            </label>
          </div>
          <div class="flex items-center space-x-2 w-full">
            <UiCheckbox id="terms"/>
            <label
                for="terms"
            >
              С лактозой
            </label>
          </div>
          <div class="flex items-center space-x-2 w-full">
            <UiCheckbox id="terms"/>
            <label
                for="terms"
            >
              Хит
            </label>
          </div>

          <UiSelect>
            <UiSelectTrigger>
              <SelectValue placeholder="Выберите объём"/>
            </UiSelectTrigger>

            <UiSelectContent>
              <UiSelectGroup>
                <UiSelectLabel>Категория</UiSelectLabel>
                <UiSelectItem
                    v-for="item in categories"
                    :value="item.id"
                >
                  {{item.name}}
                </UiSelectItem>
              </UiSelectGroup>
            </UiSelectContent>
          </UiSelect>

          <div>

          </div>
        </UiCardContent>
      </div>
    </UiCard>
  </div>
</template>