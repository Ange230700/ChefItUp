// app\plugins\fetchUser.client.ts

import { useUserStore } from "../stores/userStore";
import api from "../axios-instance";

export default defineNuxtPlugin(async (_) => {
  const userStore = useUserStore();
  try {
    // Try to fetch the current user (will throw if not authenticated)
    const res = await api.get("/api/users/me", { withCredentials: true });
    if (res.data) {
      userStore.setUser(res.data);
    }
  } catch {
    userStore.clearUser();
  }
});
