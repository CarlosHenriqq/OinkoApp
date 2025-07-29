import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const { width } = Dimensions.get('window');
const BASE_WIDTH = 390;
const scale = width / BASE_WIDTH;
const scaled = (size: number) => size * scale;

type Subgasto = {
  id: number;
  descricao: string;
  valor: string;
  data: string;
  categoria_id: number;
};

type Props = {
  titulo: string;
  subtituloFechado: string;
  subtituloAberto: string;
  valor: string;
  Imagem: React.FC<React.SVGProps<SVGSVGElement>>;
  subgastos?: Subgasto[];
  onEdit?: (gasto: { id: number; descricao: string; valor: string; data: string; categoria_id: number }) => void;
  onDelete?: (id: number) => void;
};

const GastoCategoriaRelatorio = ({
  titulo,
  subtituloFechado,
  subtituloAberto,
  valor,
  Imagem,
  subgastos = [],
  onEdit,
  onDelete
}: Props) => {
  const [aberto, setAberto] = useState(false);

  return (
    <View style={styles.containerGeral}>
      <View style={[styles.container, aberto && styles.containerAtivo]}>
        <View style={styles.imagemContainer}>
          <Imagem width={scaled(50)} height={scaled(50)} />
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
              <Text style={styles.subgastoNome}>{item.descricao}</Text>

              <View style={styles.subgastoValorEIcones}>
                <View style={styles.valoresContainer}>
                  <Text style={styles.subgastoValor}>{item.valor}</Text>
                  <Text style={styles.subgastoData}>{item.data}</Text>
                </View>

                <View style={styles.iconesContainer}>
                  <TouchableOpacity
                    style={styles.botaoAcao}
                    onPress={() =>
                      onEdit &&
                      onEdit({
                        id: item.id,
                        descricao: item.descricao,
                        valor: item.valor.replace('R$', '').replace(',', '.'),
                        data: item.data,
                        categoria_id: item.categoria_id
                      })
                    }
                  >
                    <Ionicons name="pencil-outline" size={scaled(20)} color="#4A4A4A" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.botaoAcao}
                    onPress={() => onDelete && onDelete(item.id)}
                  >
                    <Ionicons name="trash-outline" size={scaled(20)} color="#cc0000" />
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
    marginBottom: scaled(16),
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scaled(10),
    paddingHorizontal: scaled(10),
    justifyContent: 'space-between',
    maxWidth: scaled(325),
    alignSelf: 'center',
  },
  containerAtivo: {},
  imagemContainer: {
    width: scaled(50),
    height: scaled(50),
    borderRadius: scaled(20),
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
    fontSize: scaled(11),
    color: '#4A4A4A',
    fontFamily: 'Manrope',
    textDecorationLine: 'underline',
  },
  valor: {
    fontSize: scaled(16),
    fontWeight: '600',
    color: '#4A4A4A',
    fontFamily: 'Manrope',
    marginBottom: scaled(15),
    marginRight: scaled(-5),
  },
  listaSubgastos: {
    marginTop: scaled(12),
    paddingHorizontal: scaled(10),
  },
  subgastoItem: {
    marginBottom: scaled(-5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxWidth: scaled(300),
    alignSelf: 'center',
  },
  subgastoNome: {
    fontSize: scaled(14),
    color: '#4A4A4A',
    fontFamily: 'Manrope',
    fontWeight: '600',
    lineHeight: scaled(18),
    flex: 1,
    marginTop: scaled(8),
  },
  subgastoValorEIcones: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  valoresContainer: {
    alignItems: 'flex-end',
    marginRight: scaled(5),
  },
  subgastoValor: {
    fontSize: scaled(16),
    fontWeight: '600',
    color: '#4A4A4A',
    fontFamily: 'Manrope',
    marginTop: scaled(-20),
  },
  subgastoData: {
    fontSize: scaled(14),
    color: '#4A4A4A',
    fontFamily: 'Manrope',
    marginTop: scaled(1),
  },
  iconesContainer: {
    gap: scaled(1),
    marginRight: scaled(-10),
    marginBottom: scaled(20),
  },
  botaoAcao: {
    padding: scaled(4),
  },
});
