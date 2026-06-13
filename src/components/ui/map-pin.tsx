import { View } from "react-native";
import type { ComponentType } from "react";
import { COLORS } from "@/constants/colors";

type IconProps = {
  size?: number;
  color?: string;
  strokeWidth?: number;
};

type Props = {
  icon: ComponentType<IconProps>;
  color: string;
  top: number;
  left: number;
};

export function MapPin({ icon: Icon, color, top, left }: Props) {
  return (
    <View
      style={{
        position: "absolute",
        top,
        left,
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: color,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 4,
      }}
    >
      <Icon size={22} color={COLORS.white} strokeWidth={2.2} />
      <View
        style={{
          position: "absolute",
          bottom: -6,
          width: 10,
          height: 10,
          borderRadius: 5,
          backgroundColor: color,
          transform: [{ rotate: "45deg" }],
        }}
      />
    </View>
  );
}
