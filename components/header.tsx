import { View } from "react-native";

export default function Header(){
    return(
        <View style={{
            position: 'absolute',   // fixa no topo
            top: 0,                 // gruda no topo
            left: 0,                // gruda à esquerda
            right: 0,               // gruda à direita
            backgroundColor: '#A3C0AC',
            borderBottomRightRadius: 30,
            borderBottomLeftRadius: 30,
            height: 160,
                shadowColor: '#000000',         // cor da sombra
                shadowOffset: { width: 0, height: 2 },  // x e y do Figma
                shadowOpacity: 0.4,          // 10% = 0.1
                shadowRadius: 2,  
                elevation: 3,
                   // garante que fique acima dos outros elementos
        }}>
        </View>
    )
}
