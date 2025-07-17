import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Subgasto = {
  nome: string;
  valor: string;
  data: string;
};

type Props = {
  titulo: string;
  subtituloFechado: string;
  subtituloAberto: string;
  valor: string;
  Imagem: React.FC<React.SVGProps<SVGSVGElement>>;
  subgastos?: Subgasto[];
};

const GastoCategoriaRelatorio = ({
  titulo,
  subtituloFechado,
  subtituloAberto,
  valor,
  Imagem,
  subgastos = [],
}: Props) => {
  const [aberto, setAberto] = useState(false);

  return (
    <View style={styles.containerGeral}>
      <View style={[styles.container, aberto && styles.containerAtivo]}>
        <View style={styles.imagemContainer}>
          <Imagem width={50} height={50} />
        </View>

        <View style={styles.textos}>
          <View style={styles.topo}>
            <Text style={styles.titulo}>{titulo}</Text>
            <Text style={styles.valor}>{valor}</Text>
          </View>

          <TouchableOpacity
            onPress={() => setAberto(!aberto)}
            activeOpacity={0.7}
          >
            <Text style={styles.subtitulo}>
              {aberto ? subtituloAberto : subtituloFechado}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {aberto && (
        <View style={styles.listaSubgastos}>
          {subgastos.map((item, index) => (
            <View key={index} style={styles.subgastoItem}>
              <Text style={styles.subgastoNome}>{item.nome}</Text>

              <View style={styles.subgastoValorContainer}>
                <Text style={styles.subgastoValor}>{item.valor}</Text>
                <Text style={styles.subgastoData}>{item.data}</Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default GastoCategoriaRelatorio;

const styles = StyleSheet.create({
  containerGeral: {
    marginBottom: 16,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    maxWidth: 325,
    alignSelf: 'center',
  },
  containerAtivo: {},
  imagemContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 7,
  },
  textos: {
    flex: 1,
  },
  topo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 16,
    fontWeight: '500',
    color: '#4A4A4A',
    fontFamily: 'Manrope',
  },
  subtitulo: {
    fontSize: 12,
    color: '#4A4A4A',
    fontFamily: 'Manrope',
    textDecorationLine: 'underline',
    marginTop: -2,
  },
  valor: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4A4A4A',
    fontFamily: 'Manrope',
  },
  listaSubgastos: {
    marginTop: 10,
    paddingHorizontal: 16,
  },
  subgastoItem: {
    position: 'relative',
    paddingRight: 100,
    marginBottom: 20,
    width: 300,
  },
  subgastoNome: {
    fontSize: 14,
    color: '#4A4A4A',
    fontFamily: 'Manrope',
    fontWeight: '600',
    lineHeight: 18,
    height: 40,
    marginLeft:0
  },
  subgastoValorContainer: {
    position: 'absolute',
    right: -3,
    top: 0,
    alignItems: 'flex-end',
    width: 90,
  },
  subgastoValor: {
    fontSize: 16,
    fontWeight: '700',
    color: '#4A4A4A',
    fontFamily: 'Manrope',
  },
  subgastoData: {
    fontSize: 14,
    color: '#4A4A4A',
    fontFamily: 'Manrope',
    marginTop: -3,
  },
});
