import { useMemo, useState } from "react";
import { ImageBackground, Pressable, View } from "react-native";
import { Text } from "@/components/ui/text";
import { router } from "expo-router";
import {
  ArrowLeft,
  ArrowUpCircle,
  ArrowUpDown,
  Bath,
  CheckCircle2,
  CircleAlert,
  CircleX,
  Hand,
  MapPin,
  Snowflake,
  Star,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react-native";
import { AppButton } from "@/components/ui/app-button";
import { COLORS } from "@/constants/colors";
import { Place } from "@/constants/mockData";
import { surveyStyles } from "../styles";

type Props = { place: Place };

const questions = [
  {
    title: "Apakah Lokasi ini Aksesibel untuk pengguna kursi roda?",
    options: [
      { label: "Ya!", icon: ThumbsUp, color: COLORS.green },
      { label: "Sebagian", icon: Hand, color: COLORS.orange },
      { label: "Tidak", icon: ThumbsDown, color: COLORS.red },
    ],
  },
  {
    title: "Pilih Fasilitas yang tersedia.",
    options: [
      { label: "Air Conditioner", icon: Snowflake, color: COLORS.green },
      { label: "Lift", icon: ArrowUpDown, color: COLORS.green },
      { label: "Eskalator", icon: ArrowUpCircle, color: COLORS.gray300 },
      { label: "Kamar Mandi Difabel", icon: Bath, color: COLORS.gray300 },
    ],
  },
  {
    title: "Apakah jalur masuk memiliki hambatan?",
    options: [
      { label: "Tidak ada hambatan", icon: CheckCircle2, color: COLORS.green },
      { label: "Ada beberapa tangga", icon: CircleAlert, color: COLORS.orange },
      { label: "Sulit diakses", icon: CircleX, color: COLORS.red },
    ],
  },
];

export function SurveyView({ place }: Props) {
  const [step, setStep] = useState(0);
  const q = useMemo(() => questions[step], [step]);

  return (
    <View style={surveyStyles.container}>
      <ImageBackground source={{ uri: place.image }} style={surveyStyles.hero} resizeMode="cover">
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
      </ImageBackground>

      <View style={surveyStyles.card}>
        <Text style={{ fontSize: 20, fontWeight: "800", color: COLORS.text }}>{place.name}</Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginTop: 8 }}>
          <Star size={14} color={COLORS.green} fill={COLORS.green} />
          <Text style={{ color: COLORS.gray600, fontWeight: "700" }}>
            {place.rating} ({place.reviews})
          </Text>
          <MapPin size={14} color={COLORS.green} style={{ marginLeft: 8 }} />
          <Text style={{ color: COLORS.gray600 }}>{place.address}</Text>
        </View>
      </View>

      <View style={{ flex: 1, padding: 16 }}>
        <Text style={{ fontSize: 20, fontWeight: "800", color: COLORS.text, marginTop: 10 }}>
          {q.title}
        </Text>

        <View style={{ gap: 12, marginTop: 22 }}>
          {q.options.map((opt) => {
            const Icon = opt.icon;
            return (
              <View
                key={opt.label}
                style={{
                  borderWidth: 1,
                  borderColor: opt.color,
                  borderRadius: 18,
                  paddingHorizontal: 14,
                  minHeight: 54,
                  justifyContent: "center",
                  backgroundColor: COLORS.white,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                  <Icon size={18} color={opt.color} />
                  <Text style={{ fontSize: 14, color: COLORS.text }}>{opt.label}</Text>
                </View>
              </View>
            );
          })}
        </View>

        <View style={{ flex: 1 }} />

        <AppButton
          label={step < questions.length - 1 ? `Selanjutnya (${step + 1}/${questions.length})` : "Kirim Survei"}
          variant="dark"
          onPress={() => {
            if (step < questions.length - 1) setStep((s) => s + 1);
            else router.replace("/");
          }}
        />
      </View>
    </View>
  );
}
