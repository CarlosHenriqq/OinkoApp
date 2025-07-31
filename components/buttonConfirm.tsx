import { useState } from 'react';
import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');
const BASE_WIDTH = 390;
const scale = width / BASE_WIDTH;
const scaled = (size: number) => size * scale;

export default function BotaoComConfirmacao({ onConfirm }) {
  const [modalVisible, setModalVisible] = useState(false);

 function handleConfirmar() {
  setModalVisible(false);
  if (onConfirm) onConfirm(); // quem chama decide o que fazer
}


  return (
    <>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={estilos.botaoSalvar}
      >
        <Text style={estilos.textoBotaoSalvar}>
          Salvar alterações
        </Text>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={estilos.overlay}>
          <View style={estilos.card}>
            <Text style={estilos.texto}>
              Você tem certeza que deseja{' '}
              <Text style={{ fontWeight: 'bold' }}>alterar suas informações?</Text>
            </Text>

            <View style={estilos.botoes}>
              <TouchableOpacity
                style={[estilos.botao, { backgroundColor: '#DE7777' }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={estilos.textoBotao}>Não</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[estilos.botao, { backgroundColor: '#A3C0AC' }]}
                onPress={handleConfirmar}
              >
                <Text style={estilos.textoBotao}>Sim</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
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
    paddingHorizontal: scaled(30),
    paddingVertical: scaled(5),
    borderRadius: scaled(30),
  },
  textoBotao: {
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Manrope',
    fontSize: scaled(18),
  },
  botaoSalvar: {
    backgroundColor: '#526471',
    width: scaled(200),
    height: scaled(40),
    borderRadius: scaled(30),
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoBotaoSalvar: {
    color: '#fff',
    fontFamily: 'Manrope',
    fontWeight: '800',
    fontSize: scaled(18),
  },
});
