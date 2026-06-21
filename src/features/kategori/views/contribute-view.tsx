import { Text } from "@/components/ui/text";
import { COLORS } from "@/constants/colors";
import { useRouter } from "expo-router";
import {
  ChevronRight,
  ClipboardList,
  Clock,
  MapPin,
  Star,
} from "lucide-react-native";
import { Pressable, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Data riwayat kontribusi
const recentContributions = [
  {
    id: "1",
    name: "Cafe Little Talk",
    type: "Ulasan dikirim",
    time: "2 jam lalu",
    color: COLORS.green400,
    route: "/review/1",
  },
  {
    id: "2",
    name: "Store Bright Day",
    type: "Data diperbarui",
    time: "1 hari lalu",
    color: COLORS.orange,
    route: "/survey/2",
  },
];

export function ContributeView() {
  const insets = useSafeAreaInsets();
  const router = useRouter(); // Fungsi navigasi

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: COLORS.bg }}
      contentContainerStyle={{
        paddingTop: insets.top + 16,
        paddingBottom: insets.bottom + 16,
        gap: 14,
      }}
    >
      {/* Header */}
      <View style={{ paddingHorizontal: 16 }}>
        <Text style={{ fontFamily: "MonaSans-Bold", fontSize: 22, color: COLORS.text }}>
          Kontribusi
        </Text>
        <Text style={{ fontFamily: "MonaSans-Regular", fontSize: 14, color: COLORS.muted, marginTop: 4 }}>
          Bantu sesama dengan memperbarui data aksesibilitas.
        </Text>
      </View>

      {/* Kartu Menu Aksi Utama */}
      <View style={{ paddingHorizontal: 16, gap: 12 }}>
        {[
          {
            icon: MapPin,
            title: "Tambah Lokasi Baru",
            desc: "Daftarkan tempat yang belum ada di peta.",
            color: COLORS.green400,
            bg: COLORS.green1000,
            route: "/place/add", 
          },
          // {
          //   icon: ClipboardList,
          //   title: "Isi Survei Aksesibilitas",
          //   desc: "Bantu perbarui data fasilitas tempat yang sudah ada.",
          //   color: COLORS.orange,
          //   bg: COLORS.orangeSoft,
          //   route: "/survey/new", 
          // },
          {
            icon: Star,
            title: "Tulis Ulasan",
            desc: "Bagikan pengalamanmu mengunjungi tempat ini.",
            color: COLORS.mapBlue,
            bg: "#EEF3FF",
            route: "/review/new", 
          },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <Pressable
              key={item.title}
              onPress={() => item.route && router.push(item.route as any)}
              style={({ pressed }) => ({
                backgroundColor: COLORS.white,
                borderRadius: 28,
                padding: 22,
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
                  width: 64,
                  height: 64,
                  borderRadius: 20,
                  backgroundColor: item.bg,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon size={32} color={item.color} />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: "MonaSans-SemiBold",
                    color: COLORS.text,
                  }}
                >
                  {item.title}
                </Text>
                <Text
                  style={{ fontFamily: "MonaSans-Regular", fontSize: 13, color: COLORS.muted, marginTop: 2 }}
                >
                  {item.desc}
                </Text>
              </View>
              <ChevronRight size={18} color={COLORS.gray300} />
            </Pressable>
          );
        })}
      </View>

      {/* Daftar Kontribusi Terbaru */}
      <View style={{ paddingHorizontal: 16 }}>
        <Text
          style={{
            fontSize: 15,
            fontFamily: "MonaSans-Bold",
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
            <Pressable
              key={c.id}
              onPress={() => c.route && router.push(c.route as any)}
              style={({ pressed }) => ({
                flexDirection: "row",
                alignItems: "center",
                padding: 14,
                borderBottomWidth: i < recentContributions.length - 1 ? 1 : 0,
                borderBottomColor: COLORS.gray100,
                backgroundColor: pressed ? COLORS.gray100 : COLORS.white, 
              })}
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
                    fontFamily: "MonaSans-Medium",
                    color: COLORS.text,
                  }}
                >
                  {c.name}
                </Text>
                <Text style={{ fontFamily: "MonaSans-Regular", fontSize: 12, color: COLORS.muted }}>
                  {c.type}
                </Text>
              </View>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
              >
                <Clock size={11} color={COLORS.muted} style={{ marginRight: 4 }}/>
                <Text style={{ fontFamily: "MonaSans-Regular", fontSize: 12, color: COLORS.muted }}>
                  {c.time}
                </Text>
              </View>
              <ChevronRight
                size={16}
                color={COLORS.gray300}
                style={{ marginLeft: 8 }}
              />
            </Pressable>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}