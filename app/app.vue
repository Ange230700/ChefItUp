<!-- app\App.vue -->

<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <FooterComponent />
</template>

<script setup lang="ts">
import FooterComponent from "./components/FooterComponent.vue";
</script>
