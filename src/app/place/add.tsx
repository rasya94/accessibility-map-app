import React, { useState, useRef } from "react";
import { 
  View, 
  StyleSheet, 
  Pressable, 
  TextInput, 
  ScrollView, 
  Image, 
  Alert, 
  Modal, 
  ActivityIndicator, 
  Keyboard
} from "react-native";
import { Text } from "@/components/ui/text";
import { COLORS } from "@/constants/colors";
import { useRouter } from "expo-router";
import { ArrowLeft, Camera, MapPin, Check, X, AlertCircle } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppButton } from "@/components/ui/app-button";
import { SingleOptionModal } from "@/components/ui/single-option-modal";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location"; 

const FACILITIES_LIST = [
  "Ramp / Jalur Kursi Roda",
  "Lift Aksesibel",
  "Toilet Difabel",
  "Parkiran Khusus",
  "Pintu Otomatis",
  "Staf Pendamping",
  "Kursi Roda Tersedia",
];

const MAX_IMAGES = 5;

export default function AddPlaceScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [imageUris, setImageUris] = useState<string[]>([]);
  
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const [predictions, setPredictions] = useState<any[]>([]); 
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null); 

  const [errors, setErrors] = useState({ 
    name: false, location: false, description: false, images: false
  });
  
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const getCurrentLocation = async () => {
    Keyboard.dismiss();
    setIsFetchingLocation(true);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Izin Ditolak', 'Izinkan akses lokasi untuk menggunakan fitur GPS.');
        setIsFetchingLocation(false);
        return;
      }
      let userLocation = await Location.getCurrentPositionAsync({});
      let geocode = await Location.reverseGeocodeAsync({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude
      });
      if (geocode.length > 0) {
        const place = geocode[0];
        const formattedAddress = `${place.street || place.name || ''}, ${place.city || place.subregion || ''}, ${place.region || ''}`.replace(/^, /, '').trim();
        setLocation(formattedAddress);
        if (errors.location) setErrors({ ...errors, location: false });
        setPredictions([]); 
      }
    } catch (error) {
      Alert.alert('Gagal', 'Tidak dapat mengambil lokasi saat ini.');
    } finally {
      setIsFetchingLocation(false);
    }
  };

  const handleLocationSearch = (text: string) => {
    setLocation(text);
    if (errors.location) setErrors({ ...errors, location: false });

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    if (text.length > 2) {
      typingTimeoutRef.current = setTimeout(async () => {
        try {
          const apiUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(text)}&format=json&countrycodes=id&limit=5`;
          const response = await fetch(apiUrl, { headers: { 'User-Agent': 'AccessibilityMapApp/1.0' } });
          const data = await response.json();
          setPredictions(data);
        } catch (error) {
          console.error("OSM API Error:", error);
        }
      }, 800); 
    } else {
      setPredictions([]);
    }
  };

  const selectPrediction = (address: string) => {
    Keyboard.dismiss(); 
    setLocation(address);
    setPredictions([]); 
  };

  const toggleFacility = (facility: string) => {
    let updatedFacilities = selectedFacilities.includes(facility) 
      ? selectedFacilities.filter((f) => f !== facility) 
      : [...selectedFacilities, facility];
    setSelectedFacilities(updatedFacilities);
  };

  const pickImage = async () => {
    Keyboard.dismiss();
    if (imageUris.length >= MAX_IMAGES) return Alert.alert("Batas Maksimal", "Maksimal 5 foto.");
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) return Alert.alert("Izin Diperlukan", "Akses galeri dibutuhkan.");
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, allowsEditing: true, aspect: [4, 3], quality: 0.8,
    });
    if (!result.canceled) {
      setImageUris([...imageUris, result.assets[0].uri]);
      if (errors.images) setErrors({ ...errors, images: false });
    }
  };

  const removeImage = (indexToRemove: number) => {
    const updatedImages = imageUris.filter((_, index) => index !== indexToRemove);
    setImageUris(updatedImages);
    if (updatedImages.length === 0 && errors.images) setErrors({ ...errors, images: true });
  };

  const handleSubmit = () => {
    Keyboard.dismiss();
    const newErrors = {
      name: name.trim() === "",
      location: location.trim() === "",
      description: description.trim() === "",
      images: imageUris.length === 0,
    };
    setErrors(newErrors);
    const hasError = Object.values(newErrors).some(Boolean);
    if (hasError) setShowErrorModal(true);
    else setShowSuccessModal(true);
  };

  const primaryImageUri = imageUris[0];
  const secondaryImageUris = imageUris.slice(1);

  return (
    <View style={[styles.container, { paddingTop: insets.top + 16 }]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={COLORS.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Tambah Lokasi Baru</Text>
      </View>

      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 24 }]} 
        showsVerticalScrollIndicator={false} 
        keyboardShouldPersistTaps="handled"
      >
        {/* FOTO */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Foto Tempat <Text style={styles.requiredMark}>*</Text></Text>
          <View style={styles.imageSection}>
            <Pressable style={[styles.imageCell, styles.primaryImageCell, errors.images && styles.inputErrorBorder]} onPress={pickImage}>
              {primaryImageUri ? (
                <View style={styles.imageContainer}>
                  <Image source={{ uri: primaryImageUri }} style={styles.previewImage} />
                  <Pressable style={styles.removeButton} onPress={() => removeImage(0)}>
                    <X size={16} color={COLORS.white} />
                  </Pressable>
                </View>
              ) : (
                <>
                  <Camera size={32} color={errors.images ? "#ef4444" : COLORS.gray300} />
                  <Text style={[styles.imageUploadText, errors.images && { color: "#ef4444" }]}>Pilih Foto Utama</Text>
                </>
              )}
            </Pressable>
            <View style={styles.imageThumbnailsRow}>
              {secondaryImageUris.map((uri, index) => (
                <View key={uri} style={[styles.imageCell, styles.secondaryImageCell]}>
                  <Image source={{ uri: uri }} style={styles.previewImage} />
                  <Pressable style={styles.removeButton} onPress={() => removeImage(index + 1)}>
                    <X size={16} color={COLORS.white} />
                  </Pressable>
                </View>
              ))}
              {imageUris.length > 0 && imageUris.length < MAX_IMAGES && (
                <Pressable style={[styles.imageCell, styles.secondaryImageCell, styles.addThumbCell]} onPress={pickImage}>
                  <Camera size={20} color={COLORS.gray300} />
                </Pressable>
              )}
            </View>
          </View>
        </View>

        {/* NAMA */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nama Tempat <Text style={styles.requiredMark}>*</Text></Text>
          <TextInput
            style={[styles.input, errors.name && styles.inputErrorBorder]}
            placeholder="Contoh: Cafe Little Talk"
            placeholderTextColor={COLORS.gray300}
            value={name}
            onChangeText={(text) => { setName(text); if (errors.name) setErrors({ ...errors, name: false }); }}
          />
        </View>

        {/* LOKASI */}
        <View style={styles.inputGroup}> 
          <Text style={styles.label}>Lokasi / Alamat <Text style={styles.requiredMark}>*</Text></Text>
          <View style={[styles.locationInputContainer, errors.location && styles.inputErrorBorder]}>
            <TextInput
              style={[styles.input, { flex: 1, borderWidth: 0 }]}
              placeholder="Ketik alamat atau tap ikon peta..."
              placeholderTextColor={COLORS.gray300}
              value={location}
              onChangeText={handleLocationSearch}
            />
            <Pressable style={styles.mapPinButton} onPress={getCurrentLocation} disabled={isFetchingLocation}>
              {isFetchingLocation ? <ActivityIndicator size="small" color={COLORS.green400} /> : <MapPin size={20} color={COLORS.green400} />}
            </Pressable>
          </View>

          {predictions.length > 0 && (
            <View style={styles.inlinePredictionsContainer}>
              {predictions.map((item, index) => (
                <Pressable 
                  key={item.place_id} 
                  style={[styles.predictionItem, index === predictions.length - 1 && { borderBottomWidth: 0 }]}
                  onPress={() => selectPrediction(item.display_name)}
                >
                  <MapPin size={16} color={COLORS.muted} style={{ marginRight: 8, marginTop: 2 }} />
                  <Text style={styles.predictionText}>{item.display_name}</Text>
                </Pressable>
              ))}
            </View>
          )}
        </View>

        {/* FASILITAS */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Fasilitas Aksesibilitas</Text>
          <View style={styles.facilitiesWrapper}>
            <View style={styles.facilitiesContainer}>
              {FACILITIES_LIST.map((facility) => {
                const isSelected = selectedFacilities.includes(facility);
                return (
                  <Pressable
                    key={facility}
                    onPress={() => toggleFacility(facility)}
                    style={[styles.facilityChip, isSelected && styles.facilityChipSelected]}
                  >
                    {isSelected && <Check size={14} color={COLORS.green400} style={{ marginRight: 6 }} />}
                    <Text style={[styles.facilityText, isSelected && styles.facilityTextSelected]}>{facility}</Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        </View>

        {/* DESKRIPSI */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Deskripsi Singkat <Text style={styles.requiredMark}>*</Text></Text>
          <TextInput
            style={[styles.input, styles.textArea, errors.description && styles.inputErrorBorder]}
            placeholder="Ceritakan sedikit tentang aksesibilitas lokasi ini..."
            placeholderTextColor={COLORS.gray300}
            multiline={true}
            numberOfLines={4}
            textAlignVertical="top" 
            value={description}
            onChangeText={(text) => { setDescription(text); if (errors.description) setErrors({ ...errors, description: false }); }}
          />
        </View>

        {/* SUBMIT */}
        <View style={styles.buttonContainer}>
          <AppButton label="Tambahkan" onPress={handleSubmit} />
        </View>
      </ScrollView>

      {/* MODALS */}
      <SingleOptionModal
        visible={showSuccessModal}
        title="Tempat sedang diverifikasi oleh admin, mohon ditunggu sebentar."
        buttonLabel="Mengerti"
        onButtonPress={() => { setShowSuccessModal(false); router.back(); }}
      />
      <Modal visible={showErrorModal} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.errorModalContent}>
            <View style={styles.errorIconCircle}><AlertCircle size={32} color="#ef4444" /></View>
            <Text style={styles.errorModalTitle}>Gagal Menambahkan</Text>
            <Text style={styles.errorModalDesc}>Isi data lokasi dengan lengkap terlebih dahulu</Text>
            <Pressable style={styles.errorModalButton} onPress={() => setShowErrorModal(false)}>
              <Text style={styles.errorModalButtonText}>Tutup</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, marginBottom: 20, gap: 12 },
  backButton: { padding: 4 },
  headerTitle: { fontSize: 20, fontFamily: "MonaSans-Bold", color: COLORS.text },
  
  scrollContent: { flexGrow: 1, paddingHorizontal: 16, gap: 24 }, 
  
  inputGroup: { gap: 10 },
  label: { fontSize: 16, fontFamily: "MonaSans-Bold", color: COLORS.text },
  requiredMark: { color: "#ef4444" },
  input: { backgroundColor: COLORS.white, borderWidth: 1.5, borderColor: COLORS.gray200, borderRadius: 14, paddingHorizontal: 16, paddingVertical: 14, fontSize: 15, fontFamily: "MonaSans-Medium", color: COLORS.text },
  inputErrorBorder: { borderColor: "#ef4444" },
  locationInputContainer: { flexDirection: "row", alignItems: "center", backgroundColor: COLORS.white, borderWidth: 1.5, borderColor: COLORS.gray200, borderRadius: 14, overflow: "hidden" },
  
  mapPinButton: { paddingHorizontal: 14, alignSelf: "stretch", justifyContent: "center", borderLeftWidth: 1, borderLeftColor: COLORS.gray100 },
  
  inlinePredictionsContainer: { backgroundColor: COLORS.white, borderWidth: 1.5, borderColor: COLORS.gray200, borderRadius: 14, marginTop: 4, overflow: "hidden" },
  predictionItem: { flexDirection: "row", padding: 14, borderBottomWidth: 1, borderBottomColor: COLORS.gray100 },
  predictionText: { fontSize: 13, color: COLORS.text, fontFamily: "MonaSans-Regular", flex: 1, lineHeight: 18 },

  facilitiesWrapper: { borderRadius: 16, borderWidth: 1.5, borderColor: "transparent", padding: 2 },
  facilitiesContainer: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  facilityChip: { flexDirection: "row", alignItems: "center", backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.gray200, paddingHorizontal: 14, paddingVertical: 10, borderRadius: 20 },
  facilityChipSelected: { borderColor: COLORS.green400, backgroundColor: COLORS.green1000 },
  facilityText: { fontSize: 13, color: COLORS.muted, fontFamily: "MonaSans-Medium" },
  facilityTextSelected: { color: COLORS.green400, fontFamily: "MonaSans-Bold" },
  
  textArea: { minHeight: 120, paddingTop: 16 },
  imageSection: { gap: 12 },
  imageCell: { backgroundColor: COLORS.white, borderWidth: 1.5, borderColor: COLORS.gray200, borderStyle: "dashed", borderRadius: 14, justifyContent: "center", alignItems: "center", overflow: "hidden" },
  primaryImageCell: { width: "100%", height: 240, gap: 8 },
  secondaryImageCell: { width: 80, height: 80 },
  addThumbCell: { borderStyle: "solid", borderColor: COLORS.gray100 },
  imageThumbnailsRow: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  imageContainer: { width: "100%", height: "100%", position: "relative" },
  imageUploadText: { fontSize: 13, fontFamily: "MonaSans-Medium", color: COLORS.muted },
  previewImage: { width: "100%", height: "100%", resizeMode: "cover" },
  removeButton: { position: "absolute", top: 8, right: 8, backgroundColor: "rgba(0,0,0,0.5)", padding: 6, borderRadius: 20 },
  buttonContainer: { marginTop: 14 },
  
  modalOverlay: { flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)", justifyContent: "center", alignItems: "center", paddingHorizontal: 24 },
  errorModalContent: { backgroundColor: COLORS.white, width: "100%", borderRadius: 24, padding: 24, alignItems: "center", elevation: 10 },
  errorIconCircle: { width: 64, height: 64, borderRadius: 32, backgroundColor: "#fee2e2", justifyContent: "center", alignItems: "center", marginBottom: 16 },
  errorModalTitle: { fontSize: 18, fontFamily: "MonaSans-Bold", color: "#ef4444", marginBottom: 8, textAlign: "center" },
  errorModalDesc: { fontSize: 14, color: COLORS.muted, fontFamily: "MonaSans-Regular", textAlign: "center", marginBottom: 24, lineHeight: 22 },
  errorModalButton: { backgroundColor: "#ef4444", width: "100%", paddingVertical: 14, borderRadius: 14, alignItems: "center" },
  errorModalButtonText: { color: COLORS.white, fontSize: 15, fontFamily: "MonaSans-Bold" }
});