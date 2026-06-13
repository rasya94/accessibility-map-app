import { Text } from "@/components/ui/text";
import { COLORS } from "@/constants/colors";
import { View } from "react-native";

type Props = { title: string };

export function SectionTitle({ title }: Props) {
  return (
    <View style={{ marginBottom: 12 }}>
      <Text style={{ fontSize: 18, fontWeight: "600", color: COLORS.text }}>
        {title}
      </Text>
    </View>
  );
}
