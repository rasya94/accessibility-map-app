import { ScrollView, View, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text } from "@/components/ui/text";
import { COLORS } from "@/constants/colors";
import { ArrowLeft, HelpCircle, MapPinPlus, ShieldAlert, Info } from "lucide-react-native";
import { router } from "expo-router"; 

export function HelpView() {
  const insets = useSafeAreaInsets();

  const sections = [
    {
      title: "Cara Memberikan Ulasan",
      text: "Pilih lokasi yang ingin diulas, kemudian tekan tombol kontribusi dan isi informasi aksesibilitas sesuai kondisi lokasi.",
      icon: HelpCircle,
      iconColor: COLORS.green200,
      iconBg: COLORS.green1000,
    },
    {
      title: "Cara Menambahkan Tempat",
      text: "Pengguna dapat mengusulkan lokasi baru melalui fitur kontribusi agar dapat membantu komunitas menemukan informasi aksesibilitas yang lebih luas.",
      icon: MapPinPlus,
      iconColor: COLORS.text,
      iconBg: COLORS.gray100,
    },
    {
      title: "Kebijakan Privasi",
      text: "Data yang diberikan pengguna hanya digunakan untuk mendukung informasi aksesibilitas dan meningkatkan kualitas layanan aplikasi.",
      icon: ShieldAlert,
      iconColor: COLORS.orange,
      iconBg: COLORS.orangeSoft,
    },
    {
      title: "Tentang Aplikasi",
      text: "Accessibility Map membantu pengguna menemukan informasi aksesibilitas suatu lokasi berdasarkan kontribusi komunitas.",
      icon: Info,
      iconColor: COLORS.muted,
      iconBg: COLORS.gray100,
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.bg }}>
      {/* Top Header */}
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
        <Text style={{ fontSize: 18, fontFamily: "MonaSans-Bold", color: COLORS.text }}>
          Pusat Bantuan
        </Text>
      </View>

      {/* Konten Utama */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          padding: 16,
          paddingBottom: insets.bottom + 24,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Satu Kontainer Utama yang Bersih */}
        <View
          style={{
            backgroundColor: COLORS.white,
            borderRadius: 24,
            paddingHorizontal: 16,
            shadowColor: COLORS.shadow,
            shadowOpacity: 0.04,
            shadowRadius: 10,
            shadowOffset: { width: 0, height: 4 },
            elevation: 2,
          }}
        >
          {sections.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <View
                key={index}
                style={{
                  paddingVertical: 18,
                  borderBottomWidth: index === sections.length - 1 ? 0 : 1,
                  borderBottomColor: COLORS.gray100,
                  gap: 8,
                }}
              >
                {/* Baris Atas: Ikon + Judul */}
                <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                  <View
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 10,
                      backgroundColor: item.iconBg,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <IconComponent size={18} color={item.iconColor} />
                  </View>
                  <Text style={{ fontSize: 15, fontFamily: "MonaSans-Bold", color: COLORS.text, flex: 1 }}>
                    {item.title}
                  </Text>
                </View>

                {/* Deskripsi Teks */}
                <View style={{ paddingLeft: 46, paddingRight: 4 }}>
                  <Text style={{ fontSize: 13, color: COLORS.gray600, lineHeight: 19, fontFamily: "MonaSans-Regular" }}>
                    {item.text}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}