<script lang="ts" setup>
import { phoneCodeData } from '~/components/auth/phone-code.data'

const emit = defineEmits(['update:updateCodeRef'])

const handleSelect = (code: string | number | Record<string, any> | null) => {
  const codeNumber = typeof code === 'string' ? Number(code) : code
  const selectedItem = phoneCodeData.find(item => item.code === codeNumber)
  if (selectedItem) {
    emit('update:updateCodeRef', selectedItem)
  }
}
</script>

<template>
  <UiSelect @update:modelValue="handleSelect">
    <UiSelectTrigger>
      <UiSelectValue placeholder="Выберите код" />
    </UiSelectTrigger>
    <UiSelectContent>
      <UiSelectGroup>
        <UiSelectLabel>Код</UiSelectLabel>
        <UiSelectItem
            v-for="item in phoneCodeData"
            :value="item.code"
            :key="item.code"
        >
          +{{ item.code }}
        </UiSelectItem>
      </UiSelectGroup>
    </UiSelectContent>
  </UiSelect>
</template>