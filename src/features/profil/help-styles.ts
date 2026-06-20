import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors";

export const helpStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: 24,
  },

  card: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,

    shadowColor: COLORS.shadow,
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 3,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 8,
  },

  sectionText: {
    fontSize: 14,
    lineHeight: 22,
    color: COLORS.gray600,
  },
});