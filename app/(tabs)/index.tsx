import { View, Text, Button, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { Link } from "expo-router";
import { fetchWeather } from "../api/weather";
import { useWeatherStore } from "../store/useWeatherStore";

export default function HomeScreen() {
  const { currentCity, setCurrentCity, toggleFavorite, favorites } =
    useWeatherStore();

  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!currentCity) return;

    setLoading(true);
    fetchWeather(currentCity)
      .then(setWeather)
      .finally(() => setLoading(false));
  }, [currentCity]);

  if (!currentCity) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>No city selected</Text>
        <Button title="Use Stockholm" onPress={() => setCurrentCity("Stockholm")} />
      </View>
    );
  }

  if (loading) return <ActivityIndicator />;

  const isFavorite = favorites.includes(currentCity);

return (
  <View
    style={{
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      gap: 12,
    }}
  >
    <Text style={{ fontSize: 24 }}>{currentCity}</Text>

    <Text style={{ fontSize: 18 }}>
      {weather?.currentConditions?.temp} °C
    </Text>

    <Button
      title={isFavorite ? "Remove from favorites" : "Add to favorites"}
      onPress={() => toggleFavorite(currentCity)}
    />

    {/* Search modal */}
    <Link href="/search">
      <Button title="Search city" />
    </Link>

    {/* Favorites modal */}
    <Link href="/modal">
      <Button title="Open favorites" />
    </Link>
  </View>
); }