import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');
const BASE_WIDTH = 390;
const scale = width / BASE_WIDTH;
const scaled = (size: number) => size * scale;

interface ToastAlertaProps {
  tipo: 'sucesso' | 'erro';
  mensagem: string;
  visivel: boolean;
  aoFechar: () => void;
}

export default function ToastAlerta({ tipo, mensagem, visivel, aoFechar }: ToastAlertaProps) {
  const corTexto = tipo === 'sucesso' ? '#A3C0AC' : '#f15757ff';

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visivel}
      onRequestClose={aoFechar}
    >
      <View style={estilos.overlay}>
        <View style={[estilos.card, { backgroundColor: '#e0e8f9' }]}>
          <Text style={[estilos.texto, {color:corTexto}]}>{mensagem}</Text>
          <TouchableOpacity
            onPress={aoFechar}
            style={[estilos.botao, { backgroundColor: '#526471' }]}
          >
            <Text style={estilos.textoBotao}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const estilos = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex:9999
  },
  card: {
    borderRadius: scaled(10),
    padding: scaled(20),
    width: scaled(260),
    alignItems: 'center',
    gap: scaled(15),
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: scaled(2) },
    shadowOpacity: 0.4,
    shadowRadius: scaled(2),
    elevation: 3,
  },
  texto: {
    color: '#ffffff',
    fontSize: scaled(18),
    textAlign: 'center',
    fontFamily: 'Manrope',
    fontWeight:700
  },
  botao: {
    paddingHorizontal: scaled(30),
    paddingVertical: scaled(8),
    borderRadius: scaled(30),
  },
  textoBotao: {
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Manrope',
    fontSize: scaled(16),
  },
});
