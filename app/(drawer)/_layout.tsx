// app/(drawer)/_layout.tsx
import { Drawer } from "expo-router/drawer";

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        headerTransparent: true,
        headerTitle: "",
        headerTintColor: "#fff",
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{ title: "Weather" }}
      />
      <Drawer.Screen
        name="favorites"
        options={{
          title: "Favorites",
          headerTransparent: false,
        }}
      />
    </Drawer>
  );
}