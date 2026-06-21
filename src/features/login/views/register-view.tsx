import React, { useState } from "react";
import { View, TextInput, Pressable, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { Text } from "@/components/ui/text";
import { COLORS } from "@/constants/colors";
import { AppButton } from "@/components/ui/app-button";
import { SquareCheck, Square } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { authStyles } from "../styles";

type RegisterViewProps = {
  onNavigateToLogin: () => void;
  onRegisterSuccess: () => void;
};

export function RegisterView({ onNavigateToLogin, onRegisterSuccess }: RegisterViewProps) {
  const insets = useSafeAreaInsets();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  // Checks if all fields are filled out and terms are accepted
  const isFormValid = 
    fullName.trim() !== "" && 
    email.trim() !== "" && 
    password.length >= 6 && 
    password === confirmPassword && 
    agreeToTerms;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: COLORS.white }}
    >
      <ScrollView
        contentContainerStyle={[
          authStyles.container,
          {
            paddingTop: insets.top + 32,
            paddingBottom: insets.bottom + 24,
          },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={authStyles.registerTitle}>
          Bantu wujudkan aksesibilitas{"\n"}yang lebih baik untuk semua.
        </Text>

        {/* Added "Isi data diri" section description */}
        <View style={{ marginTop: 8, marginBottom: 4 }}>
          <Text style={authStyles.sectionLabel}>Informasi Dirimu</Text>
        </View>

        {/* Registration Inputs */}
        <View style={[authStyles.formGroup, { marginBottom: 20 }]}>
          <TextInput
            style={authStyles.inputCapsule}
            placeholder="Nama Lengkap"
            placeholderTextColor={COLORS.gray300}
            value={fullName}
            onChangeText={setFullName}
          />
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
            placeholder="Password (min. 6 karakter)"
            placeholderTextColor={COLORS.gray300}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TextInput
            style={authStyles.inputCapsule}
            placeholder="Konfirmasi Password"
            placeholderTextColor={COLORS.gray300}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </View>

        {/* Completed Checkbox Text */}
        <Pressable
          onPress={() => setAgreeToTerms(!agreeToTerms)}
          style={[authStyles.checkboxContainer, { alignItems: 'flex-start', gap: 10 }]}
        >
          <View style={{ marginTop: 2 }}>
            {agreeToTerms ? (
              <SquareCheck size={20} color={COLORS.green400 || COLORS.text} fill={COLORS.white} />
            ) : (
              <Square size={20} color={COLORS.gray300} />
            )}
          </View>
          <Text style={[authStyles.checkboxLabel, { flex: 1, fontSize: 14, lineHeight: 20 }]}>
            Saya menyetujui <Text style={{ fontFamily: "MonaSans-Medium", color: COLORS.green400 }}>Syarat & Ketentuan</Text> serta <Text style={{ fontFamily: "MonaSans-Medium", color: COLORS.green400 }}>Kebijakan Privasi</Text> yang berlaku.
          </Text>
        </Pressable>

        {/* Footer Actions */}
        <View style={authStyles.actionGroup}>
          <AppButton
            label="Bergabung"
            variant={isFormValid ? "primary" : "disabled"}
            disabled={!isFormValid}
            onPress={onRegisterSuccess}
          />
          
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 12, gap: 4 }}>
            <Text style={{ color: COLORS.gray500, fontFamily: "MonaSans-SemiBold" }}>Sudah punya akun?</Text>
            <Pressable onPress={onNavigateToLogin} style={authStyles.linkButton}>
              <Text style={{ color: COLORS.green400, fontFamily: "MonaSans-SemiBold" }}>Masuk</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}