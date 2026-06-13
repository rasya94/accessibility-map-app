import { useLocalSearchParams } from "expo-router";
import { PlaceDetailView } from "@/features/detail/views/place-detail-view";
import { places } from "@/constants/mockData";

export default function PlaceRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const place = places.find((item) => item.id === id) ?? places[0];
  return <PlaceDetailView place={place} />;
}
