import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { ScreenContainer } from '../../components/ScreenContainer';
import { useAppTheme } from '../../hooks/useAppTheme';

export const ForgotPasswordScreen = () => {
  const theme = useAppTheme();

  return (
    <ScreenContainer style={styles.container}>
      <Text style={{ color: theme.colors.text }}>Forgot Password Screen</Text>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
