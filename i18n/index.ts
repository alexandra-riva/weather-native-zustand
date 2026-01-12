import { I18n } from "i18n-js";
import * as Localization from "expo-localization";

const i18n = new I18n({
  en: {
    // Home
    searchCity: "Search city",
    noCity: "No city selected",
    useStockholm: "Use Stockholm",
    addFavorite: "Add to favorites",
    removeFavorite: "Remove from favorites",
    failedToLoad: "Failed to load weather",
    localTime: "Local time",

    // Favorites
    favorites: "Favorites",
    noFavorites: "No favorites yet",
  },

  sv: {
    // Home
    searchCity: "Sök stad",
    noCity: "Ingen stad vald",
    useStockholm: "Använd Stockholm",
    addFavorite: "Lägg till favorit",
    removeFavorite: "Ta bort favorit",
    failedToLoad: "Kunde inte hämta väder",
    localTime: "Lokal tid",

    // Favorites
    favorites: "Favoriter",
    noFavorites: "Inga favoriter än",
  },
});

// Detect device language
i18n.locale = Localization.getLocales()[0]?.languageCode ?? "en";

// Fallback to English
i18n.enableFallback = true;

export default i18n;