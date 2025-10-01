import { ClerkProvider } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';

const PUBLIC_CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY as string;
console.log("Clerk Publishable Key:", PUBLIC_CLERK_PUBLISHABLE_KEY);


export default function Layout() {
  const [fontsLoaded] = useFonts({
    'Manrope': require('../../assets/fonts/Manrope.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#7a8c99" />
      </View>
    );
  }

  // ✅ Correção aqui:
  return (
    <ClerkProvider publishableKey={PUBLIC_CLERK_PUBLISHABLE_KEY} tokenCache={tokenCache} >
      <Slot />
    </ClerkProvider>
  );
}
