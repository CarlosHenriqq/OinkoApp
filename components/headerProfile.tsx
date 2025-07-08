import { View } from "react-native";

interface HeaderProfileProps {
  children?: React.ReactNode;
}

export default function HeaderProfile({ children }: HeaderProfileProps) {
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
            shadowColor: '#000000',         // cor da sombra
            shadowOffset: { width: 0, height: 2 },  // x e y do Figma
            shadowOpacity: 0.4,          // 10% = 0.1
            shadowRadius: 2,  
      }}
    >
      {children}
    </View>
  );
}
