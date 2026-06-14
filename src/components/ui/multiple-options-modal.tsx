import { Text } from "@/components/ui/text";
import { COLORS } from "@/constants/colors";
import { Check } from "lucide-react-native";
import React, { useEffect, useMemo } from "react";
import { Animated, Dimensions, Modal, Pressable, View } from "react-native";

type MultipleOptionsProps = {
  visible: boolean;
  title: string;
  noLabel?: string;
  yesLabel?: string;
  onNoPress: () => void;
  onYesPress: () => void;
};

export function MultipleOptionsModal({
  visible,
  title,
  noLabel = "No",
  yesLabel = "Yes",
  onNoPress,
  onYesPress,
}: MultipleOptionsProps) {
  const fadeAnim = useMemo(() => new Animated.Value(0), []);
  const scaleAnim = useMemo(() => new Animated.Value(0.9), []);

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      fadeAnim.setValue(0);
      scaleAnim.setValue(0.9);
    }
  }, [visible]);

  return (
    <Modal transparent visible={visible} animationType="none">
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Animated.View
          style={{
            width: Dimensions.get("window").width * 0.82,
            backgroundColor: COLORS.white,
            borderRadius: 24,
            padding: 24,
            alignItems: "center",
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowRadius: 15,
            shadowOffset: { width: 0, height: 8 },
            elevation: 5,
          }}
        >
          {/* Custom Checkmark Icon Unit */}
          <View style={{ alignItems: "center", marginBottom: 16 }}>
            <Check size={36} color={COLORS.green400} strokeWidth={3} />
            <View
              style={{
                width: 32,
                height: 3,
                backgroundColor: COLORS.green400,
                borderRadius: 2,
                marginTop: 2,
              }}
            />
          </View>

          <Text
            style={{
              fontSize: 16,
              fontWeight: "700",
              color: COLORS.text,
              textAlign: "center",
              marginBottom: 24,
              lineHeight: 22,
            }}
          >
            {title}
          </Text>

          {/* Symmetrical Button Actions Row */}
          <View style={{ flexDirection: "row", gap: 12, width: "100%" }}>
            <Pressable
              onPress={onNoPress}
              style={({ pressed }) => ({
                flex: 1,
                backgroundColor: COLORS.gray200 || "#E0E0E0",
                borderRadius: 18,
                height: 48,
                justifyContent: "center",
                alignItems: "center",
                opacity: pressed ? 0.85 : 1,
              })}
            >
              <Text
                style={{ color: COLORS.text, fontWeight: "700", fontSize: 14 }}
              >
                {noLabel}
              </Text>
            </Pressable>

            <Pressable
              onPress={onYesPress}
              style={({ pressed }) => ({
                flex: 1,
                backgroundColor: COLORS.green400,
                borderRadius: 18,
                height: 48,
                justifyContent: "center",
                alignItems: "center",
                opacity: pressed ? 0.9 : 1,
              })}
            >
              <Text
                style={{ color: COLORS.white, fontWeight: "700", fontSize: 14 }}
              >
                {yesLabel}
              </Text>
            </Pressable>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}
