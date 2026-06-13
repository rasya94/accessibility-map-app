import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors";

export const berandaStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  topMap: {
    flex: 1,
    backgroundColor: "#F4F5F6",
    overflow: "hidden",
  },
  roadLine: {
    position: "absolute",
    backgroundColor: "rgba(180,190,200,0.42)",
  },
  sheet: {
    flex: 1.05,
    marginTop: -24,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});
