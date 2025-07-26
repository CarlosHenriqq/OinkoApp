import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Dimensions, TouchableOpacity, View } from "react-native";

const { width } = Dimensions.get('window');
const BASE_WIDTH = 390;
const scale = width / BASE_WIDTH;
const scaled = (size: number) => size * scale;

interface HeaderProfileProps {
  children?: React.ReactNode;
  showBackButton?: boolean;
  showLogoutButton?: boolean;
  fotoUri?: string | null;
}

export default function HeaderProfile({ children, showBackButton = false, showLogoutButton = false, fotoUri = null}: HeaderProfileProps) {

  async function handleLogout() {
    try {
      await AsyncStorage.removeItem('token');
        await AsyncStorage.multiRemove([
        'userName',
        'email',
        'password',
        'birthDate',
        'userId',
        'renda',
        'tempRegisterData'
      ]);
      router.replace('/auth/login');
    } catch (error) {
      console.error(error);
      alert('Erro ao fazer logout.');
    }
  }

  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#A3C0AC',
        borderBottomRightRadius: scaled(30),
        borderBottomLeftRadius: scaled(30),
        height: scaled(125),
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: scaled(2) },
        shadowOpacity: 0.4,
        shadowRadius: scaled(2),
        elevation: 3,
        justifyContent: 'center',
      }}
    >
      {showBackButton && (
        <TouchableOpacity
          onPress={() => router.replace({pathname:'/pages/profile',
            params:{fotoUri:fotoUri}
          })}
          style={{
            position: 'absolute',
            top: scaled(50),
            left: scaled(20),
            padding: scaled(8),
            zIndex: 10,
          }}
        >
          <Ionicons name="chevron-back-outline" size={scaled(30)} color="#526471" />
        </TouchableOpacity>
      )}

      {showLogoutButton && (
        <TouchableOpacity
          onPress={handleLogout}
          style={{
            position: 'absolute',
            top: scaled(50),
            right: scaled(20),
            padding: scaled(8),
            zIndex: 10,
          }}
        >
          <Ionicons name="log-out-outline" size={scaled(30)} color="#526471" />
        </TouchableOpacity>
      )}

      {children}
    </View>
  );
}
