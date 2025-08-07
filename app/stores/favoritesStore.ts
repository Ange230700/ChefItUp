// app/stores/favoritesStore.ts

import { defineStore } from "pinia";
import { ref } from "vue";
import api from "../axios-instance";
import type { Recipe } from "./recipesStore";
import { useUserStore } from "./userStore";
import axios from "axios";

export const useFavoritesStore = defineStore("favorites", () => {
  const favorites = ref<Recipe[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const userStore = useUserStore();

  async function fetchFavorites() {
    loading.value = true;
    error.value = null;
    if (!userStore.user) {
      favorites.value = [];
      loading.value = false;
      return;
    }
    try {
      // We'll fetch all recipes and filter client-side for simplicity,
      // or you can implement `/api/favoris?user_id=...` on the backend
      const res = await api.get("/api/recettes");
      favorites.value = res.data.filter((r: Recipe) =>
        r.Favoris?.some((f) => f.user_id === userStore.user!.id),
      );
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        error.value =
          err.response?.data?.message ||
          err.message ||
          "Could not load favorites";
      } else if (err instanceof Error) {
        error.value = err.message;
      } else {
        error.value = "Could not load favorites";
      }
    } finally {
      loading.value = false;
    }
  }

  return { favorites, loading, error, fetchFavorites };
});
