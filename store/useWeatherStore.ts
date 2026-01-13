import { create } from "zustand";
import { persist } from "zustand/middleware";

type WeatherStore = {
  currentCity: string | null;
  favorites: string[]; 

  setCurrentCity: (city: string | null) => void;
  toggleFavorite: (city: string) => void;
  useMyLocation: () => void;
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

      useMyLocation: () => {
        set({ currentCity: null });
      },
    }),
    {
      name: "weather-storage",
    }
  )
);