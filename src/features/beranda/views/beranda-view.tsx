import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, TextInput, Pressable, ScrollView, Image, ActivityIndicator, Dimensions, Keyboard } from "react-native";
import { Text } from "@/components/ui/text";
import { COLORS } from "@/constants/colors";
import { Search, Mic, Navigation, Layers, MapPin, Star, Clock, X } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MapView, { Marker, Region } from "react-native-maps";
import * as Location from "expo-location";
import { places } from "@/constants/mockData";

const { height } = Dimensions.get("window");

export function BerandaView() {
  const insets = useSafeAreaInsets();
  
  // State Peta & Pencarian
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false); // Melacak apakah form sedang diklik
  const [predictions, setPredictions] = useState<any[]>([]);
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const [isListening, setIsListening] = useState(false); 
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // State Riwayat Pencarian (Recent Searches)
  const [recentSearches, setRecentSearches] = useState<any[]>([
    { display_name: "Stasiun Surabaya Gubeng", lat: "-7.2652", lon: "112.7525" },
    { display_name: "Tunjungan Plaza", lat: "-7.2632", lon: "112.7400" },
    { display_name: "RSUD Dr. Soetomo", lat: "-7.2675", lon: "112.7583" }
  ]);

  // Default region (Pusat awal)
  const [mapRegion, setMapRegion] = useState<Region>({
    latitude: -7.2504,
    longitude: 112.7688,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  // Pin marker hasil pencarian
  const [searchedLocation, setSearchedLocation] = useState<{lat: number, lng: number} | null>(null);

  useEffect(() => {
    goToUserLocation();
  }, []);

  // --- FUNGSI LIVE LOCATION PETA ---
  const goToUserLocation = async () => {
    setIsFetchingLocation(true);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setIsFetchingLocation(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
      setSearchedLocation(null); 
    } catch (error) {
      console.log("Error getting location", error);
    } finally {
      setIsFetchingLocation(false);
    }
  };

  // --- FUNGSI PENCARIAN OSM GLOBAL ---
  const handleSearch = (text: string) => {
    setSearchQuery(text);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Jika input kosong, hapus prediksi agar riwayat pencarian muncul
    if (text.length === 0) {
      setPredictions([]);
      return;
    }

    if (text.length > 2) {
      typingTimeoutRef.current = setTimeout(async () => {
        try {
          const apiUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(text)}&format=json&limit=5`;
          const response = await fetch(apiUrl, {
            headers: { "User-Agent": "AccessibilityMapApp/1.0" },
          });
          const data = await response.json();
          setPredictions(data);
        } catch (error) {
          console.error("OSM API Error:", error);
        }
      }, 800);
    }
  };

  // --- FUNGSI SIMULASI VOICE SEARCH ---
  const handleVoiceSearch = () => {
    setIsListening(true); 
    setSearchQuery(""); 
    
    setTimeout(() => {
      setIsListening(false);
      const simulatedVoiceInput = "Balai Kota Surabaya"; 
      setSearchQuery(simulatedVoiceInput);
      handleSearch(simulatedVoiceInput); 
    }, 2000);
  };

  // --- FUNGSI KLIK HASIL PENCARIAN ---
  const selectPrediction = (item: any) => {
    Keyboard.dismiss(); // Tutup keyboard
    setIsSearchFocused(false); // Tutup dropdown
    setSearchQuery(item.display_name);
    setPredictions([]); 
    
    const lat = parseFloat(item.lat);
    const lng = parseFloat(item.lon);

    // Tambahkan ke riwayat pencarian (jika belum ada)
    const isAlreadyRecent = recentSearches.some(recent => recent.display_name === item.display_name);
    if (!isAlreadyRecent) {
      setRecentSearches(prev => [item, ...prev].slice(0, 5)); // Simpan maksimal 5 riwayat terbaru
    }

    setMapRegion({
      latitude: lat,
      longitude: lng,
      latitudeDelta: 0.005, 
      longitudeDelta: 0.005,
    });

    setSearchedLocation({ lat, lng });
  };

  // Menentukan apa yang harus ditampilkan di dropdown
  const showRecentSearches = isSearchFocused && searchQuery.length === 0 && recentSearches.length > 0;
  const showPredictions = isSearchFocused && searchQuery.length > 0 && predictions.length > 0;

  return (
    <View style={styles.container}>
      {/* 1. KOMPONEN PETA SUNGGUHAN */}
      <MapView
        style={StyleSheet.absoluteFillObject}
        region={mapRegion}
        showsUserLocation={true}
        showsMyLocationButton={false} 
        showsCompass={false}
        onPress={() => {
          // Fix Bug: Tutup pencarian dan keyboard jika peta ditekan
          Keyboard.dismiss();
          setIsSearchFocused(false);
        }}
      >
        {searchedLocation && (
          <Marker 
            coordinate={{ latitude: searchedLocation.lat, longitude: searchedLocation.lng }} 
            title={searchQuery}
          />
        )}
      </MapView>

      {/* 2. SEARCH BAR & DROPDOWN */}
      <View style={[styles.searchContainer, { top: insets.top + 16 }]} pointerEvents="box-none">
        <View style={styles.searchBar}>
          <Search size={20} color={COLORS.muted} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder={isListening ? "Mendengarkan..." : "Cari lokasi di sini..."}
            placeholderTextColor={isListening ? "#ef4444" : COLORS.gray300}
            value={searchQuery}
            onChangeText={handleSearch}
            onFocus={() => setIsSearchFocused(true)}
          />
          
          {/* Tombol Silang (Clear) akan muncul jika ada teks yang diketik */}
          {searchQuery.length > 0 && (
            <Pressable onPress={() => { setSearchQuery(""); setPredictions([]); }} style={{ padding: 6 }}>
              <X size={18} color={COLORS.gray300} />
            </Pressable>
          )}

          <View style={styles.divider} />

          <Pressable onPress={handleVoiceSearch} style={styles.micButton}>
            <Mic size={20} color={isListening ? "#ef4444" : COLORS.muted} />
          </Pressable>
        </View>

        {/* Kotak Dropdown Riwayat / Hasil Pencarian */}
        {(showRecentSearches || showPredictions) && (
          <ScrollView 
            style={styles.dropdownContainer}
            keyboardShouldPersistTaps="always" // Fix Bug: Memastikan tap berfungsi di atas keyboard/peta
            showsVerticalScrollIndicator={false}
          >
            {/* Tampilan Riwayat Pencarian */}
            {showRecentSearches && (
              <View>
                <Text style={styles.dropdownTitle}>Riwayat Pencarian</Text>
                {recentSearches.map((item, index) => (
                  <Pressable
                    key={item.place_id || index}
                    style={styles.predictionItem}
                    onPress={() => selectPrediction(item)}
                  >
                    <Clock size={16} color={COLORS.muted} style={{ marginRight: 12, marginTop: 2 }} />
                    <Text style={styles.predictionText} numberOfLines={2}>{item.display_name}</Text>
                  </Pressable>
                ))}
              </View>
            )}

            {/* Tampilan Hasil Pencarian Langsung */}
            {showPredictions && (
              <View>
                {predictions.map((item, index) => (
                  <Pressable
                    key={item.place_id}
                    style={[styles.predictionItem, index === predictions.length - 1 && { borderBottomWidth: 0 }]}
                    onPress={() => selectPrediction(item)}
                  >
                    <MapPin size={16} color={COLORS.muted} style={{ marginRight: 12, marginTop: 2 }} />
                    <Text style={styles.predictionText} numberOfLines={2}>{item.display_name}</Text>
                  </Pressable>
                ))}
              </View>
            )}
          </ScrollView>
        )}
      </View>

      {/* 3. TOMBOL FLOATING PETA (Jarak Diperbaiki) */}
      <View style={[styles.floatingButtons, { top: insets.top + 90 }]}>
        <Pressable style={styles.iconButton}>
          <Navigation size={20} color={COLORS.text} />
        </Pressable>
        <Pressable style={styles.iconButton}>
          <Layers size={20} color={COLORS.text} />
        </Pressable>
        <Pressable style={styles.iconButton} onPress={goToUserLocation}>
          {isFetchingLocation ? (
            <ActivityIndicator size="small" color={COLORS.text} />
          ) : (
            <MapPin size={20} color={COLORS.text} />
          )}
        </Pressable>
      </View>

      {/* 4. BOTTOM SHEET (Daftar Tempat Terdekat) */}
      <View style={styles.bottomSheet}>
        <View style={styles.dragIndicator} />
        
        <View style={styles.sheetHeader}>
          <Text style={styles.sheetTitle}>Tempat Aksesibel Terdekat</Text>
          <Text style={styles.sheetLink}>Lihat Semua</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContainer}>
          {places.slice(0, 3).map((place) => (
            <View key={place.id} style={styles.placeCard}>
              <Image source={{ uri: place.image }} style={styles.placeImage} />
              
              <View style={styles.placeInfo}>
                <Text style={styles.placeName}>{place.name}</Text>
                <View style={styles.placeAddressRow}>
                  <MapPin size={12} color={COLORS.muted} />
                  <Text style={styles.placeAddress} numberOfLines={1}>{place.address}</Text>
                </View>
                <View style={styles.placeRatingRow}>
                  <Star size={12} color={COLORS.green400} fill={COLORS.green400} />
                  <Text style={styles.placeRating}>{place.rating} <Text style={{ color: COLORS.muted }}>({place.reviews} ulasan)</Text></Text>
                </View>
              </View>

              <View style={[styles.badge, { backgroundColor: place.score >= 80 ? COLORS.green400 : COLORS.orange }]}>
                <Text style={styles.badgeText}>{place.score >= 80 ? 'Aksesibel' : 'Cukup Aksesibel'}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  searchContainer: {
    position: "absolute",
    left: 16,
    right: 16,
    zIndex: 10,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: COLORS.text,
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: COLORS.gray200,
    marginHorizontal: 10,
  },
  micButton: {
    padding: 4, 
  },
  
  // Styling untuk Dropdown Riwayat & Prediksi
  dropdownContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    marginTop: 8,
    paddingVertical: 8,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    maxHeight: 280, // Dibatasi agar tidak terlalu panjang
  },
  dropdownTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.text,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
  },
  predictionItem: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray100,
  },
  predictionText: {
    flex: 1,
    fontSize: 13,
    color: COLORS.text,
    lineHeight: 18,
  },

  /* AREA TOMBOL FLOATING */
  floatingButtons: {
    position: "absolute",
    right: 16,
    flexDirection: "column", 
    gap: 16, 
    zIndex: 9,
  },
  iconButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },

  /* AREA BOTTOM SHEET */
  bottomSheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 12,
    paddingHorizontal: 16,
    maxHeight: height * 0.45, 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 10,
  },
  dragIndicator: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.gray200,
    alignSelf: "center",
    marginBottom: 16,
  },
  sheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sheetTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.text,
  },
  sheetLink: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.green400,
  },
  listContainer: {
    paddingBottom: 24,
  },
  placeCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray100,
  },
  placeImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 12,
    backgroundColor: COLORS.gray100,
  },
  placeInfo: {
    flex: 1,
    justifyContent: "center",
    gap: 4,
  },
  placeName: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.text,
  },
  placeAddressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  placeAddress: {
    fontSize: 12,
    color: COLORS.muted,
    flex: 1,
  },
  placeRatingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  placeRating: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.text,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginLeft: 8,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: COLORS.white,
  },
});