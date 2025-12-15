import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { ScreenContainer } from '../../components/ScreenContainer';
import { useAuthStore } from '../../store/authStore';
import { useNavigation } from '@react-navigation/native';
import { useAppTheme } from '../../hooks/useAppTheme';

export const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuthStore();
  const navigation = useNavigation<any>();
  const theme = useAppTheme();

  const handleLogin = async () => {
    // In real app, call API here
    await signIn('dummy_token', { id: '1', email });
  };

  return (
    <ScreenContainer style={styles.container}>
      <Text style={[styles.title, { color: theme.colors.text }]}>Login</Text>
      <TextInput
        style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border }]}
        placeholder="Email"
        placeholderTextColor={theme.colors.text}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border }]}
        placeholder="Password"
        placeholderTextColor={theme.colors.text}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={styles.link}>
        <Text style={{ color: theme.colors.primary }}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  link: {
    marginTop: 15,
    alignItems: 'center',
  },
});
