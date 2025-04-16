<script setup lang="ts">
interface IProps {
  text: string;
  nameButton: string;
  onAction: () => void;
}
const {text, nameButton, onAction} = defineProps<IProps>();

const emit = defineEmits(['close']);
const handleBackdropClick = (event: MouseEvent) => {
  if (event.target === event.currentTarget) {
    emit('close');
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
      <div class="flex flex-col items-center gap-3 p-4">
        <UiCardTitle>Подтверждение</UiCardTitle>
        <UiCardContent class="text-center">
          Вы уверены что хотите удалить {{text}}?
        </UiCardContent>
        <UiCardFooter>
          <UiButton @click="emit('close')" class="mr-3">
            Отмена
          </UiButton>
          <UiButton @click="onAction()" variant="destructive">
            {{nameButton}}
          </UiButton>
        </UiCardFooter>
      </div>
    </UiCard>
  </div>
</template>