import { useLocalSearchParams } from "expo-router";
import { ReviewView } from "@/features/review/views/review-view";
import { places } from "@/constants/mockData";

export default function ReviewRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const place = places.find((item) => item.id === id) ?? places[0];
  return <ReviewView place={place} />;
}
