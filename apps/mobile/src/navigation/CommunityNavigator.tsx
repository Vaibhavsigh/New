import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { CommunityStackParamList } from './types';
import { DiscoveryScreen } from '../screens/communities/DiscoveryScreen';
import { CommunityDetailScreen } from '../screens/communities/CommunityDetailScreen';

const Stack = createStackNavigator<CommunityStackParamList>();

export const CommunityNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Discovery" component={DiscoveryScreen} options={{ title: 'Communities' }} />
      <Stack.Screen name="CommunityDetail" component={CommunityDetailScreen} options={{ title: 'Details' }} />
    </Stack.Navigator>
  );
};
