import { ScrollView, Text, View } from "react-native";
import { COLORS } from "@/constants/colors";
import { AppButton } from "@/components/ui/app-button";
import { contributeStyles } from "../styles";

export function ContributeView() {
  return (
    <ScrollView contentContainerStyle={contributeStyles.container}>
      <View style={contributeStyles.card}>
        <Text style={{ fontSize: 22, fontWeight: "800", color: COLORS.text }}>
          Kontribusi
        </Text>
        <Text style={{ color: COLORS.gray600, lineHeight: 20 }}>
          Tambahkan tempat, perbarui aksesibilitas, dan bantu pengguna lain menemukan lokasi yang lebih ramah.
        </Text>
        <AppButton label="Tambah Lokasi" />
        <AppButton label="Perbarui Data" variant="ghost" />
      </View>
    </ScrollView>
  );
}
