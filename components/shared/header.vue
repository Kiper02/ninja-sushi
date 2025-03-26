<script setup lang="ts">

import Logo from "~/components/shared/logo.vue";
</script>

<template>
  <header class="w-full flex items-center rounded-xl justify-between py-3 px-4 dark:bg-[#0d1117] bg-white">
    <div class="flex items-center gap-3">
      <NuxtLink src="/">
        <Logo />
      </NuxtLink>
      <div class="flex items-center justify-center py-2 px-2 bg-[#F5F5F7] rounded-sm cursor-pointer">
        <NuxtImg src="/icons/arrow.svg" />
      </div>
    </div>

    <ul class="flex gap-12">
      <li><NuxtLink src="/">Главня</NuxtLink></li>
      <li><NuxtLink src="/delivery">Доставка</NuxtLink></li>
      <li><NuxtLink src="/about">О нас</NuxtLink></li>
      <li><NuxtLink src="/news">Новости</NuxtLink></li>
      <li>
        <a href="tel:+380976993438" class="flex items-center">
          <NuxtImg src="/icons/phone.svg" />
          <p class="ml-2">+38 097 699 34 38</p>
        </a>
      </li>
    </ul>

    <ul class="flex items-center gap-3">
      <li class="btn-wrapper">
        <NuxtImg src="/icons/bell.svg"/>
      </li>
      <li class="btn-wrapper">
        <NuxtImg src="/icons/heart.svg"/>
      </li>
      <li class="btn-wrapper">
        <NuxtImg src="/icons/profile.svg"/>
      </li>
      <li class="btn-wrapper-long">
        <p>Корзина</p>
        <NuxtImg src="/icons/basket.svg"/>
      </li>
    </ul>
  </header>
</template>

<style scoped>
  .btn-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px;
    border: 1px solid #D2D2D7;
    border-radius: 12px;
    transition: background-color 0.2s ease-in-out;
    cursor: pointer;
  }

  .btn-wrapper:hover {
    background-color: #e3e3e3;
  }

  .btn-wrapper-long {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px 24px;
    border: 1px solid #D2D2D7;
    border-radius: 12px;
    gap: 8px;
    transition: background-color 0.2s ease-in-out;
    cursor: pointer;
  }

  .btn-wrapper-long:hover {
    background-color: #e3e3e3;
  }

  .logo {
    color: white; /* Цвет по умолчанию (светлая тема) */
  }

  .dark .logo {
    color: white; /* Цвет для темной темы */
  }
</style>