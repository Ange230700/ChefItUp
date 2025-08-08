<!-- eslint-disable vue/multi-word-component-names -->
<!-- app\pages\login.vue -->
<template>
  <div class="container mx-auto max-w-md flex-1 p-8">
    <h2 class="mb-4 text-2xl font-bold">Sign In</h2>
    <form @submit.prevent="login">
      <input
        v-model="email"
        type="email"
        placeholder="Email"
        class="input"
        required
      />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        class="input"
        required
      />
      <button class="btn" :disabled="loading">
        {{ loading ? "Signing in..." : "Sign In" }}
      </button>
      <p v-if="error" class="mt-2 text-red-500">{{ error }}</p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import api from "../axios-instance";
import { useUserStore } from "../stores/userStore";
import axios from "axios";

const email = ref("");
const password = ref("");
const loading = ref(false);
const error = ref("");
const router = useRouter();
const userStore = useUserStore();

async function login() {
  loading.value = true;
  error.value = "";
  try {
    const res = await api.post("/api/users/login", {
      email: email.value,
      password: password.value,
    });
    userStore.setUser(res.data);
    router.push("/home");
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      error.value =
        err.response?.data?.message || err.message || "Failed to login";
    } else if (err instanceof Error) {
      error.value = err.message;
    } else {
      error.value = "Failed to login";
    }
  } finally {
    loading.value = false;
  }
}
</script>
