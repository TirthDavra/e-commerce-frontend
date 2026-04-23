"use client";

import { create } from "zustand";
import { persist, createJSONStorage, type StateStorage } from "zustand/middleware";

const noopStorage: StateStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
};

export type UserRole = "admin" | "recruiter" | "candidate";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthState {
  user: User | null;
  token: string | null;

  setAuth: (data: { user: User; token: string }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,

      setAuth: ({ user, token }) => {
        set({ user, token });

        document.cookie = `token=${token}; path=/; max-age=604800`;
      },

      logout: () => {
        set({ user: null, token: null });

        if (typeof window !== "undefined") {
          document.cookie =
            "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0";
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() =>
        typeof window !== "undefined" ? localStorage : noopStorage
      ),
    }
  )
);
