import { Ionicons } from '@expo/vector-icons';
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
          <Text style={styles.titulo}>{titulo}</Text>
          <TouchableOpacity
            onPress={() => setAberto(!aberto)}
            activeOpacity={0.7}
          >
            <Text style={styles.subtitulo}>
              {aberto ? subtituloAberto : subtituloFechado}
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.valor}>{valor}</Text>
      </View>

      {aberto && (
        <View style={styles.listaSubgastos}>
          {subgastos.map((item, index) => (
            <View key={index} style={styles.subgastoItem}>
              <Text style={styles.subgastoNome}>{item.nome}</Text>

              <View style={styles.subgastoValorEIcones}>
                <View style={styles.valoresContainer}>
                  <Text style={styles.subgastoValor}>{item.valor}</Text>
                  <Text style={styles.subgastoData}>{item.data}</Text>
                </View>

                <View style={styles.iconesContainer}>
                  <TouchableOpacity
                    style={styles.botaoAcao}
                    onPress={() => console.log('Editar', item)}
                  >
                    <Ionicons name="pencil-outline" size={20} color="#4A4A4A" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.botaoAcao}
                    onPress={() => console.log('Apagar', item)}
                  >
                    <Ionicons name="trash-outline" size={20} color="#cc0000" />
                  </TouchableOpacity>
                </View>
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
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textos: {
    flex: 1,
  },
  titulo: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A4A4A',
    fontFamily: 'Manrope',
  },
  subtitulo: {
    fontSize: 11,
    color: '#4A4A4A',
    fontFamily: 'Manrope',
    textDecorationLine: 'underline',
    marginTop: 2,
  },
  valor: {
    fontSize: 20,
    fontWeight: '700',
    color: '#4A4A4A',
    fontFamily: 'Manrope',
    marginBottom: 15,
    marginRight: -5,
  },
  listaSubgastos: {
    marginTop: 12,
    paddingHorizontal: 10,
  },
  subgastoItem: {
    marginBottom: -5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxWidth: 300,
    alignSelf: 'center',
  },
  subgastoNome: {
    fontSize: 14,
    color: '#4A4A4A',
    fontFamily: 'Manrope',
    fontWeight: '600',
    lineHeight: 18,
    flex: 1,
    marginTop: 8,
  },
  subgastoValorEIcones: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  valoresContainer: {
    alignItems: 'flex-end',
    marginRight: 5,
  },
  subgastoValor: {
    fontSize: 16,
    fontWeight: '700',
    color: '#4A4A4A',
    fontFamily: 'Manrope',
    marginTop:-20,
  },
  subgastoData: {
    fontSize: 14,
    color: '#4A4A4A',
    fontFamily: 'Manrope',
    marginTop: 1,
  },
  iconesContainer: {
    gap: 1,
    marginRight:-10,
     marginBottom:20,
  },
  botaoAcao: {
    padding: 4,
  },
});
