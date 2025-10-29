import { Stack } from "expo-router";
import './global.css'
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import COLORS from "../constants/colors";
import { StatusBar } from "react-native";
import {AppProvider} from '../context/AppContext'

export default function RootLayout() {
  const insets = useSafeAreaInsets();
  return (
    <AppProvider>
       <SafeAreaProvider style={{
        paddingTop: insets.top,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        backgroundColor: COLORS.background,
    }}>
     
      <Stack screenOptions={{ headerShown: false, headerTitleAlign: 'center' }} >
        <Stack.Screen name="(auth)" />

      </Stack>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.primary} />

    </SafeAreaProvider>
    </AppProvider>
   )
}
