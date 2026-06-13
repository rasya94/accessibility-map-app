import { View } from "react-native";
import { Star } from "lucide-react-native";
import { COLORS } from "@/constants/colors";

type Props = {
  value: number;
  size?: number;
};

export function RatingStars({ value, size = 18 }: Props) {
  const full = Math.floor(value);
  const total = 5;

  return (
    <View style={{ flexDirection: "row", gap: 4 }}>
      {Array.from({ length: total }).map((_, index) => {
        const filled = index < full;
        return (
          <Star
            key={index}
            size={size}
            color={COLORS.green}
            fill={filled ? COLORS.green : "transparent"}
            strokeWidth={filled ? 1.5 : 2}
          />
        );
      })}
    </View>
  );
}
