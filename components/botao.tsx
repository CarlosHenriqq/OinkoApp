import { Dimensions, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

const { width } = Dimensions.get('window');
const BASE_WIDTH = 390; // largura de referência do seu design
const scale = width / BASE_WIDTH;
const scaled = (size: number) => size * scale;

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

export function Button({ title, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity style={styles.button} {...rest}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: scaled(200),
    height: scaled(40),
    backgroundColor: '#526471',
    borderRadius: scaled(20),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: scaled(2) },
    shadowOpacity: 0.4,
    shadowRadius: scaled(2),
    elevation: 3,
  },
  text: {
    color: '#ffffff',
    fontFamily: 'Manrope',
    fontSize: scaled(18),
    textAlign: 'center',
    fontWeight: '800',
  }
});
