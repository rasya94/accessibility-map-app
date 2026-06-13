import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors";

export const profileStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg, padding: 16, paddingTop: 64 },
  card: { backgroundColor: COLORS.white, borderRadius: 26, padding: 18, gap: 12 },
});
