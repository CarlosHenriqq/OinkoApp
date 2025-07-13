import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: 'bold',
          textTransform: 'uppercase',
          paddingBottom: 4,
        },
        tabBarActiveTintColor: '#A3C0AC',
        tabBarInactiveTintColor: '#4A4A4A',
        tabBarStyle: {
          width: 350,
          alignSelf: 'center',  // aqui é o segredo pra centralizar
          backgroundColor: '#F6F6F6',
          borderRadius: 20,
          height: 65,
          elevation: 10,
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
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bar-chart-outline" color={color} size={25} />
          ),
        }}
      />

      <Tabs.Screen
        name="userDash"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={25} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={25} />
          ),
        }}
      />
    </Tabs>
  );
}
