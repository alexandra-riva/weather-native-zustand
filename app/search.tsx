import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

import { searchCities } from "@/api/weather";
import { useWeatherStore } from "@/store/useWeatherStore";
import i18n from "@/i18n";

export default function SearchModal() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);

  const setCurrentCity = useWeatherStore(
    (state) => state.setCurrentCity
  );
  const router = useRouter();

useEffect(() => {
  if (!query.trim()) {
    setResults([]);
    return;
  }

  const timeout = setTimeout(async () => {
    const cities = await searchCities(query);
    setResults(cities);

    if (cities.length === 1) {
      setCurrentCity(cities[0]);
      router.back();
    }
  }, 400);

  return () => clearTimeout(timeout);
}, [query]);

  function handleSelect(city: string) {
    setCurrentCity(city);
    router.back();
  }

  return (
    <View style={styles.overlay}>
      <View style={styles.sheet}>
        <Text style={styles.title}>{i18n.t("searchCity")}</Text>

        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Type a city name"
          style={styles.input}
        />

        <FlatList
          data={results}
          keyExtractor={(item) => item}
          keyboardShouldPersistTaps="handled"
          renderItem={({ item }) => (
            <Pressable
              onPress={() => handleSelect(item)}
              style={styles.item}
            >
              <Text style={styles.itemText}>{item}</Text>
            </Pressable>
          )}
        />
      </View>
    </View>
  );
}

const styles = {
  overlay: {
    flex: 1,
    justifyContent: "flex-end" as const,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  sheet: {
    backgroundColor: "white",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
    maxHeight: "70%",
  },
  title: {
    fontSize: 18,
    marginBottom: 8,
    fontWeight: "600" as const,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  item: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  itemText: {
    fontSize: 16,
  },
};