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

        <Text style={authStyles.sectionLabel}>Informasi Diri</Text>

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
            placeholder="Password"
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

        {/* Custom Checkbox */}
        <Pressable
          onPress={() => setAgreeToTerms(!agreeToTerms)}
          style={authStyles.checkboxContainer}
        >
          {agreeToTerms ? (
            <SquareCheck size={20} color={COLORS.text} fill={COLORS.white} />
          ) : (
            <Square size={20} color={COLORS.gray300} />
          )}
          <Text style={authStyles.checkboxLabel}>Saya Setuju dengan ...</Text>
        </Pressable>

        {/* Footer Actions */}
        <View style={authStyles.actionGroup}>
          <AppButton
            label="Bergabung"
            variant={agreeToTerms ? "primary" : "disabled"}
            disabled={!agreeToTerms}
            onPress={onRegisterSuccess}
          />
          <Pressable onPress={onNavigateToLogin} style={authStyles.linkButton}>
            <Text style={authStyles.footerTextInline}>Sudah Punya Akun?</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}