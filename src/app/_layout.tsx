import { ThemeProvider } from "@/providers/theme-provider";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    MonaSans: require("../../assets/fonts/MonaSans.ttf"),
    "MonaSans-Italic": require("../../assets/fonts/MonaSans-Italic.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <ThemeProvider>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="place/[id]" />
        <Stack.Screen name="review/[id]" />
        <Stack.Screen name="survey/[id]" />
      </Stack>
    </ThemeProvider>
  );
}
