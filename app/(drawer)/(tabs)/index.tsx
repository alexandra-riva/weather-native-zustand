import { useEffect } from "react";
import * as Location from "expo-location";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import {
  ActivityIndicator,
  Pressable,
  Text,
  View,
} from "react-native";

import { useGetWeatherByCityQuery } from "@/redux/weatherApi";
import { useWeatherStore } from "@/store/useWeatherStore";
import { getWeatherTheme } from "@/utils/weatherTheme";
import i18n from "@/i18n";

export default function HomeScreen() {
  const navigation = useNavigation();

  const {
    currentCity,
    setCurrentCity,
    toggleFavorite,
    favorites,
  } = useWeatherStore();

  /* ------------------ AUTO LOCATION ON APP START ------------------ */
  useEffect(() => {
    if (currentCity) return; 

    (async () => {
      const { status } =
        await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") return;

      const loc = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = loc.coords;

      // Store coordinates for API usage
      setCurrentCity(`${latitude},${longitude}`);
    })();
  }, [currentCity, setCurrentCity]);

  /* ------------------ API FETCH (RTK QUERY) ------------------ */
  const {
    data: weather,
    isLoading,
    error,
  } = useGetWeatherByCityQuery(currentCity!, {
    skip: !currentCity,
  });

  /* ------------------ LOADING STATE ------------------ */
  if (!currentCity || isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
      </View>
    );
  }

  /* ------------------ ERROR STATE ------------------ */
  if (error || !weather) {
    return (
      <View style={styles.center}>
        <Text>{i18n.t("failedToLoad")}</Text>
      </View>
    );
  }

  /* ------------------ WEATHER THEME ------------------ */
  const temp = Math.round(weather.currentConditions.temp);
  const condition = weather.currentConditions.conditions ?? "";

  const hour = new Date().getHours();
  const isNight = hour < 6 || hour > 19;

  const { gradient, emoji } = getWeatherTheme(
    condition,
    temp,
    isNight
  );

  /* ------------------ CITY LABEL (IMPORTANT FIX) ------------------ */
  const displayCity = currentCity.includes(",")
    ? i18n.t("myLocation")
    : currentCity;

  const isFavorite = favorites.includes(currentCity);

  /* ------------------ UI ------------------ */
  return (
    <LinearGradient colors={gradient} style={styles.gradient}>
      <Text style={styles.emoji}>{emoji}</Text>

      <Text style={styles.city}>{displayCity}</Text>

      <Text style={styles.temp}>{temp}°C</Text>

      {/* ❤️ Favorite toggle */}
      <Pressable
        onPress={() => toggleFavorite(currentCity)}
        style={{ marginVertical: 8 }}
      >
        <Text style={styles.heart}>
          {isFavorite ? "❤️" : "🤍"}
        </Text>
      </Pressable>

      {/* Search modal */}
      <Pressable
        onPress={() => navigation.navigate("search" as never)}
      >
        <Text style={styles.link}>
          {i18n.t("searchCity")}
        </Text>
      </Pressable>
    </LinearGradient>
  );
}

/* ------------------ STYLES ------------------ */
const styles = {
  gradient: {
    flex: 1,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    gap: 14,
  },
  center: {
    flex: 1,
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },
  emoji: {
    fontSize: 42,
  },
  city: {
    fontSize: 22,
    fontWeight: "600" as const,
    color: "white",
    opacity: 0.9,
  },
  temp: {
    fontSize: 64,
    fontWeight: "700" as const,
    color: "white",
  },
  heart: {
    fontSize: 28,
  },
  link: {
    color: "white",
    marginTop: 12,
    opacity: 0.85,
  },
};