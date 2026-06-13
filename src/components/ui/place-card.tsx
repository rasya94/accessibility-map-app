import { Image, Pressable, Text, View } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Place } from "@/constants/mockData";
import { COLORS } from "@/constants/colors";

type Props = {
  place: Place;
};

export function PlaceCard({ place }: Props) {
  return (
    <Pressable
      onPress={() => router.push(`/place/${place.id}`)}
      style={({ pressed }) => [
        {
          flexDirection: "row",
          gap: 12,
          padding: 10,
          backgroundColor: place.id === "1" ? "#DFFBF0" : "#FFF8E8",
          borderRadius: 18,
          alignItems: "center",
          opacity: pressed ? 0.92 : 1,
        },
      ]}
    >
      <Image
        source={{ uri: place.image }}
        style={{ width: 78, height: 78, borderRadius: 14 }}
      />
      <View style={{ flex: 1, gap: 4 }}>
        <Text style={{ fontSize: 15, fontWeight: "800", color: COLORS.text }}>
          {place.name}
        </Text>
        <Text style={{ fontSize: 12, color: COLORS.muted }}>{place.address}</Text>
      </View>
      <View
        style={{
          paddingHorizontal: 14,
          paddingVertical: 10,
          borderRadius: 999,
          backgroundColor: place.id === "1" ? COLORS.green : "#FFB84C",
        }}
      >
        <Text style={{ color: COLORS.white, fontWeight: "700", fontSize: 12 }}>
          {place.id === "1" ? "Aksesibel" : "Cukup Aksesibel"}
        </Text>
      </View>
    </Pressable>
  );
}
