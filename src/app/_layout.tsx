import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
// @@iconify-code-gen
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

  return <Slot />;
}
