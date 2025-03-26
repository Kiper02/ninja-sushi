<script setup lang="ts">
  import Header from "~/components/shared/header.vue";
  import Categories from "~/components/shared/categories.vue";

  useSeoMeta({
    title: 'Home | Ninja Sushi'
  })

</script>

<template>
  <section class="py-4 px-44 mx-auto text-[#1D1D1F] text-base font-medium dark:text-white">
    <Header />
    <Categories />
  </section>
</template>

<style scoped>

</style>