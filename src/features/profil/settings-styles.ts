import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors";

export const settingsStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: 24,
  },

  sectionTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.gray600,
    marginBottom: 10,
    marginTop: 8,
  },

  card: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    paddingHorizontal: 16,

    shadowColor: COLORS.shadow,
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 3,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
  },

  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },

  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: COLORS.gray100,
    alignItems: "center",
    justifyContent: "center",
  },

  itemLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
  },

  divider: {
    height: 1,
    backgroundColor: COLORS.gray100,
  },

  valueText: {
    fontSize: 13,
    color: COLORS.gray600,
  },
});