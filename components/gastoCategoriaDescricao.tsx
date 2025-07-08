import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  descricao: string;
  valor: string;
  data: string;
  Imagem: React.FC<React.SVGProps<SVGSVGElement>>; // ou simplesmente React.ComponentType<any>
};

const GastoCategoriaDescricao = ({descricao, valor, data, Imagem }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.imagemContainer}>
        <Imagem width={50} height={50} />
      </View>
      <View style={styles.textos}>
        <Text style={styles.descricao} numberOfLines={2} ellipsizeMode="tail">
            {descricao}
            </Text>
      </View>
      <View style={styles.valorContainer}>
        <Text style={styles.valor}>{valor}</Text>
        <Text style={styles.data}>{data}</Text>
      </View>
    </View>
  );
};

/*GastoCategoriaDescricao
            descricao="Uber para o centro da cidade do rio"
            valor="R$ 25,90"
            data="08/07"
            Imagem={Transporte}*/
            
export default GastoCategoriaDescricao;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: 'flex-start',
    marginBottom: 20,
    maxWidth: 312,
    alignSelf: 'center',
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
    marginRight: 20,
  },
  descricao: {
    fontSize: 14,
    fontWeight: '400',
    color: '#4A4A4A',
    fontFamily: 'Manrope',
    maxWidth: 180,
    lineHeight: 15,
  },
  valorContainer: {
    alignItems: 'flex-end',
  },
  valor: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A4A4A',
    fontFamily: 'Manrope',
    marginBottom: -3,
  },
  data: {
    fontSize: 14,
    fontWeight: '400',
    color: '#4A4A4A',
    fontFamily: 'Manrope',
  },
});