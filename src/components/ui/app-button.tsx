import { Text } from "@/components/ui/text";
import { COLORS } from "@/constants/colors";
import { Pressable, ViewStyle } from "react-native";

type Props = {
  label: string;
  onPress?: () => void;
  variant?: "primary" | "dark" | "ghost";
  style?: ViewStyle;
  disabled?: boolean;
  icon?: React.ReactNode;
};

export function AppButton({
  label,
  onPress,
  variant = "primary",
  style,
  disabled,
  icon,
}: Props) {
  const bg =
    variant === "primary"
      ? COLORS.green400
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
          borderRadius: 16,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: bg,
          opacity: pressed || disabled ? 0.82 : 1,
          borderWidth: variant === "ghost" ? 1.5 : 0,
          borderColor: COLORS.gray200,
          flexDirection: "row",
          gap: 8,
        },
        style,
      ]}
    >
      {icon}
      <Text
        style={{ color, fontSize: 15, fontWeight: "700", letterSpacing: 0.2 }}
      >
        {label}
      </Text>
    </Pressable>
  );
}
