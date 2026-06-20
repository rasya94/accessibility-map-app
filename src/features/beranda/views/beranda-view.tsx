import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  Keyboard,
  Animated,
  PanResponder
} from "react-native";
import { Text } from "@/components/ui/text";
import { COLORS } from "@/constants/colors";
import { Search, Mic, Navigation, Layers, MapPinned, MapPin, Clock, X } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MapView, { Marker, Region } from "react-native-maps";
import * as Location from "expo-location";
import { places } from "@/constants/mockData";
import { useRouter, useLocalSearchParams } from "expo-router";

// Mengimpor kembali komponen PlaceCard asli buatan Anda
import { PlaceCard } from "@/components/ui/place-card";

const { height } = Dimensions.get("window");

// --- KONFIGURASI 3-STATE BOTTOM SHEET ---
const SHEET_MAX_HEIGHT = height * 0.88;
const SHEET_MID_HEIGHT = height * 0.45;
const SHEET_MIN_HEIGHT = 74;

const POS_TOP = 0;
const POS_MID = SHEET_MAX_HEIGHT - SHEET_MID_HEIGHT;
const POS_BOTTOM = SHEET_MAX_HEIGHT - SHEET_MIN_HEIGHT;

export function BerandaView() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const params = useLocalSearchParams();

  // --- STATE NOTIFIKASI TOAST (Dari file asli) ---
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const fadeAnim = useMemo(() => new Animated.Value(0), []);

  const { status } = useLocalSearchParams();

  useEffect(() => {
    // Hanya jalankan jika status benar-benar bernilai "submitted"
    if (status === "submitted") {
      setToastMessage("Terima kasih! Kontribusi ulasan Anda berhasil disimpan.");

      // Pastikan animasi berjalan bersih
      fadeAnim.setValue(0);

      Animated.sequence([
        Animated.timing(fadeAnim, { toValue: 1, duration: 350, useNativeDriver: true }),
        Animated.delay(2500),
        Animated.timing(fadeAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
      ]).start(() => {
        setToastMessage(null);
        // Opsional: Bersihkan parameter rute agar toast tidak muncul kembali saat orientasi layar berubah
        router.setParams({ status: undefined });
      });
    }
  }, [status, fadeAnim, router]);

  // --- STATE PENCARIAN & LOKASI ---
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [predictions, setPredictions] = useState<any[]>([]);
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [recentSearches, setRecentSearches] = useState<any[]>([
    { display_name: "Stasiun Surabaya Gubeng", lat: "-7.2652", lon: "112.7525" },
    { display_name: "Tunjungan Plaza", lat: "-7.2632", lon: "112.7400" },
    { display_name: "RSUD Dr. Soetomo", lat: "-7.2675", lon: "112.7583" }
  ]);

  const [mapRegion, setMapRegion] = useState<Region>({
    latitude: -7.2504,
    longitude: 112.7688,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  const [searchedLocation, setSearchedLocation] = useState<{ lat: number, lng: number } | null>(null);

  // --- ANIMASI BOTTOM SHEET ---
  const translateY = useRef(new Animated.Value(POS_MID)).current;
  const lastDrivenValue = useRef(POS_MID);

  useEffect(() => {
    const listenerId = translateY.addListener((value) => {
      lastDrivenValue.current = value.value;
    });
    return () => translateY.removeListener(listenerId);
  }, []);

  useEffect(() => {
    goToUserLocation();
  }, []);

  const snapTo = (dest: number) => {
    Animated.spring(translateY, {
      toValue: dest,
      useNativeDriver: true,
      damping: 18,
      mass: 0.8,
      stiffness: 120,
    }).start();
  };

  const handleHeaderPress = () => {
    const currentPos = lastDrivenValue.current;
    if (Math.abs(currentPos - POS_BOTTOM) < 50) snapTo(POS_MID);
    else if (Math.abs(currentPos - POS_MID) < 50) snapTo(POS_TOP);
    else snapTo(POS_BOTTOM);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dy) > 3,
      onPanResponderGrant: () => {
        translateY.setOffset(lastDrivenValue.current);
        translateY.setValue(0);
      },
      onPanResponderMove: (_, gestureState) => {
        let deltaY = gestureState.dy;
        let expectedValue = lastDrivenValue.current + deltaY;

        if (expectedValue < POS_TOP) translateY.setValue(POS_TOP - lastDrivenValue.current);
        else if (expectedValue > POS_BOTTOM) translateY.setValue(POS_BOTTOM - lastDrivenValue.current);
        else translateY.setValue(deltaY);
      },
      onPanResponderRelease: (_, gestureState) => {
        translateY.flattenOffset();
        let vy = gestureState.vy;
        let finalPos = lastDrivenValue.current;
        let dest = POS_MID;

        if (vy < -0.5) dest = finalPos > POS_MID ? POS_MID : POS_TOP;
        else if (vy > 0.5) dest = finalPos < POS_MID ? POS_MID : POS_BOTTOM;
        else {
          const distTop = Math.abs(finalPos - POS_TOP);
          const distMid = Math.abs(finalPos - POS_MID);
          const distBot = Math.abs(finalPos - POS_BOTTOM);

          if (distTop < distMid && distTop < distBot) dest = POS_TOP;
          else if (distMid < distBot) dest = POS_MID;
          else dest = POS_BOTTOM;
        }
        snapTo(dest);
      },
    })
  ).current;

  // --- LOGIKA LOKASI & PENCARIAN ---
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

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    if (text.length === 0) {
      setPredictions([]);
      return;
    }
    if (text.length > 2) {
      typingTimeoutRef.current = setTimeout(async () => {
        try {
          const apiUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(text)}&format=json&limit=5`;
          const response = await fetch(apiUrl, { headers: { "User-Agent": "AccessibilityMapApp/1.0" } });
          const data = await response.json();
          setPredictions(data);
        } catch (error) {
          console.error("OSM API Error:", error);
        }
      }, 800);
    }
  };

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

  const selectPrediction = (item: any) => {
    Keyboard.dismiss();
    setIsSearchFocused(false);
    setSearchQuery(item.display_name);
    setPredictions([]);

    const lat = parseFloat(item.lat);
    const lng = parseFloat(item.lon);

    const isAlreadyRecent = recentSearches.some(recent => recent.display_name === item.display_name);
    if (!isAlreadyRecent) setRecentSearches(prev => [item, ...prev].slice(0, 5));

    setMapRegion({
      latitude: lat, longitude: lng, latitudeDelta: 0.005, longitudeDelta: 0.005,
    });
    setSearchedLocation({ lat, lng });
  };

  const showRecentSearches = isSearchFocused && searchQuery.length === 0 && recentSearches.length > 0;
  const showPredictions = isSearchFocused && searchQuery.length > 0 && predictions.length > 0;

  return (
    <View style={styles.container}>
      {/* 1. MAP VIEW */}
      <MapView
        style={StyleSheet.absoluteFillObject}
        region={mapRegion}
        showsUserLocation={true}
        showsMyLocationButton={false}
        showsCompass={false}
        onPress={() => {
          Keyboard.dismiss();
          setIsSearchFocused(false);
        }}
      >
        {searchedLocation && (
          <Marker coordinate={{ latitude: searchedLocation.lat, longitude: searchedLocation.lng }} title={searchQuery} />
        )}
      </MapView>

      {/* 2. SEARCH BAR OVERLAY */}
      <View style={[styles.searchContainer, { top: insets.top + 12 }]} pointerEvents="box-none">
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

        {(showRecentSearches || showPredictions) && (
          <ScrollView style={styles.dropdownContainer} keyboardShouldPersistTaps="always" showsVerticalScrollIndicator={false}>
            {showRecentSearches && (
              <View>
                <Text style={styles.dropdownTitle}>Riwayat Pencarian</Text>
                {recentSearches.map((item, index) => (
                  <Pressable key={item.place_id || index} style={styles.predictionItem} onPress={() => selectPrediction(item)}>
                    <Clock size={16} color={COLORS.muted} style={{ marginRight: 12, marginTop: 2 }} />
                    <Text style={styles.predictionText} numberOfLines={2}>{item.display_name}</Text>
                  </Pressable>
                ))}
              </View>
            )}
            {showPredictions && (
              <View>
                {predictions.map((item, index) => (
                  <Pressable key={item.place_id} style={[styles.predictionItem, index === predictions.length - 1 && { borderBottomWidth: 0 }]} onPress={() => selectPrediction(item)}>
                    <MapPin size={16} color={COLORS.muted} style={{ marginRight: 12, marginTop: 2 }} />
                    <Text style={styles.predictionText} numberOfLines={2}>{item.display_name}</Text>
                  </Pressable>
                ))}
              </View>
            )}
          </ScrollView>
        )}
      </View>

      {/* 3. TOAST NOTIFICATION (Berasal dari file asli Anda) */}
      {toastMessage && (
        <Animated.View
          style={[styles.toastContainer, { top: insets.top + 74, opacity: fadeAnim }]}
        >
          <Text style={styles.toastText}>{toastMessage}</Text>
        </Animated.View>
      )}

      {/* 4. FLOATING BUTTONS */}
      <View style={[styles.floatingButtons, { top: insets.top + 90 }]}>
        <Pressable style={styles.iconButton}><Navigation size={20} color={COLORS.text} /></Pressable>
        <Pressable style={styles.iconButton}><Layers size={20} color={COLORS.text} /></Pressable>
        <Pressable style={styles.iconButton} onPress={goToUserLocation}>
          {isFetchingLocation ? <ActivityIndicator size="small" color={COLORS.text} /> : <MapPinned size={20} color={COLORS.text} />}
        </Pressable>
      </View>

      {/* 5. BOTTOM SHEET DENGAN PLACE CARD ASLI ANDA */}
      <Animated.View style={[styles.bottomSheet, { transform: [{ translateY }] }]}>

        <Pressable {...panResponder.panHandlers} onPress={handleHeaderPress} style={styles.sheetHeaderArea}>
          <View style={styles.dragIndicator} />
          <View style={styles.sheetHeader}>
            <Text style={styles.sheetTitle}>Tempat Aksesibel Terdekat</Text>
            <Text style={styles.sheetLink}>Lihat Semua</Text>
          </View>
        </Pressable>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.listContainer, { paddingBottom: insets.bottom + 24 }]}
        >
          {places.map((place) => (
            <Pressable key={place.id} onPress={() => router.push(`/place/${place.id}`)}>
              {/* Memanggil Custom Component asli Anda! */}
              <PlaceCard place={place} />
            </Pressable>
          ))}
        </ScrollView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  searchContainer: { position: "absolute", left: 16, right: 16, zIndex: 10 },
  searchBar: { flexDirection: "row", alignItems: "center", backgroundColor: COLORS.white, borderRadius: 30, paddingHorizontal: 16, paddingVertical: 10, shadowColor: COLORS.shadow, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 12, elevation: 5 },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, fontSize: 15, color: COLORS.text },
  divider: { width: 1, height: 24, backgroundColor: COLORS.gray200, marginHorizontal: 10 },
  micButton: { padding: 4 },
  dropdownContainer: { backgroundColor: COLORS.white, borderRadius: 16, marginTop: 8, paddingVertical: 8, shadowColor: COLORS.shadow, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 12, elevation: 5, maxHeight: 280 },
  dropdownTitle: { fontSize: 13, fontWeight: "700", color: COLORS.text, paddingHorizontal: 16, paddingTop: 8, paddingBottom: 4 },
  predictionItem: { flexDirection: "row", paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: COLORS.gray100 },
  predictionText: { flex: 1, fontSize: 13, color: COLORS.text, lineHeight: 18 },
  floatingButtons: { position: "absolute", right: 16, flexDirection: "column", gap: 16, zIndex: 9 },
  iconButton: { width: 46, height: 46, borderRadius: 23, backgroundColor: COLORS.white, justifyContent: "center", alignItems: "center", shadowColor: COLORS.shadow, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 8, elevation: 5 },

  // Styling Notifikasi (Toast)
  toastContainer: {
    position: "absolute", left: 16, right: 16, backgroundColor: COLORS.green400,
    borderRadius: 14, paddingVertical: 12, paddingHorizontal: 16,
    flexDirection: "row", alignItems: "center", shadowColor: "#000",
    shadowOpacity: 0.15, shadowRadius: 12, shadowOffset: { width: 0, height: 4 },
    elevation: 8, zIndex: 100,
  },
  toastText: { color: COLORS.white, fontWeight: "700", fontSize: 13, flex: 1 },

  bottomSheet: {
    position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: COLORS.white,
    borderTopLeftRadius: 24, borderTopRightRadius: 24, height: SHEET_MAX_HEIGHT,
    shadowColor: "#000", shadowOffset: { width: 0, height: -4 }, shadowOpacity: 0.1,
    shadowRadius: 12, elevation: 12, zIndex: 20,
  },
  sheetHeaderArea: { paddingTop: 12, paddingHorizontal: 16, paddingBottom: 6, backgroundColor: COLORS.white, borderTopLeftRadius: 24, borderTopRightRadius: 24 },
  dragIndicator: { width: 42, height: 5, borderRadius: 3, backgroundColor: COLORS.gray200, alignSelf: "center", marginBottom: 12 },
  sheetHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  sheetTitle: { fontSize: 16, fontWeight: "800", color: COLORS.text },
  sheetLink: { fontSize: 13, fontWeight: "700", color: COLORS.green400 },
  listContainer: { paddingHorizontal: 16, gap: 10 }, // Menambahkan gap 10 persis seperti file asli Anda
});