import { AppButton } from "@/components/ui/app-button";
import { Text } from "@/components/ui/text";
import { COLORS } from "@/constants/colors";
import { facilityLabels, Place } from "@/constants/mockData";
import { router } from "expo-router";
import {
  Accessibility,
  ArrowLeft,
  ArrowUpCircle,
  ArrowUpDown,
  Bath,
  Car,
  ExternalLink,
  MapPin,
  Navigation,
  Snowflake,
  Star,
} from "lucide-react-native";
import {
  Alert,
  ImageBackground,
  Pressable,
  ScrollView,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = { place: Place };

const facilityIcons = {
  wheelchair: Accessibility,
  air: Snowflake,
  lift: ArrowUpDown,
  toilet: Bath,
  escalator: ArrowUpCircle,
  parking: Car,
} as const;

function ScoreRing({ score }: { score: number }) {
  const color =
    score >= 85 ? COLORS.green400 : score >= 65 ? COLORS.orange : COLORS.red;
  return (
    <View
      style={{
        backgroundColor: color,
        borderRadius: 24,
        paddingVertical: 22,
        paddingHorizontal: 18,
        alignItems: "center",
      }}
    >
      <Text
        style={{
          color: COLORS.white,
          fontSize: 14,
          opacity: 0.9,
          fontWeight: "600",
          letterSpacing: 0.3,
        }}
      >
        Rating Aksesibilitas
      </Text>
      <Text
        style={{
          color: COLORS.white,
          fontSize: 46,
          fontWeight: "900",
          lineHeight: 54,
          marginVertical: 4,
        }}
      >
        {score}
      </Text>
      <Text
        style={{
          color: COLORS.white,
          opacity: 0.75,
          fontSize: 14,
          fontWeight: "500",
        }}
      >
        /100
      </Text>
    </View>
  );
}

export function PlaceDetailView({ place }: Props) {
  const insets = useSafeAreaInsets();

  // Approximate height calculation of the fixed bottom buttons panel
  // to prevent content underneath from getting cut off.
  const stickyPanelHeight = 130 + insets.bottom;

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <ScrollView
        contentContainerStyle={{
          padding: 16,
          // Extra bottom padding so scrollable elements clear the sticky button container entirely
          paddingBottom: stickyPanelHeight + 16,
          gap: 16,
        }}
        showsVerticalScrollIndicator={false}
      >
        <ImageBackground
          source={{ uri: place.image }}
          style={{
            height: 300,
            justifyContent: "space-between",
            paddingTop: insets.top + 12,
            paddingHorizontal: 16,
            paddingBottom: 24,
            marginHorizontal: -16, // Bleeds image background to the display edges
            marginTop: -16,
          }}
          resizeMode="cover"
        >
          {/* Gradient overlay */}
          <View
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.18)",
            }}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              zIndex: 1,
            }}
          >
            <Pressable
              onPress={() => router.back()}
              style={{
                width: 46,
                height: 46,
                borderRadius: 14,
                backgroundColor: COLORS.white,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ArrowLeft size={22} color={COLORS.black} />
            </Pressable>

            <Pressable
              onPress={() =>
                Alert.alert("Google Maps", "Demo button for opening route.")
              }
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
                backgroundColor: COLORS.white,
                borderRadius: 14,
                paddingHorizontal: 16,
                height: 46,
              }}
            >
              <Text style={{ fontWeight: "700", fontSize: 14 }}>
                Buka di Maps
              </Text>
              <ExternalLink size={15} color={COLORS.mapBlue} />
            </Pressable>
          </View>
        </ImageBackground>

        {/* Info card */}
        <View
          style={{
            marginTop: -48, // Adjusted to overlap cleaner with the full bleed image background
            backgroundColor: COLORS.white,
            borderRadius: 24,
            paddingVertical: 22,
            paddingHorizontal: 20,
            shadowColor: COLORS.shadow,
            shadowOpacity: 0.1,
            shadowRadius: 20,
            shadowOffset: { width: 0, height: 8 },
            elevation: 6,
            zIndex: 10,
          }}
        >
          <Text
            style={{
              fontSize: 22,
              fontWeight: "800",
              color: COLORS.text,
              textAlign: "center",
              lineHeight: 28,
            }}
          >
            {place.name}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
              marginTop: 12,
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
            >
              <Star size={15} color={COLORS.green400} fill={COLORS.green400} />
              <Text
                style={{ color: COLORS.text, fontWeight: "700", fontSize: 14 }}
              >
                {place.rating}
              </Text>
              <Text style={{ color: COLORS.muted, fontSize: 14 }}>
                ({place.reviews})
              </Text>
            </View>
            <View
              style={{ width: 1, height: 16, backgroundColor: COLORS.gray200 }}
            />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 6,
                maxWidth: "60%",
              }}
            >
              <MapPin size={15} color={COLORS.muted} />
              <Text
                style={{ color: COLORS.muted, fontSize: 14 }}
                numberOfLines={1}
              >
                {place.address}
              </Text>
            </View>
          </View>
        </View>

        <ScoreRing score={place.score} />

        {/* Facilities */}
        <View
          style={{
            backgroundColor: COLORS.white,
            borderRadius: 24,
            padding: 20,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "800",
              color: COLORS.text,
              marginBottom: 20,
            }}
          >
            Fasilitas
          </Text>
          <View style={{ gap: 16 }}>
            {Object.entries(facilityLabels).map(([key, label]) => {
              const enabled = place.facilities.includes(
                key as keyof typeof facilityLabels,
              );
              const Icon = facilityIcons[key as keyof typeof facilityIcons];
              return (
                <View
                  key={key}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 14,
                  }}
                >
                  <View
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: enabled
                        ? COLORS.green1000
                        : COLORS.gray100,
                    }}
                  >
                    <Icon
                      size={20}
                      color={enabled ? COLORS.green400 : COLORS.muted}
                      strokeWidth={2.2}
                    />
                  </View>
                  <Text
                    style={{
                      flex: 1,
                      color: enabled ? COLORS.text : COLORS.muted,
                      fontWeight: "600",
                      fontSize: 15,
                    }}
                  >
                    {label}
                  </Text>
                  {!enabled && (
                    <Text
                      style={{
                        fontSize: 13,
                        color: COLORS.muted,
                        fontWeight: "600",
                      }}
                    >
                      Tidak tersedia
                    </Text>
                  )}
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* Sticky Bottom Actions Container */}
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: COLORS.white,
          paddingHorizontal: 16,
          paddingTop: 12,
          paddingBottom: insets.bottom + 12,
          gap: 12,
          borderTopWidth: 1,
          borderTopColor: COLORS.gray100, // Light divider from layout background
          shadowColor: COLORS.black,
          shadowOpacity: 0.05,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: -4 },
          elevation: 10,
        }}
      >
        <AppButton
          label="Berikan Review"
          onPress={() => router.push(`/review/${place.id}`)}
        />
        <AppButton
          label="Cek Rute dengan Maps"
          variant="dark"
          icon={<Navigation size={18} color={COLORS.white} />}
          onPress={() => Alert.alert("Rute", "Demo route action.")}
        />
      </View>
    </View>
  );
}
