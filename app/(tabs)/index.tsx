import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Pressable,
  Text,
  View,
} from "react-native";

import { fetchWeather } from "@/api/weather";
import { useWeatherStore } from "@/store/useWeatherStore";

export default function HomeScreen() {
  const router = useRouter();

  const {
    currentCity,
    setCurrentCity,
    refreshKey,
    toggleFavorite,
    favorites,
  } = useWeatherStore();

  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!currentCity) return;

    setLoading(true);
    fetchWeather(currentCity)
      .then(setWeather)
      .finally(() => setLoading(false));
  }, [currentCity, refreshKey]); // 👈 IMPORTANT

  if (!currentCity) {
    return (
      <View style={styles.center}>
        <Text>No city selected</Text>
        <Button
          title="Use Stockholm"
          onPress={() => setCurrentCity("Stockholm")}
        />
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
      </View>
    );
  }

  const isFavorite = favorites.includes(currentCity);

  return (
    <View style={styles.center}>
      <Text style={styles.city}>{currentCity}</Text>

      <Text style={styles.temp}>
        {weather?.currentConditions?.temp} °C
      </Text>

      <Button
        title={isFavorite ? "Remove from favorites" : "Add to favorites"}
        onPress={() => toggleFavorite(currentCity)}
      />

      {/* SEARCH MODAL */}
      <Pressable onPress={() => router.push("/search")}>
        <Text style={styles.link}>Search city</Text>
      </Pressable>

      {/* FAVORITES MODAL */}
      <Pressable onPress={() => router.push("/modal")}>
        <Text style={styles.link}>Open favorites</Text>
      </Pressable>
    </View>
  );
}

const styles = {
  center: {
    flex: 1,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    gap: 12,
  },
  city: {
    fontSize: 24,
    fontWeight: "600" as const,
  },
  temp: {
    fontSize: 18,
  },
  link: {
    color: "blue",
    marginTop: 12,
  },
};