import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <>
          <Tabs
            screenOptions={{
              tabBarActiveTintColor: 'blue',
              headerShown: false,
              tabBarButton: HapticTab,
              tabBarBackground: TabBarBackground,
              tabBarStyle: Platform.select({
                ios: {
                  // Use a transparent background on iOS to show the blur effect
                  position: 'absolute',
                },
                default: {},
              }),
            }}>
            <Tabs.Screen
              name="index"
              options={{
                title: 'Home',
                tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
              }}
            />
            <Tabs.Screen
              name="search-city"
              options={{
                title: 'Buscar',
                tabBarIcon: ({ color }) => <Ionicons size={28} name="search" color={color} />,
              }}
            />
            <Tabs.Screen
              name="favoritos"
              options={{
                title: 'Favoritos',
                tabBarIcon: ({ color }) => <Ionicons size={28} name="heart" color={color} />,
              }}
            />
            <Tabs.Screen
              name="profile"
              options={{
                title: 'Perfil',
                tabBarIcon: ({ color }) => <Ionicons size={28} name="person" color={color} />,
              }}
            />
          </Tabs>
    </>
  );
}
