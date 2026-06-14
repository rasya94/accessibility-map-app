import { Text } from "@/components/ui/text";
import { COLORS } from "@/constants/colors";
import {
  ChevronRight,
  ClipboardList,
  Clock,
  MapPin,
  Star,
} from "lucide-react-native";
import { Pressable, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const recentContributions = [
  {
    name: "Cafe Little Talk",
    type: "Ulasan dikirim",
    time: "2 jam lalu",
    color: COLORS.green400,
  },
  {
    name: "Store Bright Day",
    type: "Data diperbarui",
    time: "1 hari lalu",
    color: COLORS.orange,
  },
];

export function ContributeView() {
  const insets = useSafeAreaInsets();
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: COLORS.bg }}
      contentContainerStyle={{
        paddingTop: insets.top + 16,
        paddingBottom: insets.bottom + 16,
        gap: 14,
      }}
    >
      <View style={{ paddingHorizontal: 16 }}>
        <Text style={{ fontSize: 22, fontWeight: "800", color: COLORS.text }}>
          Kontribusi
        </Text>
        <Text style={{ fontSize: 14, color: COLORS.muted, marginTop: 4 }}>
          Bantu sesama dengan memperbarui data aksesibilitas.
        </Text>
      </View>

      {/* Action cards */}
      <View style={{ paddingHorizontal: 16, gap: 12 }}>
        {[
          {
            icon: MapPin,
            title: "Tambah Lokasi Baru",
            desc: "Daftarkan tempat yang belum ada di peta.",
            color: COLORS.green400,
            bg: COLORS.green1000,
          },
          {
            icon: ClipboardList,
            title: "Isi Survei Aksesibilitas",
            desc: "Bantu perbarui data fasilitas tempat yang sudah ada.",
            color: COLORS.orange,
            bg: COLORS.orangeSoft,
          },
          {
            icon: Star,
            title: "Tulis Ulasan",
            desc: "Bagikan pengalamanmu mengunjungi tempat ini.",
            color: COLORS.mapBlue,
            bg: "#EEF3FF",
          },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <Pressable
              key={item.title}
              style={({ pressed }) => ({
                backgroundColor: COLORS.white,
                borderRadius: 20,
                padding: 18,
                flexDirection: "row",
                alignItems: "center",
                gap: 14,
                opacity: pressed ? 0.9 : 1,
                shadowColor: COLORS.shadow,
                shadowOpacity: 0.06,
                shadowRadius: 12,
                shadowOffset: { width: 0, height: 4 },
                elevation: 2,
              })}
            >
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  backgroundColor: item.bg,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon size={22} color={item.color} />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "700",
                    color: COLORS.text,
                  }}
                >
                  {item.title}
                </Text>
                <Text
                  style={{ fontSize: 13, color: COLORS.muted, marginTop: 2 }}
                >
                  {item.desc}
                </Text>
              </View>
              <ChevronRight size={18} color={COLORS.gray300} />
            </Pressable>
          );
        })}
      </View>

      {/* Recent */}
      <View style={{ paddingHorizontal: 16 }}>
        <Text
          style={{
            fontSize: 15,
            fontWeight: "700",
            color: COLORS.text,
            marginBottom: 10,
          }}
        >
          Kontribusi Terbaru
        </Text>
        <View
          style={{
            backgroundColor: COLORS.white,
            borderRadius: 20,
            overflow: "hidden",
            shadowColor: COLORS.shadow,
            shadowOpacity: 0.06,
            shadowRadius: 12,
            shadowOffset: { width: 0, height: 4 },
            elevation: 2,
          }}
        >
          {recentContributions.map((c, i) => (
            <View
              key={c.name}
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 14,
                borderBottomWidth: i < recentContributions.length - 1 ? 1 : 0,
                borderBottomColor: COLORS.gray100,
              }}
            >
              <View
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: c.color,
                  marginRight: 12,
                }}
              />
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    color: COLORS.text,
                  }}
                >
                  {c.name}
                </Text>
                <Text style={{ fontSize: 12, color: COLORS.muted }}>
                  {c.type}
                </Text>
              </View>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
              >
                <Clock size={11} color={COLORS.muted} />
                <Text style={{ fontSize: 11, color: COLORS.muted }}>
                  {c.time}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
