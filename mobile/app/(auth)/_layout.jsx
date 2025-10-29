import { StatusBar } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import COLORS from '../../constants/colors';


const AuthLayout = () => {
  const insets = useSafeAreaInsets();
  return (

    <>
     <SafeAreaProvider className="flex-1" style={{
      
     }}>
       {/* Stack handles routing for auth screens */}
      <Stack
        screenOptions={{
          headerShown: false, // hide headers globally
          headerTitleAlign: 'center',
        }}
      >
        <Stack.Screen name="index" options={{ title: "Login" }} />
        <Stack.Screen name="Signup" options={{ title: "Sign Up" }} />
      </Stack>

      {/* StatusBar */}
      <StatusBar barStyle="dark-content"  translucent />
     </SafeAreaProvider>
    </>
  );
};

export default AuthLayout;
