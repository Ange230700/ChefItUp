<!-- app\components\FooterComponent.vue -->

<template>
  <footer class="mt-8 min-w-full bg-[var(--p-surface-700)] py-5 text-center">
    <p>&copy; {{ currentYear }} V∅ID. All rights reserved.</p>
    <p>
      Check out the project on
      <Button
        as="a"
        label="GitHub"
        href="https://github.com/Ange230700/ultime_motus"
        target="_blank"
        rel="noopener"
        variant="link"
        style="font-size: 1.5rem"
      />
    </p>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>
