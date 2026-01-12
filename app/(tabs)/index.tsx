import { router } from "expo-router";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import {
  ActivityIndicator,
  Button,
  Pressable,
  Text,
  View,
} from "react-native";

import { useGetWeatherByCityQuery } from "@/redux/weatherApi";
import { useWeatherStore } from "@/store/useWeatherStore";
import i18n from "@/i18n";

export default function HomeScreen() {
  // Drawer control (React Navigation)
  const navigation = useNavigation();

  // Zustand state
  const {
    currentCity,
    setCurrentCity,
    toggleFavorite,
    favorites,
  } = useWeatherStore();

  // RTK Query API fetching
  const {
    data: weather,
    isLoading,
    error,
  } = useGetWeatherByCityQuery(currentCity!, {
    skip: !currentCity,
  });

  // No city selected
  if (!currentCity) {
    return (
      <View style={styles.center}>
        <Text>{i18n.t("noCity")}</Text>
        <Button
          title={i18n.t("useStockholm")}
          onPress={() => setCurrentCity("Stockholm")}
        />
      </View>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
      </View>
    );
  }

  // Error state
  if (error) {
    return (
      <View style={styles.center}>
        <Text>{i18n.t("failedToLoad")}</Text>
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
        title={
          isFavorite
            ? i18n.t("removeFavorite")
            : i18n.t("addFavorite")
        }
        onPress={() => toggleFavorite(currentCity)}
      />

      {/* Search modal (Expo Router) */}
      <Pressable onPress={() => router.push("/search")}>
        <Text style={styles.link}>{i18n.t("searchCity")}</Text>
      </Pressable>

      {/* Open favorites drawer (React Navigation) */}
      <Pressable
        onPress={() =>
          navigation.dispatch(DrawerActions.openDrawer())
        }
      >
        <Text style={styles.link}>{i18n.t("favorites")}</Text>
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