import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabParamList } from './types';
import { TaskNavigator } from './TaskNavigator';
import { FeedScreen } from '../screens/social/FeedScreen';
import { CommunityNavigator } from './CommunityNavigator';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { Icon } from '../components/Icon';
import { useAppTheme } from '../hooks/useAppTheme';

const Tab = createBottomTabNavigator<TabParamList>();

export const TabNavigator = () => {
  const theme = useAppTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.card,
          borderTopColor: theme.colors.border,
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.text,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = 'help';

          if (route.name === 'Tasks') {
            iconName = focused ? 'checkbox' : 'checkbox-outline';
          } else if (route.name === 'Social') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'Communities') {
            iconName = focused ? 'planet' : 'planet-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Tasks" component={TaskNavigator} />
      <Tab.Screen name="Social" component={FeedScreen} />
      <Tab.Screen name="Communities" component={CommunityNavigator} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};
