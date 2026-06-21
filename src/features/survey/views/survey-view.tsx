import { AppButton } from "@/components/ui/app-button";
import { SimpleToast } from "@/components/ui/simple-toast";
import { SingleOptionModal } from "@/components/ui/single-option-modal";
import { Text } from "@/components/ui/text";
import { COLORS } from "@/constants/colors";
import { Place } from "@/constants/mockData";
import { router } from "expo-router";
import {
  ArrowLeft,
  ArrowUpCircle,
  ArrowUpDown,
  Toilet,
  CheckCircle2,
  CircleAlert,
  CircleX,
  DoorOpen,
  MapPin,
  Star,
  SquareParking,
  Users,
  Accessibility
} from "lucide-react-native";
import { useMemo, useState } from "react";
import { ImageBackground, Pressable, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = { place: Place };

const questions = [
  {
    title: "Pilih fasilitas aksesibilitas yang tersedia:",
    multi: true,
    required: false,
    options: [
      {
        label: "Ramp / Jalur Kursi Roda",
        icon: ArrowUpDown,
        color: COLORS.green400,
        bg: COLORS.green1000,
      },
      {
        label: "Lift Aksesibel",
        icon: ArrowUpCircle,
        color: COLORS.green400,
        bg: COLORS.green1000,
      },
      {
        label: "Toilet Difabel",
        icon: Toilet,
        color: COLORS.green400,
        bg: COLORS.green1000,
      },
      {
        label: "Parkiran Khusus",
        icon: SquareParking,
        color: COLORS.green400,
        bg: COLORS.green1000,
      },
      {
        label: "Pintu Otomatis",
        icon: DoorOpen,
        color: COLORS.green400,
        bg: COLORS.green1000,
      },
      {
        label: "Staf Pendamping",
        icon: Users,
        color: COLORS.green400,
        bg: COLORS.green1000,
      },
      {
        label: "Kursi Roda Tersedia",
        icon: Accessibility,
        color: COLORS.green400,
        bg: COLORS.green1000,
      },
    ],
  },
  {
    title: "Bagaimana kondisi akses masuk utama?",
    multi: false,
    required: true,
    options: [
      {
        label: "Datar tanpa anak tangga",
        icon: CheckCircle2,
        color: COLORS.green400,
        bg: COLORS.green1000,
      },
      {
        label: "Ada undakan kecil",
        icon: CircleAlert,
        color: COLORS.orange,
        bg: COLORS.orangeSoft,
      },
      {
        label: "Terdapat tangga atau halangan",
        icon: CircleX,
        color: COLORS.red,
        bg: COLORS.redSoft,
      },
    ],
  },
  {
    title: "Bagaimana keleluasaan bergerak di dalam area?",
    multi: false,
    required: true,
    options: [
      {
        label: "Luas tanpa hambatan fisik",
        icon: CheckCircle2,
        color: COLORS.green400,
        bg: COLORS.green1000,
      },
      {
        label: "Sempit di titik tertentu",
        icon: CircleAlert,
        color: COLORS.orange,
        bg: COLORS.orangeSoft,
      },
      {
        label: "Penuh sekat menyulitkan",
        icon: CircleX,
        color: COLORS.red,
        bg: COLORS.redSoft,
      },
    ],
  },
  {
    title: "Bagaimana kemudahan menuju area drop-off kendaraan?",
    multi: false,
    required: true,
    options: [
      {
        label: "Sangat dekat pintu masuk",
        icon: CheckCircle2,
        color: COLORS.green400,
        bg: COLORS.green1000,
      },
      {
        label: "Cukup berjarak",
        icon: CircleAlert,
        color: COLORS.orange,
        bg: COLORS.orangeSoft,
      },
      {
        label: "Sangat jauh, terpisah",
        icon: CircleX,
        color: COLORS.red,
        bg: COLORS.redSoft,
      },
    ],
  },
  {
    title: "Apakah kondisi permukaan lantai aman dilalui?",
    multi: false,
    required: true,
    options: [
      {
        label: "Rata dan tidak licin",
        icon: CheckCircle2,
        color: COLORS.green400,
        bg: COLORS.green1000,
      },
      {
        label: "Kasar, sedikit licin, atau bergelombang",
        icon: CircleAlert,
        color: COLORS.orange,
        bg: COLORS.orangeSoft,
      },
      {
        label: "Berpotensi berbahaya",
        icon: CircleX,
        color: COLORS.red,
        bg: COLORS.redSoft,
      },
    ],
  },
];

export function SurveyView({ place }: Props) {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<Record<number, string[]>>({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState<"success" | "error">(
    "success",
  );
  const [showSingleModal, setShowSingleModal] = useState(false);
  const [singleModalTitle, setSingleModalTitle] = useState("");

  const q = useMemo(() => questions[step], [step]);
  const insets = useSafeAreaInsets();

  const currentSelections = useMemo(() => selected[step] ?? [], [selected, step]);
  
  // A step is valid if it's explicitly not required, OR if it has at least one item selected
  const isValidStep = useMemo(() => {
    if (q.required === false) return true;
    return currentSelections.length > 0;
  }, [q, currentSelections]);

  const toggle = (label: string) => {
    setSelected((prev) => {
      const current = prev[step] ?? [];
      if (q.multi) {
        return {
          ...prev,
          [step]: current.includes(label)
            ? current.filter((l) => l !== label)
            : [...current, label],
        };
      }
      return { ...prev, [step]: [label] };
    });
  };

  const isSelected = (label: string) => currentSelections.includes(label);

  const handleNextPress = () => {
    if (!isValidStep) {
      setToastMessage("Pilih salah satu jawaban terlebih dahulu");
      setToastVariant("error");
      setShowToast(true);
      return;
    }

    if (step < questions.length - 1) {
      setToastMessage("Jawaban disimpan");
      setToastVariant("success");
      setShowToast(true);

      setTimeout(() => {
        setStep((s) => s + 1);
      }, 200);
    } else {
      setSingleModalTitle("Ulasan berhasil dikirim");
      setShowSingleModal(true);
    }
  };

  const handleModalConfirmation = () => {
    setShowSingleModal(false);
    router.replace({ 
      pathname: "/(tabs)", 
      params: { status: "submitted" } 
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <ImageBackground
        source={{ uri: place.image }}
        style={{
          height: 220,
          justifyContent: "flex-start",
          paddingTop: insets.top + 12,
          paddingHorizontal: 16,
        }}
        resizeMode="cover"
      >
        <View
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.22)",
          }}
        />
        <Pressable
          onPress={() => router.back()}
          style={{
            width: 42,
            height: 42,
            borderRadius: 12,
            backgroundColor: COLORS.white,
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
          }}
        >
          <ArrowLeft size={20} color={COLORS.black} />
        </Pressable>
      </ImageBackground>

      <View
        style={{
          marginTop: -28,
          marginHorizontal: 16,
          backgroundColor: COLORS.white,
          borderRadius: 28,
          padding: 24,
          shadowColor: COLORS.shadow,
          shadowOpacity: 0.1,
          shadowRadius: 20,
          shadowOffset: { width: 0, height: 8 },
          elevation: 6,
        }}
      >
        <Text style={{ fontSize: 18, fontFamily: "MonaSans-Bold", color: COLORS.text }}>
          {place.name}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            marginTop: 6,
          }}
        >
          <Star size={13} color={COLORS.green400} fill={COLORS.green400} />
          <Text style={{ color: COLORS.text, fontFamily: "MonaSans-Bold", fontSize: 13 }}>
            {place.rating}
          </Text>
          <Text style={{ color: COLORS.muted, fontFamily: "MonaSans-Regular", fontSize: 13 }}>
            ({place.reviews})
          </Text>
          <View
            style={{ width: 1, height: 12, backgroundColor: COLORS.gray200 }}
          />
          <MapPin size={13} color={COLORS.muted} />
          <Text style={{ color: COLORS.muted, fontFamily: "MonaSans-Regular", fontSize: 13 }} numberOfLines={1}>
            {place.address}
          </Text>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          paddingHorizontal: 16,
          paddingTop: 20,
          paddingBottom: insets.bottom + 16,
        }}
      >
        <View style={{ flexDirection: "row", gap: 6, marginBottom: 20 }}>
          {questions.map((_, i) => (
            <View
              key={i}
              style={{
                flex: 1,
                height: 4,
                borderRadius: 2,
                backgroundColor: i <= step ? COLORS.green400 : COLORS.gray200,
              }}
            />
          ))}
        </View>

        <View style={{ marginBottom: 18 }}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: "MonaSans-Bold",
              color: COLORS.text,
              lineHeight: 26,
            }}
          >
            {q.title}
          </Text>
          {q.required === false && (
            <Text style={{ fontSize: 13, fontFamily: "MonaSans-Regular", color: COLORS.muted, marginTop: 4 }}>
              Pilihan ini opsional, bisa langsung klik lanjut jika tidak ada fasilitas.
            </Text>
          )}
        </View>

        <ScrollView 
          style={{ flex: 1 }} 
          contentContainerStyle={{ gap: 10, paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        >
          {q.options.map((opt) => {
            const Icon = opt.icon;
            const active = isSelected(opt.label);
            return (
              <Pressable
                key={opt.label}
                onPress={() => toggle(opt.label)}
                style={({ pressed }) => ({
                  borderWidth: 1.5,
                  borderColor: active ? opt.color : COLORS.gray200,
                  borderRadius: 16,
                  paddingHorizontal: 16,
                  minHeight: 56,
                  justifyContent: "center",
                  backgroundColor: active ? opt.bg : COLORS.white,
                  opacity: pressed ? 0.85 : 1,
                })}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <View
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 10,
                      backgroundColor: active ? opt.color : COLORS.gray100,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon
                      size={17}
                      color={active ? COLORS.white : COLORS.gray600}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 14,
                      color: active ? opt.color : COLORS.text,
                      fontFamily: active ? "MonaSans-Bold" : "MonaSans-Medium",
                    }}
                  >
                    {opt.label}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </ScrollView>

        <AppButton
          label={
            step < questions.length - 1
              ? `Selanjutnya (${step + 1}/${questions.length})`
              : "Kirim Survei"
          }
          variant={isValidStep ? "dark" : "disabled"}
          onPress={handleNextPress}
        />
      </View>

      <SimpleToast
        visible={showToast}
        message={toastMessage}
        onDismiss={() => setShowToast(false)}
        duration={1500}
        bottomOffset={insets.bottom + 80}
        variant={toastVariant}
      />

      <SingleOptionModal
        visible={showSingleModal}
        title={singleModalTitle}
        buttonLabel="Selesai"
        onButtonPress={handleModalConfirmation}
      />
    </View>
  );
}