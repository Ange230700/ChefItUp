<!-- eslint-disable vue/multi-word-component-names -->
<!-- app\pages\recipes.vue -->

<template>
  <div class="container mx-auto p-8">
    <h1 class="mb-6 text-3xl font-bold">Recipes</h1>
    <button class="btn mb-4" :disabled="loading" @click="fetchRecipes">
      {{ loading ? "Refreshing..." : "Refresh Recipes" }}
    </button>
    <div v-if="error" class="text-red-500">{{ error }}</div>
    <div v-else-if="recipes.length === 0 && !loading">No recipes found.</div>
    <ul v-else>
      <li
        v-for="recette in recipes"
        :key="recette.id"
        class="mb-6 rounded border p-4"
      >
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold">
            {{ recette.titre }}
            <span class="ml-2 text-sm font-normal text-gray-400">
              ({{ recette.Categories?.nom || "No category" }})
            </span>
          </h2>
          <FavoriteButton
            :recette="recette"
            @favorite="onFavorited"
            @unfavorite="onUnfavorited"
          />
        </div>
        <div>
          <span class="mr-4">⏱ {{ recette.duree }} min</span>
          <span>Difficulty: {{ recette.difficulte }}</span>
        </div>
        <div class="mt-2 text-gray-700">
          {{ recette.instructions }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRecipesStore } from "../stores/recipesStore";
import FavoriteButton from "../components/FavoriteButton.vue";

function onFavorited(_: number) {
  // (Optionally) refetch the recipes, or update locally
  // await fetchRecipes();
}

function onUnfavorited(_: number) {
  // (Optionally) refetch the recipes, or update locally
  // await fetchRecipes();
}

const { recipes, loading, error, fetchRecipes } = useRecipesStore();

onMounted(fetchRecipes);
</script>
