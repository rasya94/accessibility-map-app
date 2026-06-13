import { Text as RNText, TextProps, StyleSheet } from "react-native";

/**
 * Drop-in Text replacement that automatically swaps MonaSans-Italic
 * whenever fontStyle="italic" is detected, since React Native can't
 * map font variants automatically.
 */
export function Text({ style, ...props }: TextProps) {
  const flat = StyleSheet.flatten(style) ?? {};
  const isItalic = flat.fontStyle === "italic";

  const resolvedStyle = isItalic
    ? { ...flat, fontFamily: "MonaSans-Italic", fontStyle: undefined }
    : { fontFamily: "MonaSans", ...flat };

  return <RNText style={resolvedStyle} {...props} />;
}
