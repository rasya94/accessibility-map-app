import { COLORS } from "@/constants/colors";
import type { ComponentType } from "react";
import { View } from "react-native";

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
        alignItems: "center",
      }}
    >
      {/* Larger circular pin head */}
      <View
        style={{
          width: 54, // Increased from 42
          height: 54, // Increased from 42
          borderRadius: 27, // Half of width/height to maintain perfect circle
          backgroundColor: color,
          alignItems: "center",
          justifyContent: "center",
          shadowColor: color,
          shadowOpacity: 0.45,
          shadowRadius: 12, // Slightly wider shadow blur for the larger element
          shadowOffset: { width: 0, height: 5 },
          elevation: 8,
          zIndex: 2, // Keeps head cleanly on top of the rotated tail element
        }}
      >
        <Icon size={24} color={COLORS.white} strokeWidth={2.5} />{" "}
        {/* Scaled up icon and stroke */}
      </View>

      {/* Scaled teardrop tail */}
      <View
        style={{
          width: 18, // Increased from 14
          height: 18, // Increased from 14
          backgroundColor: color,
          transform: [{ rotate: "45deg" }],
          marginTop: -12, // Adjusted offset to tuck cleanly behind the larger circular badge
          shadowColor: color,
          shadowOpacity: 0.3,
          shadowRadius: 5,
          elevation: 3,
          borderRadius: 5, // Slightly rounder tail corner to scale with size
        }}
      />
    </View>
  );
}
