import { ScrollView, View, Pressable, Switch } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text } from "@/components/ui/text";
import { COLORS } from "@/constants/colors";
import { 
  ArrowLeft, 
  ChevronRight, 
  User, 
  Bell, 
  Eye, 
  Globe, 
  KeyRound, 
  Fingerprint, 
  LogOut, 
  Trash2 
} from "lucide-react-native";
import { useState } from "react";
import { router } from "expo-router";

export function SettingsView() {
  const insets = useSafeAreaInsets();
  
  const [isBiometricActive, setIsBiometricActive] = useState(true);

  const generalMenu = [
    { label: "Detail Profil", icon: User, onPress: () => router.push("/settings/profile-detail") },
    { label: "Notifikasi", icon: Bell, onPress: () => {} },
    { label: "Tampilan", icon: Eye, onPress: () => {} },
    { label: "Bahasa", icon: Globe, onPress: () => {} },
  ];

  const securityMenu = [
    { label: "Ubah Kata Sandi", icon: KeyRound, onPress: () => {} },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.bg }}>
      {/* Top Header - Tetap Sesuai Struktur Sebelumnya */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingTop: insets.top + 16,
          paddingBottom: 16,
          paddingHorizontal: 16,
          backgroundColor: COLORS.white,
          borderBottomWidth: 1.5,
          borderColor: COLORS.gray100,
          gap: 12,
        }}
      >
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => ({
            width: 40,
            height: 40,
            borderRadius: 12,
            backgroundColor: COLORS.gray100,
            alignItems: "center",
            justifyContent: "center",
            opacity: pressed ? 0.7 : 1,
          })}
        >
          <ArrowLeft size={20} color={COLORS.text} />
        </Pressable>
        <Text style={{ fontSize: 18, fontWeight: "800", color: COLORS.text }}>
          Pengaturan
        </Text>
      </View>

      {/* Konten Utama Isi ScrollView */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 16,
          paddingBottom: insets.bottom + 24,
          gap: 24,
        }}
      >
        {/* KELOMPOK 1: GENERAL */}
        <View style={{ gap: 10 }}>
          <Text style={{ fontSize: 14, fontWeight: "700", color: COLORS.muted, paddingLeft: 4 }}>
            General
          </Text>
          <View style={{ backgroundColor: COLORS.white, borderRadius: 24, paddingHorizontal: 16, paddingVertical: 4 }}>
            {generalMenu.map((item, index) => {
              const Icon = item.icon;
              return (
                <Pressable
                  key={item.label}
                  onPress={item.onPress}
                  style={({ pressed }) => ({
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingVertical: 16,
                    borderBottomWidth: index === generalMenu.length - 1 ? 0 : 1,
                    borderBottomColor: COLORS.gray100,
                    opacity: pressed ? 0.7 : 1,
                  })}
                >
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 14, flex: 1 }}>
                    <Icon size={20} color={COLORS.text} />
                    <Text style={{ fontSize: 15, fontWeight: "600", color: COLORS.text }}>
                      {item.label}
                    </Text>
                  </View>
                  <ChevronRight size={16} color={COLORS.gray600} />
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* KELOMPOK 2: SECURITY */}
        <View style={{ gap: 10 }}>
          <Text style={{ fontSize: 14, fontWeight: "700", color: COLORS.muted, paddingLeft: 4 }}>
            Security
          </Text>
          <View style={{ backgroundColor: COLORS.white, borderRadius: 24, paddingHorizontal: 16, paddingVertical: 4 }}>
            {/* Row Mandatori: Ubah Kata Sandi */}
            {securityMenu.map((item, index) => {
              const Icon = item.icon;
              return (
                <Pressable
                  key={item.label}
                  onPress={item.onPress}
                  style={({ pressed }) => ({
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingVertical: 16,
                    borderBottomWidth: 1, // Ada border karena di bawahnya ada menu biometrik
                    borderBottomColor: COLORS.gray100,
                    opacity: pressed ? 0.7 : 1,
                  })}
                >
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 14, flex: 1 }}>
                    <Icon size={20} color={COLORS.text} />
                    <Text style={{ fontSize: 15, fontWeight: "600", color: COLORS.text }}>
                      {item.label}
                    </Text>
                  </View>
                  <ChevronRight size={16} color={COLORS.gray600} />
                </Pressable>
              );
            })}

            {/* Tambahan Sesuai Mockup Screenshot: Biometrics Toggle (Switch) */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: 12,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center", gap: 14, flex: 1 }}>
                <Fingerprint size={20} color={COLORS.text} />
                <Text style={{ fontSize: 15, fontWeight: "600", color: COLORS.text }}>
                  Biometrics (Face ID / Sidik Jari)
                </Text>
              </View>
              <Switch
                value={isBiometricActive}
                onValueChange={setIsBiometricActive}
                trackColor={{ false: COLORS.gray200, true: "#4CD964" }} // Mengikuti aksen hijau switch di gambar figma
                thumbColor={COLORS.white}
              />
            </View>
          </View>
        </View>

        {/* KELOMPOK OPSI AKSI (KELUAR & HAPUS AKUN) */}
        <View style={{ gap: 12, marginTop: 8 }}>
          {/* Tombol Keluar Akun */}
          <Pressable
            style={({ pressed }) => ({
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
              padding: 16,
              borderRadius: 20,
              backgroundColor: COLORS.white,
              borderWidth: 1.5,
              borderColor: COLORS.gray100,
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <LogOut size={18} color={COLORS.text} />
            <Text style={{ fontSize: 15, fontWeight: "700", color: COLORS.text }}>
              Keluar Akun
            </Text>
          </Pressable>

          {/* Tombol Hapus Akun Permanen */}
          <Pressable
            style={({ pressed }) => ({
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
              padding: 16,
              borderRadius: 20,
              backgroundColor: COLORS.redSoft,
              borderWidth: 1,
              borderColor: COLORS.red + "20",
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <Trash2 size={18} color={COLORS.red} />
            <Text style={{ fontSize: 15, fontWeight: "700", color: COLORS.red }}>
              Hapus Akun Permanen
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}