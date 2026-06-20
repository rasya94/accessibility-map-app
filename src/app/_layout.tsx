import { ThemeProvider } from "@/providers/theme-provider";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    // 1. Variable Fonts
    MonaSans: require("../../assets/fonts/MonaSans.ttf"),
    "MonaSans-Italic": require("../../assets/fonts/MonaSans-Italic.ttf"),

    // 2. 5 Berkas Static Fonts
    "MonaSans-Regular": require("../../assets/fonts/static/MonaSans-Regular.ttf"),
    "MonaSans-Medium": require("../../assets/fonts/static/MonaSans-Medium.ttf"),
    "MonaSans-SemiBold": require("../../assets/fonts/static/MonaSans-SemiBold.ttf"),
    "MonaSans-Bold": require("../../assets/fonts/static/MonaSans-Bold.ttf"),
    "MonaSans-ExtraBold": require("../../assets/fonts/static/MonaSans-ExtraBold.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <ThemeProvider>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        {/* Rute pendaftaran dan login melalui app/index.tsx */}
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="place/[id]" />
        <Stack.Screen name="review/[id]" />
        <Stack.Screen name="survey/[id]" />
        <Stack.Screen name="settings" />
        <Stack.Screen name="help" />
      </Stack>
    </ThemeProvider>
  );
}