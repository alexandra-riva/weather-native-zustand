import { View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useWeatherStore } from "@/store/useWeatherStore";
import i18n from "@/i18n";

export default function FavoritesScreen() {
  const router = useRouter();
  const { favorites, setCurrentCity } = useWeatherStore();

  function selectCity(city: string) {
    setCurrentCity(city);
    router.replace("/"); // back to Home (tabs/index)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t("favorites")}</Text>

      {favorites.length === 0 && (
        <Text style={styles.empty}>
          {i18n.t("noFavorites", "No favorites yet")}
        </Text>
      )}

      {favorites.map((city) => (
        <Pressable key={city} onPress={() => selectCity(city)}>
          <Text style={styles.city}>{city}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
  },
  city: {
    fontSize: 16,
    paddingVertical: 10,
  },
  empty: {
    opacity: 0.6,
  },
});