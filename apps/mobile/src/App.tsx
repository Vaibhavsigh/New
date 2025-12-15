import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './utils/queryClient';
import { AppNavigator } from './navigation/AppNavigator';
import { notificationService } from './services/notificationService';
import { useEffect } from 'react';
import { OfflineBanner } from './components/OfflineBanner';

const App = () => {
  useEffect(() => {
    notificationService.requestUserPermission();
    notificationService.getToken();
    const unsubscribe = notificationService.listen();
    return unsubscribe;
  }, []);

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <OfflineBanner />
        <AppNavigator />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
};

export default App;
