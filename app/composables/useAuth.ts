// app\composables\useAuth.ts

import { ref, computed } from "vue";
import { useUserStore } from "@/stores/userStore";
import api from "@/axios-instance";
import axios from "axios";

// Keep accessToken in module scope (memory only)
let accessToken = "";

const loading = ref(false);
const error = ref<string | null>(null);

export function useAuth() {
  const userStore = useUserStore();

  const isAuthenticated = computed(() => !!userStore.user);

  // Registration
  async function register({
    pseudo,
    email,
    password,
  }: {
    pseudo: string;
    email: string;
    password: string;
  }) {
    loading.value = true;
    error.value = null;
    try {
      const res = await api.post(
        "/api/users/register",
        { pseudo, email, password },
        { withCredentials: true },
      );
      accessToken = res.data.accessToken;
      await fetchMe();
      return true;
    } catch (err: unknown) {
      let msg = "Registration failed";
      if (axios.isAxiosError(err)) {
        msg = err.response?.data?.statusMessage || err.message || msg;
      } else if (err instanceof Error) {
        msg = err.message;
      }
      error.value = msg;
      return false;
    } finally {
      loading.value = false;
    }
  }

  // Login
  async function login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    loading.value = true;
    error.value = null;
    try {
      const res = await api.post(
        "/api/users/login",
        { email, password },
        { withCredentials: true },
      );
      accessToken = res.data.accessToken;
      await fetchMe();
      return true;
    } catch (err: unknown) {
      let msg = "Login failed";
      if (axios.isAxiosError(err)) {
        msg = err.response?.data?.statusMessage || err.message || msg;
      } else if (err instanceof Error) {
        msg = err.message;
      }
      error.value = msg;
      return false;
    } finally {
      loading.value = false;
    }
  }

  // Logout
  async function logout() {
    loading.value = true;
    error.value = null;
    try {
      await api.post("/api/users/logout", {}, { withCredentials: true });
      accessToken = "";
      userStore.clearUser();
      return true;
    } catch (err: unknown) {
      let msg = "Logout failed";
      if (axios.isAxiosError(err)) {
        msg = err.response?.data?.statusMessage || err.message || msg;
      } else if (err instanceof Error) {
        msg = err.message;
      }
      error.value = msg;
      return false;
    } finally {
      loading.value = false;
    }
  }

  // Fetch current user ("me")
  async function fetchMe() {
    loading.value = true;
    error.value = null;
    try {
      const res = await api.get("/api/users/me", {
        withCredentials: true,
        headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
      });
      userStore.setUser(res.data);
      return true;
    } catch (err: unknown) {
      let unauthorized = false;
      if (axios.isAxiosError(err)) {
        unauthorized = err.response?.status === 401;
        error.value =
          err.response?.data?.statusMessage ||
          err.message ||
          "Failed to fetch user";
      } else if (err instanceof Error) {
        error.value = err.message;
      } else {
        error.value = "Failed to fetch user";
      }

      // If unauthorized, try to refresh accessToken
      if (unauthorized && (await refresh())) {
        return fetchMe();
      }
      userStore.clearUser();
      return false;
    } finally {
      loading.value = false;
    }
  }

  // Refresh access token using cookie
  async function refresh() {
    try {
      const res = await api.post(
        "/api/users/refresh",
        {},
        { withCredentials: true },
      );
      accessToken = res.data.accessToken;
      return !!accessToken;
    } catch {
      accessToken = "";
      userStore.clearUser();
      return false;
    }
  }

  // Call fetchMe on app load
  if (!userStore.user && import.meta.client) {
    fetchMe();
  }

  return {
    user: computed(() => userStore.user),
    isAuthenticated,
    loading,
    error,
    accessToken: computed(() => accessToken),
    register,
    login,
    logout,
    fetchMe,
    refresh,
  };
}
