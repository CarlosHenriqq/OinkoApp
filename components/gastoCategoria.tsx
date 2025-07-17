import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  titulo: string;
  subtitulo: string;
  valor: string;
  Imagem: React.FC<React.SVGProps<SVGSVGElement>>; // ou simplesmente React.ComponentType<any>
};

const GastoCategoria = ({ titulo, subtitulo, valor, Imagem }: Props) => {
  return (
    <View style={styles.container}>
      <View style={[styles.imagemContainer,]}>
        <Imagem width={50} height={50} />
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
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: 'space-between',
    marginBottom: 8,
    maxWidth: 312,
    maxHeight:50,
    alignSelf: 'center',
    marginBottom: 20,
    
  },
  imagemContainer: {
    width: 50,
    height: 50,
    borderRadius: 21,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textos: {
    flex: 1,
  },
  titulo: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4A4A4A',
    fontFamily:'Manrope',
  },
  subtitulo: {
    fontSize: 12,
    color: '#4A4A4A',
    fontFamily:'Manrope',
  },
  valor: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A4A4A',
    fontFamily:'Manrope',
    marginTop: -15,
  },
});
