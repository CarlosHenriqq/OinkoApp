import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import { TouchableOpacity, View } from "react-native";

interface HeaderProfileProps {
  children?: React.ReactNode;
  showBackButton?: boolean;
}

export default function HeaderProfile({ children, showBackButton = false }: HeaderProfileProps) {
  const navigation = useNavigation();

  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#A3C0AC',
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
        height: 125,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
        elevation: 3,
        justifyContent: 'center',
      }}
    >
      {showBackButton && (
        <TouchableOpacity
          onPress={() => router.replace("/pages/profile")}
          style={{
            position: 'absolute',
            top: 50,
            left: 20,
            padding: 8,
            zIndex: 10,
          }}
        >
          <Ionicons name="chevron-back-outline" size={30} color="#526471" />
        </TouchableOpacity>
      )}

      {children}
    </View>
  );
}
