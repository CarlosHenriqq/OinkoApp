import { Ionicons } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps
} from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  icon: keyof typeof Ionicons.glyphMap; // tipagem correta para nomes de ícones do Ionicons
}

export function ButtonMenor({ title, icon, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity style={styles.button} {...rest}>
      <Ionicons name={icon} siwze={18} color="#ffff" style={styles.icon} />
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row-reverse", // alinha ícone + texto lado a lado
    alignItems: "center",
    gap: 6, // espaçamento entre ícone e texto (React Native >= 0.71)
    width: 115,
    height: 30,
    backgroundColor: "#526471",
    borderRadius: 20,
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  icon: {
    // o align foi removido porque flexDirection já alinha tudo
  },
  text: {
    color: "#ffffff",
    fontFamily: "Manrope",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "800",
  },
});
