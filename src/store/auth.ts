import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IUser {
  user: string;
  password: string;
}

type State = {
  user: IUser | null;
  isAuth: boolean;
};

type Actions = {
  login: (user: IUser) => void;
  logout: () => void;
};

export const useAuthStore = create(
  persist<State & Actions>(
    (set) => ({
      user: null,
      isAuth: false,
      login: (user: IUser) => {
        set({ user, isAuth: true });
      },
      logout: () => set(() => ({ user: null, isAuth: false })),
    }),
    {
      name: "auth",
    }
  )
);
