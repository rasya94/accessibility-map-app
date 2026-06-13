import { Text, View } from "react-native";
import { COLORS } from "@/constants/colors";

type Props = { title: string };

export function SectionTitle({ title }: Props) {
  return (
    <View style={{ marginBottom: 12 }}>
      <Text style={{ fontSize: 18, fontWeight: "800", color: COLORS.text }}>
        {title}
      </Text>
    </View>
  );
}
