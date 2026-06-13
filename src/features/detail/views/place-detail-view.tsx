import { Alert, ImageBackground, Pressable, ScrollView, Text, View } from "react-native";
import { router } from "expo-router";
import {
  ArrowLeft,
  ArrowUpCircle,
  ArrowUpDown,
  Accessibility,
  Bath,
  Car,
  MapPin,
  Navigation,
  Snowflake,
  Star,
} from "lucide-react-native";
import { AppButton } from "@/components/ui/app-button";
import { COLORS } from "@/constants/colors";
import { facilityLabels, Place } from "@/constants/mockData";
import { detailStyles } from "../styles";

type Props = { place: Place };

const facilityIcons = {
  wheelchair: Accessibility,
  air: Snowflake,
  lift: ArrowUpDown,
  toilet: Bath,
  escalator: ArrowUpCircle,
  parking: Car,
} as const;

export function PlaceDetailView({ place }: Props) {
  return (
    <View style={detailStyles.container}>
      <ImageBackground source={{ uri: place.image }} style={detailStyles.hero} resizeMode="cover">
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

        <View style={{ alignItems: "flex-end" }}>
          <Pressable
            onPress={() => Alert.alert("Google Maps", "Demo button for opening route.")}
            style={{
              backgroundColor: COLORS.overlay,
              borderRadius: 999,
              paddingHorizontal: 16,
              height: 36,
              justifyContent: "center",
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
            }}
          >
            <Text style={{ fontWeight: "700", fontSize: 12 }}>Buka di Google Maps</Text>
            <Navigation size={14} color={COLORS.green} />
          </Pressable>
        </View>
      </ImageBackground>

      <View style={detailStyles.card}>
        <Text style={{ fontSize: 20, fontWeight: "800", color: COLORS.text }}>{place.name}</Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12, marginTop: 8 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <Star size={14} color={COLORS.green} fill={COLORS.green} />
            <Text style={{ color: COLORS.gray600, fontWeight: "700" }}>
              {place.rating} ({place.reviews})
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <MapPin size={14} color={COLORS.green} />
            <Text style={{ color: COLORS.gray600 }}>{place.address}</Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 28, gap: 16 }}>
        <View style={{ backgroundColor: COLORS.green, borderRadius: 24, padding: 18 }}>
          <Text style={{ color: COLORS.white, textAlign: "center", opacity: 0.9 }}>
            Rating Aksesibilitas
          </Text>
          <Text style={{ color: COLORS.white, textAlign: "center", fontSize: 30, fontWeight: "900", marginTop: 4 }}>
            {place.score}/100
          </Text>
        </View>

        <View style={{ backgroundColor: COLORS.white, borderRadius: 24, padding: 18 }}>
          <Text style={{ fontSize: 18, fontWeight: "800", color: COLORS.text, marginBottom: 12 }}>
            Fasilitas
          </Text>
          <View style={{ gap: 12 }}>
            {Object.entries(facilityLabels).map(([key, label]) => {
              const enabled = place.facilities.includes(key as keyof typeof facilityLabels);
              const Icon = facilityIcons[key as keyof typeof facilityIcons];
              return (
                <View key={key} style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                  <View
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 15,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: enabled ? COLORS.greenSoft : COLORS.gray100,
                    }}
                  >
                    <Icon size={16} color={enabled ? COLORS.green : COLORS.gray300} strokeWidth={2.1} />
                  </View>
                  <Text
                    style={{
                      flex: 1,
                      color: enabled ? COLORS.text : COLORS.gray300,
                      fontWeight: "600",
                    }}
                  >
                    {label}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        <AppButton label="Berikan Review" onPress={() => router.push(`/review/${place.id}`)} />
        <AppButton
          label="Cek Rute dengan Maps"
          variant="dark"
          onPress={() => Alert.alert("Rute", "Demo route action.")}
        />
      </ScrollView>
    </View>
  );
}
