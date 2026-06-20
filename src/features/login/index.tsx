// features/login/index.tsx
import React, { useState } from "react";
import { View } from "react-native";
import { COLORS } from "@/constants/colors";
import { LoginView } from "./views/login-view";
import { RegisterView } from "./views/register-view";
import { SingleOptionModal } from "@/components/ui/single-option-modal";
import { router } from "expo-router";

type ActiveAuthScreen = "LOGIN" | "REGISTER";

export default function LoginFeature() {
  const [screen, setScreen] = useState<ActiveAuthScreen>("LOGIN");
  const [modalVisible, setModalVisible] = useState(false);

  const handleLoginSubmit = () => {
    // Pengalihan instan ke halaman utama (tabs) bypass otentikasi server
    router.replace("/(tabs)");
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      {screen === "LOGIN" ? (
        <LoginView 
          onNavigateToRegister={() => setScreen("REGISTER")} 
          onLoginSuccess={handleLoginSubmit}
        />
      ) : (
        <RegisterView 
          onNavigateToLogin={() => setScreen("LOGIN")} 
          onRegisterSuccess={() => setModalVisible(true)}
        />
      )}

      <SingleOptionModal
        visible={modalVisible}
        title="Akun Anda berhasil didaftarkan!"
        buttonLabel="Masuk Sekarang"
        onButtonPress={() => { setModalVisible(false); setScreen("LOGIN"); }}
      />
    </View>
  );
}