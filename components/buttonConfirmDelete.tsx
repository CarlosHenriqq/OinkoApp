import { router } from 'expo-router';
import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');
const BASE_WIDTH = 390;
const scale = width / BASE_WIDTH;
const scaled = (size: number) => size * scale;

export default function BotaoComConfirmacaoDelete({
  visible,
  onConfirm,
  onCancel,
  titulo = "Confirmação",
  mensagem = "Você tem certeza que deseja continuar?",
  mensagem2 = "Você tem certeza que deseja continuar?",
  textoBotaoConfirmar = "Sim",
  textoBotaoCancelar = "Não",
}) {
  function handleConfirmar() {
    if (onConfirm) onConfirm();
    router.replace("/pages/relatorio");
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}
    >
      <View style={estilos.overlay}>
        <View style={estilos.card}>
          <Text style={estilos.texto}>
            {mensagem}
            <Text style={{ fontWeight: '600' }}>{mensagem2}</Text>
          </Text>

          <View style={estilos.botoes}>
            <TouchableOpacity
              style={[estilos.botao, { backgroundColor: '#DE7777' }]}
              onPress={onCancel}
            >
              <Text style={estilos.textoBotao}>{textoBotaoCancelar}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[estilos.botao, { backgroundColor: '#A3C0AC' }]}
              onPress={handleConfirmar}
            >
              <Text style={estilos.textoBotao}>{textoBotaoConfirmar}</Text>
            </TouchableOpacity>
          </View>
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
  },
  card: {
    backgroundColor: '#e0e8f9',
    borderRadius: scaled(20),
    padding: scaled(24),
    width: scaled(330),
    alignItems: 'center',
    gap: scaled(20),
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: scaled(2) },
    shadowOpacity: 0.4,
    shadowRadius: scaled(2),
    elevation: 3,
  },
  texto: {
    color: '#4A4A4A',
    fontSize: scaled(20),
    textAlign: 'center',
    fontFamily: 'Manrope',
    lineHeight: scaled(25),
  },
  botoes: {
    flexDirection: 'row',
    gap: scaled(20),
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: scaled(2) },
    shadowOpacity: 0.4,
    shadowRadius: scaled(2),
  },
  botao: {
    width: scaled(120),
    paddingVertical: scaled(5),
    borderRadius: scaled(30),
  },
  textoBotao: {
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Manrope',
    fontSize: scaled(18),
    textAlign: 'center',
  },
  botaoSalvar: {
    backgroundColor: '#526471',
    width: scaled(200),
    height: scaled(40),
    borderRadius: scaled(30),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
