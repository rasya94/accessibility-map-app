import { useState } from "react";
import { ImageBackground, Pressable, TextInput, View } from "react-native";
import { Text } from "@/components/ui/text";
import { router } from "expo-router";
import { ArrowLeft, MapPin, Star } from "lucide-react-native";
import { AppButton } from "@/components/ui/app-button";
import { COLORS } from "@/constants/colors";
import { Place } from "@/constants/mockData";
import { reviewStyles } from "../styles";

type Props = { place: Place };

export function ReviewView({ place }: Props) {
  const [rating, setRating] = useState(4);

  return (
    <View style={reviewStyles.container}>
      <ImageBackground source={{ uri: place.image }} style={reviewStyles.hero} resizeMode="cover">
        <Pressable
          onPress={() => router.back()}
          style={{
            width: 44,
            height: 44,
            borderRadius: 22,
            backgroundColor: COLORS.white,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ArrowLeft size={20} color={COLORS.black} />
        </Pressable>
        <View style={{ alignItems: "flex-end" }} />
      </ImageBackground>

      <View style={reviewStyles.card}>
        <Text style={{ fontSize: 20, fontWeight: "800", color: COLORS.text }}>{place.name}</Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginTop: 8 }}>
          <Star size={14} color={COLORS.green} fill={COLORS.green} />
          <Text style={{ color: COLORS.gray600, fontWeight: "700" }}>
            {place.rating} ({place.reviews})
          </Text>
          <MapPin size={14} color={COLORS.green} style={{ marginLeft: 8 }} />
          <Text style={{ color: COLORS.gray600 }}>{place.address}</Text>
        </View>
      </View>

      <View style={{ flex: 1, padding: 16, gap: 16 }}>
        <View style={{ alignItems: "center", marginTop: 10 }}>
          <View style={{ flexDirection: "row", gap: 10 }}>
            {Array.from({ length: 5 }).map((_, index) => (
              <Pressable key={index} onPress={() => setRating(index + 1)}>
                <Star
                  size={36}
                  color={COLORS.green}
                  fill={(index + 1) <= rating ? COLORS.green : "transparent"}
                  strokeWidth={(index + 1) <= rating ? 1.5 : 2}
                />
              </Pressable>
            ))}
          </View>
        </View>

        <View
          style={{
            minHeight: 220,
            borderRadius: 24,
            borderWidth: 1,
            borderColor: COLORS.gray200,
            backgroundColor: COLORS.white,
            padding: 16,
          }}
        >
          <TextInput
            placeholder="Berikan Ulasan"
            placeholderTextColor={COLORS.gray300}
            multiline
            style={{ flex: 1, fontSize: 15, color: COLORS.text, textAlignVertical: "top", fontFamily: "MonaSans" }}
          />
        </View>

        <AppButton label="Mulai Survei" variant="dark" onPress={() => router.push(`/survey/${place.id}`)} />
      </View>
    </View>
  );
}
