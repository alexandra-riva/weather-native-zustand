import { View, Text, TextInput, Pressable } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useWeatherStore } from "./store/useWeatherStore";

export default function SearchModal() {
  const [city, setCity] = useState("");
  const setCurrentCity = useWeatherStore((state) => state.setCurrentCity);
  const router = useRouter();

  function handleSubmit() {
    if (!city.trim()) return;

    setCurrentCity(city.trim());
    router.back();
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-end",
        padding: 20,
        backgroundColor: "rgba(0,0,0,0.2)",
      }}
    >
      <View
        style={{
          backgroundColor: "white",
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          padding: 20,
        }}
      >
        <Text style={{ fontSize: 18, marginBottom: 8 }}>
          Search city
        </Text>

        <TextInput
          value={city}
          onChangeText={setCity}
          placeholder="Type a city name"
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            padding: 12,
            marginBottom: 12,
          }}
        />

        <Pressable
          onPress={handleSubmit}
          style={{
            backgroundColor: "#2563eb",
            padding: 12,
            borderRadius: 8,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 16 }}>
            Search
          </Text>
        </Pressable>
      </View>
    </View>
  );
}