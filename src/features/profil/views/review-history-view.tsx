import { ScrollView, View, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text } from "@/components/ui/text";
import { COLORS } from "@/constants/colors";
import { ArrowLeft, ChevronRight, Clock } from "lucide-react-native";
import { router } from "expo-router"; 
import { reviewHistoryStyles } from "../review-history-styles";

export function ReviewHistoryView() {
  const insets = useSafeAreaInsets();

  // Data riwayat ulasan yang disesuaikan dengan struktur mockup gambar (10 item)
  const reviews = [
    {
      place: "Cafe Little Talk",
      status: "Ulasan dikirim",
      time: "2 jam lalu",
      type: "success", // Titik Hijau
    },
    {
      place: "Store Bright Day",
      status: "Data diperbarui",
      time: "1 hari lalu",
      type: "warning", // Titik Oranye
    },
    {
      place: "Taman Bungkul",
      status: "Ulasan dikirim",
      time: "2 hari lalu",
      type: "success",
    },
    {
      place: "ITS Sukolilo",
      status: "Data diperbarui",
      time: "3 hari lalu",
      type: "warning",
    },
    {
      place: "Pakuwon Mall",
      status: "Ulasan dikirim",
      time: "1 minggu lalu",
      type: "success",
    },
    {
      place: "Stasiun Gubeng",
      status: "Ulasan dikirim",
      time: "1 minggu lalu",
      type: "success",
    },
    {
      place: "Tunjungan Plaza",
      status: "Data diperbarui",
      time: "2 minggu lalu",
      type: "warning",
    },
    {
      place: "Gepruk Geprek Keputih",
      status: "Ulasan dikirim",
      time: "3 minggu lalu",
      type: "success",
    },
    {
      place: "Kantin Mungil Informatika",
      status: "Ulasan dikirim",
      time: "1 bulan lalu",
      type: "success",
    },
    {
      place: "Bandara Juanda T1",
      status: "Data diperbarui",
      time: "1 bulan lalu",
      type: "warning",
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.bg }}>
      {/* Top Header - Tetap Sticky & Konsisten */}
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
          Riwayat Ulasan
        </Text>
      </View>

      {/* Konten Utama List Riwayat */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          padding: 16,
          paddingBottom: insets.bottom + 24,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Kontainer Utama yang Membungkus List Elemen (Gaya Card menyatu melengkung) */}
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
          {reviews.map((item, index) => {
            // Tentukan warna titik bulat indikator berdasarkan status type di image_bcb6af.png
            const dotColor = item.type === "success" ? "#10B981" : "#F59E0B";

            return (
              <Pressable
                key={index}
                style={({ pressed }) => ({
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 16,
                  borderBottomWidth: index === reviews.length - 1 ? 0 : 1,
                  borderBottomColor: COLORS.gray100,
                  opacity: pressed ? 0.7 : 1,
                })}
              >
                {/* 1. Titik Indikator Status */}
                <View
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: dotColor,
                    marginRight: 14,
                  }}
                />

                {/* 2. Informasi Nama Tempat & Sub-status */}
                <View style={{ flex: 1, gap: 2, paddingRight: 8 }}>
                  <Text
                    style={[
                      reviewHistoryStyles.placeName,
                      { fontSize: 16, fontWeight: "600", color: COLORS.text },
                    ]}
                    numberOfLines={1}
                  >
                    {item.place}
                  </Text>
                  <Text
                    style={[
                      reviewHistoryStyles.reviewText,
                      { fontSize: 13, color: COLORS.gray300, fontWeight: "400" },
                    ]}
                  >
                    {item.status}
                  </Text>
                </View>

                {/* 3. Sisi Kanan: Durasi Waktu & Icon Navigasi */}
                <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                    <Clock size={13} color={COLORS.gray600} />
                    <Text style={{ fontSize: 13, color: COLORS.gray600, fontWeight: "400" }}>
                      {item.time}
                    </Text>
                  </View>
                  <ChevronRight size={14} color={COLORS.gray300} />
                </View>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}