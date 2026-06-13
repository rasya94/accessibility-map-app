import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors";

export const reviewStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  hero: {
    height: 260,
    justifyContent: "space-between",
    paddingTop: 54,
    paddingHorizontal: 16,
  },
  card: {
    marginTop: -44,
    marginHorizontal: 16,
    backgroundColor: COLORS.white,
    borderRadius: 26,
    padding: 18,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
  },
});
