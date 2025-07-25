import { Ionicons } from "@expo/vector-icons";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps
} from "react-native";

const { width } = Dimensions.get("window");
const BASE_WIDTH = 390; // base do seu design atual
const scale = width / BASE_WIDTH;
const scaled = (size: number) => size * scale;

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
}

export function ButtonMenor({ title, icon, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity style={styles.button} {...rest}>
      <Ionicons name={icon} size={scaled(18)} color="#ffffff" style={styles.icon} />
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: scaled(6),
    width: scaled(115),
    height: scaled(30),
    backgroundColor: "#526471",
    borderRadius: scaled(20),
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: scaled(2) },
    shadowOpacity: 0.4,
    shadowRadius: scaled(2),
    elevation: 3,
  },
  icon: {
    // nenhum estilo específico aqui por enquanto
  },
  text: {
    color: "#ffffff",
    fontFamily: "Manrope",
    fontSize: scaled(18),
    textAlign: "center",
    fontWeight: "800",
  },
});
