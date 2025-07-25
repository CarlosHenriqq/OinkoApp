import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

const { width } = Dimensions.get('window');
const BASE_WIDTH = 390;
const scale = width / BASE_WIDTH;
const scaled = (size: number) => size * scale;

type Props = {
  titulo: string;
  subtitulo: string;
  valor: string;
  Imagem: React.FC<React.SVGProps<SVGSVGElement>>;
};

const GastoCategoria = ({ titulo, subtitulo, valor, Imagem }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.imagemContainer}>
        <Imagem width={scaled(50)} height={scaled(50)} />
      </View>
      <View style={styles.textos}>
        <Text style={styles.titulo}>{titulo}</Text>
        <Text style={styles.subtitulo}>{subtitulo}</Text>
      </View>
      <Text style={styles.valor}>{valor}</Text>
    </View>
  );
};

export default GastoCategoria;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scaled(12),
    paddingHorizontal: scaled(10),
    borderRadius: scaled(8),
    justifyContent: 'space-between',
    marginBottom: scaled(20),
    maxWidth: scaled(312),
    maxHeight: scaled(50),
    alignSelf: 'center',
  },
  imagemContainer: {
    width: scaled(50),
    height: scaled(50),
    borderRadius: scaled(21),
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scaled(12),
  },
  textos: {
    flex: 1,
  },
  titulo: {
    fontSize: scaled(16),
    fontWeight: '600',
    color: '#4A4A4A',
    fontFamily: 'Manrope',
  },
  subtitulo: {
    fontSize: scaled(12),
    color: '#4A4A4A',
    fontFamily: 'Manrope',
  },
  valor: {
    fontSize: scaled(16),
    fontWeight: '600',
    color: '#4A4A4A',
    fontFamily: 'Manrope',
    marginTop: scaled(-15),
  },
});
