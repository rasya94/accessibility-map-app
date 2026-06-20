import { COLORS } from "@/constants/colors";
import { Mic, Search } from "lucide-react-native";
import { Pressable, TextInput, View } from "react-native";

type Props = {
  placeholder?: string;
};

export function SearchBar({ placeholder = "Cari lokasi..." }: Props) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.white,
        borderRadius: 24,
        height: 42, // Bumped slightly from 52 to perfectly frame the larger elements
        paddingHorizontal: 16,
        shadowColor: COLORS.shadow,
        shadowOpacity: 0.1,
        shadowRadius: 20,
        shadowOffset: { width: 0, height: 4 },
        elevation: 5,
      }}
    >
      <Search size={20} color={COLORS.mapBlue} strokeWidth={2.2} />

      <TextInput
        placeholder={placeholder}
        placeholderTextColor={COLORS.gray600}
        style={{
          flex: 1,
          marginLeft: 12, // Slightly increased margin for the larger icons
          fontSize: 16,
          color: COLORS.text,
          fontFamily: "MonaSans",
          fontWeight: "600",
        }}
      />

      <Pressable
        style={({ pressed }) => ({
          alignItems: "center",
          justifyContent: "center",
          paddingLeft: 8, // Left padding acts as a clean touch target divider
          opacity: pressed ? 0.6 : 1,
        })}
      >
        {/* Scaled size to 20 and added explicit strokeWidth for a bolder aesthetic */}
        <Mic size={20} color={COLORS.gray600} strokeWidth={2.5} />
      </Pressable>
    </View>
  );
}
