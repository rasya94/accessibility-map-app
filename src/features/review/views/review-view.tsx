import { AppButton } from "@/components/ui/app-button";
import { SimpleToast } from "@/components/ui/simple-toast";
import { Text } from "@/components/ui/text";
import { COLORS } from "@/constants/colors";
import { Place } from "@/constants/mockData";
import { router } from "expo-router";
import { ArrowLeft, MapPin, Star, Image as ImageIcon } from "lucide-react-native";
import { useState } from "react";
import { ImageBackground, Pressable, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = { place: Place };

const LABELS = ["Sangat Buruk", "Buruk", "Cukup", "Bagus", "Sangat Bagus"];

export function ReviewView({ place }: Props) {
  const [rating, setRating] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const insets = useSafeAreaInsets();

  const handleNextPress = () => {
    if (rating === 0) {
      setShowToast(true);
      return;
    }
    router.push(`/survey/${place.id}`);
  };

  const handleUploadImage = () => {
    // Logic untuk image picker bisa diintegrasikan di sini
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <ImageBackground
        source={{ uri: place.image }}
        style={{
          height: 240,
          justifyContent: "flex-start",
          paddingTop: insets.top + 12,
          paddingHorizontal: 16,
        }}
        resizeMode="cover"
      >
        <View
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.22)",
          }}
        />
        <Pressable
          onPress={() => router.back()}
          style={{
            width: 42,
            height: 42,
            borderRadius: 12,
            backgroundColor: COLORS.white,
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
          }}
        >
          <ArrowLeft size={20} color={COLORS.black} />
        </Pressable>
      </ImageBackground>

      <View
        style={{
          marginTop: -28,
          marginHorizontal: 16,
          backgroundColor: COLORS.white,
          borderRadius: 22,
          padding: 18,
          shadowColor: COLORS.shadow,
          shadowOpacity: 0.1,
          shadowRadius: 20,
          shadowOffset: { width: 0, height: 8 },
          elevation: 6,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "800", color: COLORS.text }}>
          {place.name}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            marginTop: 6,
          }}
        >
          <Star size={13} color={COLORS.green400} fill={COLORS.green400} />
          <Text style={{ color: COLORS.text, fontWeight: "700", fontSize: 13 }}>
            {place.rating}
          </Text>
          <Text style={{ color: COLORS.muted, fontSize: 13 }}>
            ({place.reviews})
          </Text>
          <View
            style={{ width: 1, height: 12, backgroundColor: COLORS.gray200 }}
          />
          <MapPin size={13} color={COLORS.muted} />
          <Text style={{ color: COLORS.muted, fontSize: 13 }} numberOfLines={1}>
            {place.address}
          </Text>
        </View>
      </View>

      <View style={{ flex: 1, padding: 16, gap: 16 }}>
        <View
          style={{
            backgroundColor: COLORS.white,
            borderRadius: 20,
            padding: 20,
            alignItems: "center",
            gap: 12,
          }}
        >
          <Text style={{ fontSize: 14, fontWeight: "700", color: COLORS.text }}>
            Berikan Penilaian
          </Text>
          <View style={{ flexDirection: "row", gap: 12 }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Pressable key={i} onPress={() => setRating(i + 1)}>
                <Star
                  size={40}
                  color={COLORS.green400}
                  fill={i + 1 <= rating ? COLORS.green400 : "transparent"}
                  strokeWidth={i + 1 <= rating ? 1.5 : 1.8}
                />
              </Pressable>
            ))}
          </View>
          {rating > 0 && (
            <Text
              style={{
                fontSize: 13,
                color: COLORS.green400,
                fontWeight: "700",
              }}
            >
              {LABELS[rating - 1]}
            </Text>
          )}
        </View>

        <View
          style={{
            flex: 1,
            borderRadius: 20,
            borderWidth: 1.5,
            borderColor: COLORS.gray200,
            backgroundColor: COLORS.white,
            padding: 16,
          }}
        >
          <TextInput
            placeholder="Ceritakan pengalamanmu di sini..."
            placeholderTextColor={COLORS.gray300}
            multiline
            style={{
              flex: 1,
              fontSize: 14,
              color: COLORS.text,
              textAlignVertical: "top",
              fontFamily: "MonaSans",
              lineHeight: 22,
            }}
          />
        </View>

        <Pressable
          onPress={handleUploadImage}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            backgroundColor: COLORS.white,
            borderRadius: 16,
            padding: 14,
            borderWidth: 1.5,
            borderColor: COLORS.gray200,
            borderStyle: "dashed",
          }}
        >
          <ImageIcon size={18} color={COLORS.muted} />
          <Text style={{ fontSize: 14, fontWeight: "600", color: COLORS.muted }}>
            Tambah Foto
          </Text>
        </Pressable>

        <AppButton
          label="Mulai Survei"
          variant={rating === 0 ? "disabled" : "dark"}
          onPress={handleNextPress}
        />
      </View>

      <SimpleToast
        visible={showToast}
        message="Pilih bintang terlebih dahulu"
        onDismiss={() => setShowToast(false)}
        duration={1500}
        bottomOffset={insets.bottom + 80}
        variant="error"
      />
    </View>
  );
}