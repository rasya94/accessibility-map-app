import { AppButton } from "@/components/ui/app-button";
import { Text } from "@/components/ui/text";
import { COLORS } from "@/constants/colors";
import { 
  ChevronRight, 
  History, 
  Settings, 
  ShieldCheck, 
  User,
  UserPen 
} from "lucide-react-native";
import { Pressable, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { profileStyles } from "../styles";
import { router } from "expo-router";

export function ProfileView() {
  const insets = useSafeAreaInsets();

  const menuItems = [
    {
      label: "Riwayat Ulasan",
      icon: History,
      onPress: () => router.push("settings/review-history"),
    },
    {
      label: "Pengaturan",
      icon: Settings,
      onPress: () => router.push("settings/settings"),
    },
    {
      label: "Pusat Bantuan",
      icon: ShieldCheck,
      onPress: () => router.push("settings/help"),
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={[
          profileStyles.container, 
          { 
            paddingHorizontal: 24,
            paddingTop: insets.top + 16,
            paddingBottom: insets.bottom + 24 
          }
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header di dalam ScrollView agar jarak rapat ke foto & bisa ikut ter-scroll */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: "800", color: COLORS.text }}>
            Profil
          </Text>
          
          {/* Tombol Edit Profil - Fungsi dikosongkan */}
          <Pressable
            onPress={() => {}}
            style={({ pressed }) => ({
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: COLORS.green1000,
              alignItems: "center",
              justifyContent: "center",
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <UserPen size={18} color={COLORS.green200} />
          </Pressable>
        </View>

        {/* Avatar & Informasi User */}
        <View style={{ alignItems: "center", gap: 12, marginBottom: 24 }}>
          <View 
            style={{ 
              width: 96, 
              height: 96, 
              borderRadius: 48, 
              backgroundColor: COLORS.gray100, 
              alignItems: "center", 
              justifyContent: "center",
              borderWidth: 3,
              borderColor: COLORS.white,
              shadowColor: COLORS.shadow,
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 4,
            }}
          >
            <User size={44} color={COLORS.text} />
          </View>
          
          <View style={{ alignItems: "center", gap: 4 }}>
            <Text style={{ fontSize: 22, fontWeight: "800", color: COLORS.text }}>
              Albert Tesla
            </Text>
            <Text style={{ fontSize: 13, color: COLORS.gray600, fontWeight: "500" }}>
              user@email.com
            </Text>
          </View>
        </View>

        {/* Kartu Statistik */}
        <View 
          style={{ 
            flexDirection: "row", 
            backgroundColor: COLORS.white, 
            borderRadius: 24, 
            paddingVertical: 18, 
            marginBottom: 24,
            shadowColor: COLORS.shadow,
            shadowOpacity: 0.05,
            shadowRadius: 10,
            shadowOffset: { width: 0, height: 4 },
            elevation: 2,
          }}
        >
          <View style={{ flex: 1, alignItems: "center", gap: 4 }}>
            <Text style={{ fontSize: 13, color: COLORS.muted, fontWeight: "600" }}>
              Total Ulasan
            </Text>
            <Text style={{ fontSize: 20, fontWeight: "800", color: COLORS.text }}>
              12
            </Text>
          </View>
          
          <View style={{ width: 1.5, backgroundColor: COLORS.gray100, marginVertical: 2 }} />
          
          <View style={{ flex: 1, alignItems: "center", gap: 4 }}>
            <Text style={{ fontSize: 13, color: COLORS.muted, fontWeight: "600" }}>
              Reputasi
            </Text>
            <Text style={{ fontSize: 20, fontWeight: "800", color: COLORS.green200 }}>
              240
            </Text>
          </View>
        </View>

        {/* Menu List */}
        <View 
          style={{ 
            backgroundColor: COLORS.white, 
            borderRadius: 24, 
            paddingVertical: 6,
            paddingHorizontal: 16,
            shadowColor: COLORS.shadow,
            shadowOpacity: 0.05,
            shadowRadius: 10,
            shadowOffset: { width: 0, height: 4 },
            elevation: 2,
          }}
        >
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Pressable
                key={item.label}
                onPress={item.onPress}
                style={({ pressed }) => [
                  {
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingVertical: 16,
                    borderBottomWidth: index === menuItems.length - 1 ? 0 : 1,
                    borderBottomColor: COLORS.gray100,
                    opacity: pressed ? 0.7 : 1,
                  }
                ]}
              >
                <View style={{ flexDirection: "row", alignItems: "center", gap: 14, flex: 1 }}>
                  <View 
                    style={{ 
                      width: 38, 
                      height: 38, 
                      borderRadius: 12, 
                      backgroundColor: COLORS.gray100, 
                      alignItems: "center", 
                      justifyContent: "center" 
                    }}
                  >
                    <Icon size={18} color={COLORS.text} />
                  </View>
                  <Text style={{ fontSize: 15, fontWeight: "600", color: COLORS.text }}>
                    {item.label}
                  </Text>
                </View>
                <ChevronRight size={16} color={COLORS.gray600} />
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}