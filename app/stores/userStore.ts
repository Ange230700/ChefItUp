// app/stores/userStore.ts
import { defineStore } from "pinia";

export type UserRole = "USER" | "ADMIN";

export interface User {
  id: number;
  pseudo: string;
  email: string;
  date_inscription: string;
  role: UserRole;
}

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null as User | null,
  }),
  actions: {
    setUser(user: User) {
      this.user = user;
    },
    clearUser() {
      this.user = null;
    },
  },
});
