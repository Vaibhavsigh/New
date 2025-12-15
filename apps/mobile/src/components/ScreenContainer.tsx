import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { useAppTheme } from '../hooks/useAppTheme';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ScreenContainerProps extends ViewProps {
  children: React.ReactNode;
  safe?: boolean;
}

export const ScreenContainer: React.FC<ScreenContainerProps> = ({ children, safe = true, style, ...props }) => {
  const theme = useAppTheme();
  const Container = safe ? SafeAreaView : View;

  return (
    <Container style={[{ flex: 1, backgroundColor: theme.colors.background }, style]} {...props}>
      {children}
    </Container>
  );
};
