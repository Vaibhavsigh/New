import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './types';
import { AuthNavigator } from './AuthNavigator';
import { TabNavigator } from './TabNavigator';
import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';
import { useColorScheme } from 'react-native';
import { theme } from '../store/themeStore';
import { ActivityIndicator, View } from 'react-native';

const Stack = createStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  const { token, isLoading, restoreToken } = useAuthStore();
  const scheme = useColorScheme();
  const getEffectiveTheme = useThemeStore((state) => state.getEffectiveTheme);
  const currentThemeMode = getEffectiveTheme(scheme);
  const navigationTheme = {
    dark: currentThemeMode === 'dark',
    colors: theme[currentThemeMode].colors,
  };

  useEffect(() => {
    restoreToken();
  }, [restoreToken]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!token ? (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        ) : (
          <Stack.Screen name="Main" component={TabNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
