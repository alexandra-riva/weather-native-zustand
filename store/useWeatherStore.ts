import { create } from "zustand";
import { persist } from "zustand/middleware";

type WeatherStore = {
  currentCity: string | null;
  favorites: string[];
  setCurrentCity: (city: string) => void;
  toggleFavorite: (city: string) => void;
};

export const useWeatherStore = create<WeatherStore>()(
  persist(
    (set) => ({
      currentCity: null,
      favorites: [],

      setCurrentCity: (city) => set({ currentCity: city }),

      toggleFavorite: (city) =>
        set((state) => ({
          favorites: state.favorites.includes(city)
            ? state.favorites.filter((c) => c !== city)
            : [...state.favorites, city],
        })),
    }),
    {
      name: "weather-storage", 
    }
  )
);