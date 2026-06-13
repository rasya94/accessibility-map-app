import { ScrollView, Text, View } from "react-native";
import { User } from "lucide-react-native";
import { COLORS } from "@/constants/colors";
import { profileStyles } from "../styles";

export function ProfileView() {
  return (
    <ScrollView contentContainerStyle={profileStyles.container}>
      <View style={profileStyles.card}>
        <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: COLORS.greenSoft, alignItems: "center", justifyContent: "center" }}>
          <User size={28} color={COLORS.green} />
        </View>
        <Text style={{ fontSize: 22, fontWeight: "800", color: COLORS.text }}>Profil</Text>
        <Text style={{ color: COLORS.gray600 }}>
          Area ini bisa dipakai untuk kontribusi, riwayat ulasan, dan pengaturan akun.
        </Text>
      </View>
    </ScrollView>
  );
}
