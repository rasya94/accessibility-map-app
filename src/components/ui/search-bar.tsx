import { View, TextInput } from "react-native";
import { Mic, Search } from "lucide-react-native";
import { COLORS } from "@/constants/colors";

export function SearchBar() {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.white,
        borderRadius: 999,
        height: 52,
        paddingHorizontal: 16,
        shadowColor: "#000",
        shadowOpacity: 0.07,
        shadowRadius: 14,
        shadowOffset: { width: 0, height: 6 },
        elevation: 3,
      }}
    >
      <Search size={18} color={COLORS.gray600} />
      <TextInput
        placeholder="Cari lokasi..."
        placeholderTextColor={COLORS.gray600}
        style={{ flex: 1, marginLeft: 10, fontSize: 15, color: COLORS.text }}
      />
      <Mic size={18} color={COLORS.gray600} />
    </View>
  );
}
