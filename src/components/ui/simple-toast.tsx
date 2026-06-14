import { Text } from "@/components/ui/text";
import { COLORS } from "@/constants/colors";
import { Check, X } from "lucide-react-native";
import React, { useEffect, useMemo } from "react";
import { Animated } from "react-native";

type SimpleToastProps = {
  visible: boolean;
  message: string;
  onDismiss: () => void;
  duration?: number;
  bottomOffset?: number;
  variant?: "success" | "error";
};

export function SimpleToast({
  visible,
  message,
  onDismiss,
  duration = 2000,
  bottomOffset = 50,
  variant = "success",
}: SimpleToastProps) {
  const fadeAnim = useMemo(() => new Animated.Value(0), []);
  const yAnim = useMemo(() => new Animated.Value(15), []);

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(yAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();

      const timer = setTimeout(() => {
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(yAnim, {
            toValue: 10,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start(() => {
          onDismiss();
        });
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!visible) return null;

  const isError = variant === "error";
  const Icon = isError ? X : Check;
  const backgroundColor = isError ? COLORS.red : COLORS.green400;

  return (
    <Animated.View
      style={{
        position: "absolute",
        bottom: bottomOffset,
        left: 20,
        right: 20,
        backgroundColor: backgroundColor,
        borderRadius: 24,
        paddingVertical: 14,
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        opacity: fadeAnim,
        transform: [{ translateY: yAnim }],
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 6,
        zIndex: 9999,
      }}
    >
      <Icon size={18} color={COLORS.white} strokeWidth={3} />
      <Text
        style={{
          color: COLORS.white,
          fontWeight: "700",
          fontSize: 14,
          textAlign: "center",
        }}
      >
        {message}
      </Text>
    </Animated.View>
  );
}
