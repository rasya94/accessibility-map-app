import { StyleSheet, Dimensions } from "react-native";
import { COLORS } from "@/constants/colors";

const { width } = Dimensions.get("window");
// Menghitung ukuran kotak gambar agar responsif di berbagai ukuran layar
const IMAGE_SIZE = width - 64; 

export const authStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 32,
  },
  // --- SPLASH IMAGE STYLE (PENGGANTI LOGO & TEXT) ---
  splashImageContainer: {
    alignItems: "center",
    marginBottom: 80,
    marginTop: 20,
  },
  squareSplashImage: {
    width: IMAGE_SIZE*0.9,
    height: IMAGE_SIZE*0.9,
    borderRadius: 24, // Membuat sudut kotak sedikit melengkung halus modern
    backgroundColor: "transparent", // Placeholder rona abu-abu jika gambar gagal dimuat
  },
  // --- REGISTER VIEW STYLES ---
  registerTitle: {
    fontSize: 22,
    fontFamily: "MonaSans-SemiBold",
    color: COLORS.text,
    lineHeight: 30,
    marginBottom: 32,
    marginTop: 12,
  },
  sectionLabel: {
    fontSize: 15,
    fontFamily: "MonaSans-SemiBold",
    color: COLORS.text,
    marginBottom: 16,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 36,
    paddingVertical: 4,
  },
  checkboxLabel: {
    fontSize: 13,
    color: COLORS.muted,
    fontFamily: "MonaSans-Medium",
  },
  // --- COMMON FORM STYLES ---
  formGroup: {
    gap: 14,
    marginBottom: 24,
  },
  inputCapsule: {
    height: 54,
    backgroundColor: COLORS.gray100,
    borderRadius: 24,
    paddingHorizontal: 20,
    fontSize: 14,
    color: COLORS.text,
    fontFamily: "MonaSans-Medium",
  },
  actionGroup: {
    gap: 20,
    marginTop: "auto",
  },
  linkButton: {
    alignSelf: "center",
    paddingVertical: 4,
  },
  linkText: {
    color: COLORS.green200,
    fontSize: 15,
    fontWeight: "700",
    textDecorationLine: "underline",
  },
  footerTextInline: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: "700",
  },
});