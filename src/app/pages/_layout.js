import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: width * 0.025, // equivalente a ~10px em 400px de largura
          fontWeight: 'bold',
          textTransform: 'uppercase',
          paddingBottom: 4,
        },
        tabBarActiveTintColor: '#A3C0AC',
        tabBarInactiveTintColor: '#4A4A4A',
        tabBarStyle: {
          width: '100%',
          backgroundColor: '#F6F6F6',
          height: width < 400 ? 60 : 65, // ligeiro ajuste para telas menores
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: 5 },
          shadowRadius: 10,
          elevation: 3,
        },
      }}
    >
      <Tabs.Screen
        name="relatorio"
        options={{
          title: 'Gastos',
          tabBarIcon: ({ color }) => (
            <Ionicons name="bar-chart-outline" color={color} size={25} />
          ),
        }}
      />
      <Tabs.Screen
        name="userDash"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" color={color} size={25} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-outline" color={color} size={25} />
          ),
        }}
      />
    </Tabs>
  );
}
