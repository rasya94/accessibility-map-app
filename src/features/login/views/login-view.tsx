import React, { useState } from "react";
import { View, TextInput, Pressable, KeyboardAvoidingView, Platform, ScrollView, Image } from "react-native";
import { Text } from "@/components/ui/text";
import { COLORS } from "@/constants/colors";
import { AppButton } from "@/components/ui/app-button";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { authStyles } from "../styles";

type LoginViewProps = {
  onNavigateToRegister: () => void;
  onLoginSuccess: () => void;
};

export function LoginView({ onNavigateToRegister, onLoginSuccess }: LoginViewProps) {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: COLORS.white }}
    >
      <ScrollView
        contentContainerStyle={[
          authStyles.container,
          {
            paddingTop: insets.top + 20,
            paddingBottom: insets.bottom + 24,
            justifyContent: "center",
          },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Unit Gambar Splash Kotak (Square Splash Image) */}
        <View style={authStyles.splashImageContainer}>
          <Image
            source={require("@/assets/images/login-splash.png")} // Menggunakan file splash asset Anda
            style={authStyles.squareSplashImage}
            resizeMode="cover"
          />
        </View>

        {/* Form Input */}
        <View style={authStyles.formGroup}>
          <TextInput
            style={authStyles.inputCapsule}
            placeholder="Email"
            placeholderTextColor={COLORS.gray300}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={authStyles.inputCapsule}
            placeholder="Password"
            placeholderTextColor={COLORS.gray300}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        {/* Tombol Aksi */}
        <View style={authStyles.actionGroup}>
          <AppButton 
            label="Login" 
            variant="dark" 
            onPress={onLoginSuccess} // Langsung sukses bypass masuk ke dashboard
          />
          <Pressable onPress={onNavigateToRegister} style={authStyles.linkButton}>
            <Text style={authStyles.linkText}>Atau Bergabung Disini</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}