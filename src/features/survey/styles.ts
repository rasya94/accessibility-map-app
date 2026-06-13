import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors";

export const surveyStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  hero: {
    height: 220,
    justifyContent: "space-between",
    paddingTop: 54,
    paddingHorizontal: 16,
  },
  card: {
    marginTop: -36,
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
