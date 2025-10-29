

import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Feather } from '@expo/vector-icons'

const TabsLayout = () => {
  return (
    <Tabs screenOptions={{
      headerShown: false, tabBarShowLabel: true,
       tabBarActiveTintColor: "#FF6A88",   // ✅ Active label color (green)
        tabBarInactiveTintColor: "#999999", // ✅ Inactive label color (gray)

      tabBarStyle:
      {
       
        height: 90,
        paddingTop: 10,
        shadowColor: '#FF6A88',
        shadowOffset: { width: 0, height: -6 },
        shadowOpacity: 0.6, shadowRadius: 10,
        elevation: 10,
        backgroundColor: '#fff'
      }
    }}>
      <Tabs.Screen name="index" options={{ title: "Home", tabBarIcon: ({focused}) => <Feather name="home" size={24} color={focused ? "#FF6A88" : "#999999"} /> }} />
      <Tabs.Screen name="Create" options={{ title: "Add Book", tabBarIcon: ({focused}) => <Feather name="plus-circle" size={24} color={focused ? "#FF6A88" : "#999999"} /> }} />

      <Tabs.Screen name="Profile" options={{ title: "Profile", tabBarIcon: ({focused}) => <Feather name="user" size={24} color={focused ? "#FF6A88" : "#999999"} /> }} />
    </Tabs>
  )
}

export default TabsLayout
