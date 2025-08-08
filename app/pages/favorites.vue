<!-- eslint-disable vue/multi-word-component-names -->
<!-- app\pages\favorites.vue -->

<template>
  <div class="container mx-auto p-8">
    <h1 class="mb-6 text-3xl font-bold">My Favorite Recipes</h1>
    <div v-if="error" class="text-red-500">{{ error }}</div>
    <div v-else-if="favorites.length === 0 && !loading">
      You have no favorite recipes.
    </div>
    <ul v-else>
      <li
        v-for="recette in favorites"
        :key="recette.id"
        class="mb-6 rounded border p-4"
      >
        <h2 class="text-xl font-bold">{{ recette.titre }}</h2>
        <div>
          <span class="mr-4">⏱ {{ recette.duree }} min</span>
          <span>Difficulty: {{ recette.difficulte }}</span>
        </div>
        <div class="mt-2 text-gray-700">
          {{ recette.instructions }}
        </div>
        <FavoriteButton
          :recette="recette"
          @favorite="onFavorited"
          @unfavorite="onUnfavorited"
        />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useFavoritesStore } from "../stores/favoritesStore";
import FavoriteButton from "../components/FavoriteButton.vue";

function onFavorited(_: number) {
  // (Optionally) refetch the recipes, or update locally
  // await fetchRecipes();
}

function onUnfavorited(_: number) {
  // (Optionally) refetch the recipes, or update locally
  // await fetchRecipes();
}

const { favorites, loading, error, fetchFavorites } = useFavoritesStore();

onMounted(fetchFavorites);
</script>
