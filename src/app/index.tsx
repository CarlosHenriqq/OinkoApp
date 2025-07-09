import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import Oinko1 from '../../assets/images/oinko1.svg';
export default function First() {
  const router = useRouter();

  useEffect(() => {
    StatusBar.setBarStyle('dark-content'); // cor dos ícones da status bar
    const timer = setTimeout(() => {
      router.push('/auth/initial');

    }, 3000);
    return () => clearTimeout(timer);
  }, []);


  return (
  
      <View style={styles.container}>
     <Oinko1/>
        
      </View>
  
  );
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: '#E0E8F9',
    justifyContent: 'center',
    alignItems: 'center',
  }

});