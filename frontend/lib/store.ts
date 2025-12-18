// lib/store.ts
import { create } from "zustand";

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  is_reviewer: boolean;
  is_academic_staff: boolean;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  isAuthenticated: false,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
      isLoading: false,
    }),

  logout: () => {
    set({ user: null, isAuthenticated: false });
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  },
}));
