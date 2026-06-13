import { useLocalSearchParams } from "expo-router";
import { SurveyView } from "@/features/survey/views/survey-view";
import { places } from "@/constants/mockData";

export default function SurveyRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const place = places.find((item) => item.id === id) ?? places[0];
  return <SurveyView place={place} />;
}
