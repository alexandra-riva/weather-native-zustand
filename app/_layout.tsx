import { Drawer } from "expo-router/drawer";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <Provider store={store}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Drawer>
          <Drawer.Screen
            name="(tabs)"
            options={{ title: "Weather" }}
          />
          <Drawer.Screen
            name="favorites"
            options={{ title: "Favorites" }}
          />
        </Drawer>

        <StatusBar style="auto" />
      </ThemeProvider>
    </Provider>
  );
}