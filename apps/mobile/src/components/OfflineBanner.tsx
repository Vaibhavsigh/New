import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { useAppTheme } from '../hooks/useAppTheme';

export const OfflineBanner = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(true);
  const theme = useAppTheme();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  if (isConnected !== false) {
    return null;
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.error }]}>
      <Text style={styles.text}>No Internet Connection</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
