import { Pressable, Text, ViewStyle } from "react-native";
import { COLORS } from "@/constants/colors";

type Props = {
  label: string;
  onPress?: () => void;
  variant?: "primary" | "dark" | "ghost";
  style?: ViewStyle;
  disabled?: boolean;
};

export function AppButton({
  label,
  onPress,
  variant = "primary",
  style,
  disabled,
}: Props) {
  const backgroundColor =
    variant === "primary"
      ? COLORS.green
      : variant === "dark"
      ? COLORS.black
      : "transparent";

  const color = variant === "ghost" ? COLORS.text : COLORS.white;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        {
          minHeight: 54,
          borderRadius: 18,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor,
          opacity: pressed || disabled ? 0.88 : 1,
          borderWidth: variant === "ghost" ? 1 : 0,
          borderColor: COLORS.gray200,
        },
        style,
      ]}
    >
      <Text style={{ color, fontSize: 16, fontWeight: "700" }}>{label}</Text>
    </Pressable>
  );
}
