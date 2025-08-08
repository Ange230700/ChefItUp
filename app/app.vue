<!-- app\app.vue -->

<template>
  <NuxtRouteAnnouncer />
  <PrimeNavbar />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <FooterComponent />
</template>

<script setup lang="ts">
import PrimeNavbar from "./components/PrimeNavbar.vue";
import FooterComponent from "./components/FooterComponent.vue";
</script>
