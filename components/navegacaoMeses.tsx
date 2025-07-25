import { Ionicons } from '@expo/vector-icons';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');
const ladoBotao = width * 0.22; // equivalente aproximado de 90px em 414px (iPhone 13 Pro Max)

const meses = [
  'Jan', 'Fev', 'Mar', 'Abr',
  'Mai', 'Jun', 'Jul', 'Ago',
  'Set', 'Out', 'Nov', 'Dez'
];

export default function NavegacaoMeses({ mesSelecionado, anoSelecionado, setMesSelecionado, setAnoSelecionado }) {

  const anoAtual = new Date().getFullYear();

  function mesAnterior() {
    let novoIndice = mesSelecionado - 1;
    let novoAno = anoSelecionado;
    if (novoIndice < 0) {
      novoIndice = 11;
      novoAno = anoSelecionado - 1;
    }
    setMesSelecionado(novoIndice);
    setAnoSelecionado(novoAno);
  }

  function proximoMes() {
    let novoIndice = mesSelecionado + 1;
    let novoAno = anoSelecionado;
    if (novoIndice > 11) {
      novoIndice = 0;
      novoAno = anoSelecionado + 1;
    }
    setMesSelecionado(novoIndice);
    setAnoSelecionado(novoAno);
  }

  function formatarAno(ano: number) {
    return ano.toString().slice(-2);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={mesAnterior} style={styles.botaoEsquerda}>
        <Ionicons name="caret-back-outline" size={30} color="#4a4a4a" />
      </TouchableOpacity>

      <Text style={styles.textoMes}>
        {meses[mesSelecionado]}
        {anoSelecionado !== anoAtual ? ` ${formatarAno(anoSelecionado)}` : ''}
      </Text>

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
    left: ladoBotao,
  },
  botaoDireita: {
    position: 'absolute',
    right: ladoBotao,
  },
});
