import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  Text,
  TextInput,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { searchCities } from "@/api/weather";
import { useWeatherStore } from "@/store/useWeatherStore";
import i18n from "@/i18n";

export default function SearchModal() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);

  const setCurrentCity = useWeatherStore((s) => s.setCurrentCity);
  const router = useRouter();

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      const cities = await searchCities(query);

      if (cities.length === 1) {
        setCurrentCity(cities[0]);
        router.back();
        return;
      }

      setResults(cities);
    }, 400);

    return () => clearTimeout(timeout);
  }, [query]);

  function selectCity(city: string) {
    setCurrentCity(city);
    router.back();
  }

  return (
    <View style={styles.overlay}>
      {/* tap outside to close */}
      <Pressable
        style={StyleSheet.absoluteFill}
        onPress={() => router.back()}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.sheet}>
          <Text style={styles.title}>{i18n.t("searchCity")}</Text>

          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder={i18n.t("searchCity")}
            style={styles.input}
            autoFocus
          />

          <FlatList
            data={results}
            keyExtractor={(i) => i}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item }) => (
              <Pressable
                onPress={() => selectCity(item)}
                style={styles.item}
              >
                <Text style={styles.itemText}>{item}</Text>
              </Pressable>
            )}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "transparent", // ✅ THIS IS THE KEY
  },
  sheet: {
    backgroundColor: "white",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    minHeight: "30%",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  item: {
    paddingVertical: 12,
  },
  itemText: {
    fontSize: 16,
  },
});