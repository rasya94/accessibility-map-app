import { MapPin } from "@/components/ui/map-pin";
import { PlaceCard } from "@/components/ui/place-card";
import { SearchBar } from "@/components/ui/search-bar";
import { Text } from "@/components/ui/text";
import { COLORS } from "@/constants/colors";
import { places } from "@/constants/mockData";
import {
  Coffee,
  Layers,
  MapPinned,
  Navigation,
  Store,
  UtensilsCrossed,
} from "lucide-react-native";
import { Image, Pressable, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ResumableZoom } from "react-native-zoom-toolkit";

export function BerandaView() {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.bg }}>
      {/* Map Area */}
      <View style={{ flex: 1, backgroundColor: "#E8EEF4" }}>
        <ResumableZoom maxScale={4} minScale={1}>
          <View style={{ width: 900, height: 1400 }}>
            <Image
              source={require("../../../../assets/MockMap.png")}
              style={{ width: 900, height: 1400 }}
              resizeMode="contain"
            />
            <MapPin icon={Store} color={COLORS.green400} top={300} left={120} />
            <MapPin icon={Coffee} color={COLORS.orange} top={420} left={260} />
            <MapPin
              icon={UtensilsCrossed}
              color={COLORS.green400}
              top={760}
              left={480}
            />
            <MapPin icon={Store} color={COLORS.orange} top={620} left={700} />
          </View>
        </ResumableZoom>

        {/* Search bar overlay */}
        <View
          style={{
            position: "absolute",
            top: insets.top + 12,
            left: 16,
            right: 16,
          }}
        >
          <SearchBar />
        </View>

        {/* Map controls */}
        <View
          style={{
            position: "absolute",
            right: 14,
            bottom: 110,
            gap: 8,
          }}
        >
          {[
            { Icon: Navigation, onPress: () => {} },
            { Icon: Layers, onPress: () => {} },
            { Icon: MapPinned, onPress: () => {} },
          ].map(({ Icon }, i) => (
            <Pressable
              key={i}
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                backgroundColor: COLORS.white,
                alignItems: "center",
                justifyContent: "center",
                shadowColor: COLORS.shadow,
                shadowOpacity: 0.1,
                shadowRadius: 12,
                shadowOffset: { width: 0, height: 3 },
                elevation: 4,
              }}
            >
              <Icon size={20} color={COLORS.gray600} />
            </Pressable>
          ))}
        </View>
      </View>

      {/* Bottom sheet */}
      <View
        style={{
          backgroundColor: COLORS.white,
          borderTopLeftRadius: 26,
          borderTopRightRadius: 26,
          paddingTop: 12,
          paddingHorizontal: 16,
          paddingBottom: insets.bottom + 8,
          maxHeight: "45%",
          shadowColor: COLORS.shadow,
          shadowOpacity: 0.08,
          shadowRadius: 20,
          shadowOffset: { width: 0, height: -6 },
          elevation: 10,
        }}
      >
        {/* Handle */}
        <View
          style={{
            width: 36,
            height: 4,
            borderRadius: 2,
            backgroundColor: COLORS.gray200,
            alignSelf: "center",
            marginBottom: 14,
          }}
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 14,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "800", color: COLORS.text }}>
            Tempat Aksesibel Terdekat
          </Text>
          <Text
            style={{ fontSize: 12, color: COLORS.green400, fontWeight: "700" }}
          >
            Lihat Semua
          </Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ gap: 10, paddingBottom: 8 }}
        >
          {places.map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
