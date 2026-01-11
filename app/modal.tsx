import { View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useWeatherStore } from "@/store/useWeatherStore";

export default function FavoritesModal() {
  const router = useRouter();
  const { favorites, setCurrentCity } = useWeatherStore();

  function selectCity(city: string) {
    setCurrentCity(city);
    router.back();
  }

  return (
    <View style={styles.overlay}>
      <View style={styles.sheet}>
        <Text style={styles.title}>Favorite cities</Text>

        {favorites.length === 0 && (
          <Text style={{ opacity: 0.6 }}>No favorites yet</Text>
        )}

        {favorites.map((city) => (
          <Pressable key={city} onPress={() => selectCity(city)}>
            <Text style={styles.city}>{city}</Text>
          </Pressable>
        ))}

        <Pressable onPress={() => router.back()}>
          <Text style={styles.close}>Close</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  sheet: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  city: {
    fontSize: 16,
    paddingVertical: 8,
  },
  close: {
    marginTop: 16,
    color: "blue",
  },
});