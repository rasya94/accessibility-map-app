import { AppButton } from "@/components/ui/app-button";
import { Text } from "@/components/ui/text";
import { COLORS } from "@/constants/colors";
import {
  Bell,
  ChevronRight,
  LogOut,
  MapPin,
  Settings,
  Shield,
  Star,
  User,
} from "lucide-react-native";
import { Pressable, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const menuItems = [
  { icon: MapPin, label: "Kontribusi Saya", sub: "12 lokasi ditambahkan" },
  { icon: Star, label: "Ulasan Saya", sub: "8 ulasan diberikan" },
  { icon: Bell, label: "Notifikasi", sub: "Aktif" },
  { icon: Shield, label: "Privasi & Keamanan", sub: "" },
  { icon: Settings, label: "Pengaturan", sub: "" },
];

export function ProfileView() {
  const insets = useSafeAreaInsets();
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: COLORS.bg }}
      contentContainerStyle={{
        paddingTop: insets.top + 16,
        paddingBottom: insets.bottom + 16,
      }}
    >
      {/* Header */}
      <View style={{ paddingHorizontal: 16, marginBottom: 20 }}>
        <Text style={{ fontSize: 22, fontWeight: "800", color: COLORS.text }}>
          Profil
        </Text>
      </View>

      {/* Avatar card */}
      <View
        style={{
          marginHorizontal: 16,
          backgroundColor: COLORS.white,
          borderRadius: 22,
          padding: 20,
          alignItems: "center",
          gap: 10,
          marginBottom: 14,
          shadowColor: COLORS.shadow,
          shadowOpacity: 0.06,
          shadowRadius: 14,
          shadowOffset: { width: 0, height: 4 },
          elevation: 3,
        }}
      >
        <View
          style={{
            width: 72,
            height: 72,
            borderRadius: 36,
            backgroundColor: COLORS.green1000,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <User size={32} color={COLORS.green400} />
        </View>
        <Text style={{ fontSize: 18, fontWeight: "800", color: COLORS.text }}>
          Pengguna Easy Route
        </Text>
        <Text style={{ fontSize: 13, color: COLORS.muted }}>
          Bergabung sejak Juni 2025
        </Text>

        <View style={{ flexDirection: "row", gap: 24, marginTop: 6 }}>
          {[
            { value: "12", label: "Kontribusi" },
            { value: "8", label: "Ulasan" },
            { value: "4.8", label: "Rating" },
          ].map((s) => (
            <View key={s.label} style={{ alignItems: "center", gap: 2 }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "800",
                  color: COLORS.green400,
                }}
              >
                {s.value}
              </Text>
              <Text style={{ fontSize: 12, color: COLORS.muted }}>
                {s.label}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Menu */}
      <View
        style={{
          marginHorizontal: 16,
          backgroundColor: COLORS.white,
          borderRadius: 22,
          overflow: "hidden",
          marginBottom: 14,
          shadowColor: COLORS.shadow,
          shadowOpacity: 0.06,
          shadowRadius: 14,
          shadowOffset: { width: 0, height: 4 },
          elevation: 3,
        }}
      >
        {menuItems.map((item, i) => {
          const Icon = item.icon;
          return (
            <Pressable
              key={item.label}
              style={({ pressed }) => ({
                flexDirection: "row",
                alignItems: "center",
                padding: 16,
                borderBottomWidth: i < menuItems.length - 1 ? 1 : 0,
                borderBottomColor: COLORS.gray100,
                backgroundColor: pressed ? COLORS.gray100 : COLORS.white,
              })}
            >
              <View
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  backgroundColor: COLORS.green1000,
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 12,
                }}
              >
                <Icon size={17} color={COLORS.green400} />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    color: COLORS.text,
                  }}
                >
                  {item.label}
                </Text>
                {!!item.sub && (
                  <Text
                    style={{ fontSize: 12, color: COLORS.muted, marginTop: 1 }}
                  >
                    {item.sub}
                  </Text>
                )}
              </View>
              <ChevronRight size={16} color={COLORS.gray300} />
            </Pressable>
          );
        })}
      </View>

      <View style={{ paddingHorizontal: 16 }}>
        <AppButton
          label="Keluar"
          variant="ghost"
          icon={<LogOut size={16} color={COLORS.text} />}
          onPress={() => {}}
        />
      </View>
    </ScrollView>
  );
}
