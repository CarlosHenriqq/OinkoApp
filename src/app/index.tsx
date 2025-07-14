import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import Oinko1 from '../../assets/images/oinko1.svg';

export default function First() {
  const router = useRouter();

  useEffect(() => {
    StatusBar.setBarStyle('dark-content');

    async function checkLogin() {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          router.replace('/pages/userDash');
        } else {
          setTimeout(() => {
            router.replace('/auth/initial');
          }, 3000);
        }
      } catch (error) {
        console.error('Erro ao verificar login:', error);
        router.replace('/auth/initial');
      }
    }

    checkLogin();
  }, []);

  return (
    <View style={styles.container}>
      <Oinko1 />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0E8F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
});