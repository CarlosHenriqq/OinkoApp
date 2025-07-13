import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

const meses = [
  'janeiro', 'fevereiro', 'março', 'abril',
  'maio', 'junho', 'julho', 'agosto',
  'setembro', 'outubro', 'novembro', 'dezembro'
];

export default function NavegacaoMeses() {
  const [indiceMes, setIndiceMes] = useState(new Date().getMonth());

  function mesAnterior() {
    setIndiceMes(prev => (prev === 0 ? 11 : prev - 1));
  }

  function proximoMes() {
    setIndiceMes(prev => (prev === 11 ? 0 : prev + 1));
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={mesAnterior} style={styles.botaoEsquerda}>
        <Ionicons name="caret-back-outline" size={30} color="#4a4a4a" />
      </TouchableOpacity>

      <Text style={styles.textoMes}>{meses[indiceMes]}</Text>

      <TouchableOpacity onPress={proximoMes} style={styles.botaoDireita}>
        <Ionicons name="caret-forward-outline" size={30} color="#4a4a4a" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: width * 0.9,
    height: 50,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoMes: {
    fontFamily: 'Manrope',
    fontSize: 34,
    fontWeight: '800',
    color: '#4a4a4a',
    textTransform: 'capitalize',
  },
  botaoEsquerda: {
    position: 'absolute',
    left: 50,
  },
  botaoDireita: {
    position: 'absolute',
    right: 50,
  },
});
