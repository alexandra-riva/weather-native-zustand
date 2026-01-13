import { useCallback } from "react";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import { useWeatherStore } from "@/store/useWeatherStore";

export default function MyLocationScreen() {
  const router = useRouter();
  const useMyLocation = useWeatherStore((s) => s.useMyLocation);

  useFocusEffect(
    useCallback(() => {
      useMyLocation();    
      router.replace("/");  
    }, [])
  );

  return null;
}