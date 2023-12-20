import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IImage } from "../utils/image.types";

type State = {
  favoritesImages: IImage[];
};

type Actions = {
  addFavoritesImages: (image: IImage) => void;
  removeFavoritesImages: (image: IImage) => void;
  removeAllFavoritesImages: () => void;
};

export const useFavoriteImagesStore = create(
  persist<State & Actions>(
    (set) => ({
      favoritesImages: [],
      addFavoritesImages: (image: IImage) =>
        set((state) => ({
          favoritesImages: [...state.favoritesImages, image],
        })),
      removeFavoritesImages: (image: IImage) =>
        set((state) => ({
          favoritesImages: state.favoritesImages.filter(
            (favoriteImage) => favoriteImage.id !== image.id
          ),
        })),
      removeAllFavoritesImages: () =>
        set(() => ({
          favoritesImages: [],
        })),
    }),
    {
      name: "favoriteImages",
    }
  )
);
