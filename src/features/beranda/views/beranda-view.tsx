import { MapPin } from "@/components/ui/map-pin";
import { PlaceCard } from "@/components/ui/place-card";
import { SearchBar } from "@/components/ui/search-bar";
import { SectionTitle } from "@/components/ui/section-title";
import { COLORS } from "@/constants/colors";
import { places } from "@/constants/mockData";
import { Coffee, Store, UtensilsCrossed } from "lucide-react-native";
import { Image, ScrollView, View } from "react-native";
import { Text } from "@/components/ui/text";
import { ResumableZoom } from "react-native-zoom-toolkit";
import { berandaStyles } from "../styles";

export function BerandaView() {
  return (
    <View style={berandaStyles.container}>
      <View
        style={[
          berandaStyles.topMap,
          { paddingTop: 58, paddingHorizontal: 16 },
        ]}
      >
        <SearchBar />

        <View
          style={{
            flex: 1,
            marginTop: 18,
            borderRadius: 26,
            overflow: "hidden",
            backgroundColor: "#F7F8FA",
          }}
        >
          <ResumableZoom maxScale={4} minScale={1}>
            <View
              style={{
                width: 900,
                height: 1400,
              }}
            >
              <Image
                source={require("../../../../assets/MockMap.png")}
                style={{
                  width: 900,
                  height: 1400,
                }}
                resizeMode="contain"
              />

              <MapPin icon={Store} color={COLORS.green} top={300} left={120} />

              <MapPin
                icon={Coffee}
                color={COLORS.orange}
                top={420}
                left={260}
              />

              <MapPin
                icon={UtensilsCrossed}
                color={COLORS.green}
                top={760}
                left={480}
              />

              <MapPin icon={Store} color={COLORS.orange} top={620} left={700} />
            </View>
          </ResumableZoom>
        </View>
      </View>

      <View style={berandaStyles.sheet}>
        <SectionTitle title="Nearby Accesible Place" />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 18, gap: 12 }}
        >
          {places.slice(0, 2).map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
          <View
            style={{
              marginTop: 4,
              padding: 16,
              borderRadius: 22,
              backgroundColor: COLORS.gray100,
            }}
          >
            <Text style={{ fontSize: 13, color: COLORS.muted, lineHeight: 19 }}>
              Cari tempat yang ramah kursi roda, cek fasilitas, lalu kirim
              ulasan dari aplikasi ini.
            </Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
