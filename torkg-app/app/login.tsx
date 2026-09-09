import { useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Image } from 'expo-image';

import { useAuth } from '@/providers/auth-provider';

export default function LoginScreen() {
  const { signInWithPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async () => {
    setErrorMessage(null);

    if (!email.trim() || !password) {
      setErrorMessage('Informe seu e-mail e sua senha.');
      return;
    }

    setIsSubmitting(true);
    try {
      await signInWithPassword(email.trim(), password);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Não foi possível entrar.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.screen}>
      <View style={styles.content}>
        <Image source={require('@/assets/logos/logo.png')} style={styles.logo} contentFit="contain" />
        <Text style={styles.title}>Entre na sua garagem</Text>
        <Text style={styles.subtitle}>Use a conta cadastrada no TorkG para continuar.</Text>

        <TextInput
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
          onChangeText={setEmail}
          placeholder="E-mail"
          placeholderTextColor="#8a8a8a"
          style={styles.input}
          value={email}
        />
        <TextInput
          autoComplete="password"
          onChangeText={setPassword}
          placeholder="Senha"
          placeholderTextColor="#8a8a8a"
          secureTextEntry
          style={styles.input}
          value={password}
          onSubmitEditing={handleLogin}
        />

        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

        <Pressable
          disabled={isSubmitting}
          onPress={handleLogin}
          style={({ pressed }) => [styles.submitButton, (pressed || isSubmitting) && styles.submitButtonPressed]}
        >
          {isSubmitting ? <ActivityIndicator color="#fff" /> : <Text style={styles.submitText}>Entrar</Text>}
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#151515', justifyContent: 'center', padding: 24 },
  content: { width: '100%', maxWidth: 440, alignSelf: 'center' },
  logo: { width: 180, height: 70, alignSelf: 'center', marginBottom: 28 },
  title: { color: '#fff', fontSize: 28, fontWeight: '700', textAlign: 'center' },
  subtitle: { color: '#a9abad', fontSize: 15, lineHeight: 22, textAlign: 'center', marginTop: 10, marginBottom: 30 },
  input: { backgroundColor: '#252525', borderColor: '#424242', borderWidth: 1, borderRadius: 12, color: '#fff', fontSize: 16, marginBottom: 12, paddingHorizontal: 16, paddingVertical: 15 },
  error: { color: '#ff8a52', fontSize: 14, marginBottom: 12, textAlign: 'center' },
  submitButton: { alignItems: 'center', backgroundColor: '#ff4e00', borderRadius: 12, marginTop: 8, minHeight: 52, justifyContent: 'center' },
  submitButtonPressed: { opacity: 0.7 },
  submitText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
