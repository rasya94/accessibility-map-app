import { Text } from "@/components/ui/text";
import { COLORS } from "@/constants/colors";
import { Place } from "@/constants/mockData";
import { router } from "expo-router";
import { MapPin, Star } from "lucide-react-native";
import { Image, Pressable, View } from "react-native";

type Props = { place: Place };

function getScoreMeta(score: number) {
  if (score >= 85)
    return { label: "Aksesibel", bg: COLORS.green1000, color: COLORS.green400 };
  if (score >= 65)
    return {
      label: "Cukup Aksesibel",
      bg: COLORS.orangeSoft,
      color: COLORS.orange,
    };
  return { label: "Kurang Aksesibel", bg: COLORS.redSoft, color: COLORS.red };
}

export function PlaceCard({ place }: Props) {
  const meta = getScoreMeta(place.score);
  return (
    <Pressable
      onPress={() => router.push(`/place/${place.id}`)}
      style={({ pressed }) => ({
        flexDirection: "row",
        gap: 16,
        paddingLeft: 8, // Reduced left padding for a tighter image inset
        paddingRight: 16, // Maintained standard padding for the content side
        paddingVertical: 8, // Reduced vertical padding to make the image fit snugly
        backgroundColor: COLORS.white,
        borderRadius: 28,
        alignItems: "stretch",
        opacity: pressed ? 0.9 : 1,
        shadowColor: COLORS.shadow,
        shadowOpacity: 0.04,
        shadowRadius: 32,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
      })}
    >
      <Image
        source={{ uri: place.image }}
        style={{ width: 96, height: 126, borderRadius: 20 }} // Slightly wider (92), keeping the tall aspect ratio
      />

      {/* Main container holding both details and the bottom-right meta badge */}
      <View
        style={{ flex: 1, justifyContent: "space-between", paddingVertical: 4 }}
      >
        {/* Details Wrapper */}
        <View style={{ gap: 6, paddingRight: 4 }}>
          {/* Title */}
          <Text style={{ fontSize: 16, fontWeight: "700", color: COLORS.text }}>
            {place.name}
          </Text>

          {/* Address Row */}
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <MapPin size={14} color={COLORS.gray600} />
            <Text
              style={{ fontSize: 13, color: COLORS.gray500, flex: 1, fontWeight: "700" }}
              numberOfLines={1}
            >
              {place.address}
            </Text>
          </View>

          {/* Rating Row */}
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <Star size={14} color={COLORS.green400} fill={COLORS.green400} />
            <Text
              style={{ fontSize: 13, color: COLORS.gray500, fontWeight: "700" }}
            >
              {place.rating}
            </Text>
            <Text style={{ fontSize: 13, color: COLORS.gray300, fontWeight: "700" }}>
              ({place.reviews} ulasan)
            </Text>
          </View>
        </View>

        {/* Badge: Aligned perfectly to the bottom right */}
        <View style={{ alignItems: "flex-end" }}>
          <View
            style={{
              marginTop: 10,
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 20,
              backgroundColor: meta.color,
            }}
          >
            <Text
              style={{ color: COLORS.white, fontWeight: "700", fontSize: 12 }}
            >
              {meta.label}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
