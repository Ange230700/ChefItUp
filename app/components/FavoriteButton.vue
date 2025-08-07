<!-- app\components\FavoriteButton.vue -->

<template>
  <button
    :class="['btn', isFavorite ? 'bg-green-500' : 'bg-gray-300']"
    :disabled="working"
    @click.prevent="toggleFavorite"
  >
    <span v-if="isFavorite">★ Favorited</span>
    <span v-else>☆ Favorite</span>
  </button>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import axios from "../axios-instance";
import { useUserStore } from "../stores/userStore";
import type { Recipe } from "../stores/recipesStore";

const props = defineProps<{ recette: Recipe }>();
const emit = defineEmits(["favorite", "unfavorite"]);
const working = ref(false);

const userStore = useUserStore();
const user = computed(() => userStore.user);

const isFavorite = computed(() => {
  if (!user.value) return false;
  return (
    props.recette.Favoris?.some((f) => f.user_id === user.value?.id) ?? false
  );
});

async function toggleFavorite() {
  if (!user.value) {
    alert("Please log in to favorite recipes.");
    return;
  }
  working.value = true;
  try {
    if (isFavorite.value) {
      await axios.post("/api/favoris/remove", {
        user_id: user.value.id,
        recette_id: props.recette.id,
      });
      emit("unfavorite", props.recette.id); // Tell parent to remove
    } else {
      await axios.post("/api/favoris/add", {
        user_id: user.value.id,
        recette_id: props.recette.id,
      });
      emit("favorite", props.recette.id); // Tell parent to add
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    alert(message || "Error updating favorite.");
  } finally {
    working.value = false;
  }
}
</script>
