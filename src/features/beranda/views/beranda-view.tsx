import { MapPin } from "@/components/ui/map-pin";
import { PlaceCard } from "@/components/ui/place-card";
import { SearchBar } from "@/components/ui/search-bar";
import { SectionTitle } from "@/components/ui/section-title";
import { COLORS } from "@/constants/colors";
import { places } from "@/constants/mockData";
import { Coffee, Store, UtensilsCrossed } from "lucide-react-native";
import { ScrollView, StyleSheet, Text, View } from "react-native";
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
          }}
        >
          <View style={{ flex: 1, backgroundColor: "#F7F8FA" }}>
            <View
              style={[
                berandaStyles.roadLine,
                { left: 20, right: 20, top: 40, height: 4, borderRadius: 8 },
              ]}
            />
            <View
              style={[
                berandaStyles.roadLine,
                { left: 80, top: 0, bottom: 0, width: 4 },
              ]}
            />
            <View
              style={[
                berandaStyles.roadLine,
                { left: 140, top: 50, bottom: 50, width: 4, opacity: 0.7 },
              ]}
            />
            <View
              style={[
                berandaStyles.roadLine,
                { left: 200, top: 30, right: 30, height: 4 },
              ]}
            />
            <View
              style={[
                berandaStyles.roadLine,
                { left: 255, top: 10, bottom: 20, width: 4 },
              ]}
            />
            <View
              style={[
                berandaStyles.roadLine,
                { left: 20, top: 140, right: 120, height: 4 },
              ]}
            />
            <View
              style={[
                berandaStyles.roadLine,
                { left: 40, top: 230, right: 40, height: 4 },
              ]}
            />
            <View
              style={[
                berandaStyles.roadLine,
                { left: 290, top: 170, bottom: 80, width: 4 },
              ]}
            />
            <View
              style={{
                ...StyleSheet.absoluteFillObject,
                backgroundColor: "rgba(82,180,220,0.08)",
              }}
            />

            <MapPin icon={Store} color={COLORS.green} top={104} left={14} />
            <MapPin icon={Coffee} color={COLORS.orange} top={120} left={58} />
            <MapPin
              icon={UtensilsCrossed}
              color={COLORS.green}
              top={236}
              left={180}
            />
            <MapPin icon={Store} color={COLORS.orange} top={76} left={226} />
          </View>
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
