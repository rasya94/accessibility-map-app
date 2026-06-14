import { COLORS } from "@/constants/colors";
import { Tabs } from "expo-router";
import { Map, User, Users } from "lucide-react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.green400,
        tabBarInactiveTintColor: COLORS.gray600,
        tabBarLabelStyle: {
          fontSize: 13, // Scaled up text label size (default is typically 10)
          fontWeight: "600", // Slightly bolder text weight for better readability
          marginTop: 2, // Controls space between icon and text
        },
        tabBarStyle: {
          height: 78,
          paddingTop: 8,
          paddingBottom: 12, // Increased bottom padding to accommodate larger text safely
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
          // Explicitly passed 24 to scale up the icons instead of using default route dimensions
          tabBarIcon: ({ color }) => <Map size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="contribute"
        options={{
          title: "Kontribusi",
          tabBarIcon: ({ color }) => <Users size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profil",
          tabBarIcon: ({ color }) => <User size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
