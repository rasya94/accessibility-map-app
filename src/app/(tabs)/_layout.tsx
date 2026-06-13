import { Tabs } from "expo-router";
import { Map, Users, User } from "lucide-react-native";
import { COLORS } from "@/constants/colors";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.green,
        tabBarInactiveTintColor: COLORS.gray600,
        tabBarStyle: {
          height: 78,
          paddingTop: 8,
          borderTopWidth: 0,
          elevation: 0,
          backgroundColor: COLORS.white,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Peta",
          tabBarIcon: ({ color, size }) => <Map size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="contribute"
        options={{
          title: "Kontribusi",
          tabBarIcon: ({ color, size }) => <Users size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profil",
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
