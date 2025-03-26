<script setup lang="ts">

</script>

<template>
  <div class="w-full mx-auto mt-4 mb-8">
    <ul class="flex items-center gap-8 justify-center mx-auto max-w-max bg-white px-9 py-3 rounded-xl">
      <li class="item">
        <NuxtImg src="/categories/roll.svg" />
        <p>Роллы</p>
      </li>
      <li class="item">
        <NuxtImg src="/categories/sushi.svg" />
        <p>Суши</p>
      </li>
      <li class="item">
        <NuxtImg src="/categories/set.svg" />
        <p>Сеты</p>
      </li>
      <li class="item">
        <NuxtImg src="/categories/boul.svg" />
        <p>Боулы</p>
      </li>
      <li class="item">
        <NuxtImg src="/categories/drink.svg" />
        <p>Напитки</p>
      </li>
      <li class="item">
        <NuxtImg src="/categories/sauce.svg" />
        <p>Соусы</p>
      </li>
    </ul>
  </div>
</template>

<style scoped>
  .item {
    @apply flex flex-col items-center gap-1 py-1 px-4 rounded-sm cursor-pointer;
    transition: background-color 0.2s ease-in-out;
  }

  .item:hover {
    background-color: #e3e3e3;
  }
</style>