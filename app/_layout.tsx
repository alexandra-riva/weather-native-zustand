// app/_layout.tsx
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Stack } from "expo-router";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <Provider store={store}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          {/* Drawer app */}
          <Stack.Screen name="(drawer)" />

          {/* Search modal */}
          <Stack.Screen
            name="search"
            options={{
              presentation: "transparentModal",
              animation: "slide_from_bottom",
            }}
          />
        </Stack>

        <StatusBar style="auto" />
      </ThemeProvider>
    </Provider>
  );
}