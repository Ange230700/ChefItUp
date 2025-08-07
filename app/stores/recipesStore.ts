// app\stores\recipesStore.ts

import { defineStore } from "pinia";
import { ref } from "vue";
import api from "../axios-instance";
import axios from "axios";

export interface Recipe {
  id: number;
  titre: string;
  duree: number;
  difficulte: string;
  instructions: string;
  categorie_id?: number;
  Categories?: { nom: string };
  Favoris?: Array<{ user_id: number; recette_id: number }>;
}

export const useRecipesStore = defineStore("recipes", () => {
  const recipes = ref<Recipe[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchRecipes() {
    loading.value = true;
    error.value = null;
    try {
      const res = await api.get("/api/recettes");
      recipes.value = res.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        error.value =
          err.response?.data?.message ||
          err.message ||
          "Could not load recipes";
      } else if (err instanceof Error) {
        error.value = err.message;
      } else {
        error.value = "Could not load recipes";
      }
    } finally {
      loading.value = false;
    }
  }

  return { recipes, loading, error, fetchRecipes };
});
