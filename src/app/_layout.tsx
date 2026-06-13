import { ThemeProvider } from "@/providers/theme-provider";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
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
