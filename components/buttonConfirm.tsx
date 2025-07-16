import { router } from 'expo-router';
import { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function BotaoComConfirmacao({onConfirm}) {
  const [modalVisible, setModalVisible] = useState(false);

  function handleConfirmar() {
    setModalVisible(false);
    if(onConfirm) onConfirm();
    router.replace("/pages/profile");
  }

  return (
    <>
      {/* botão principal que abre o modal */}
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={estilos.botaoSalvar}
      >
        <Text style={{ color: '#fff', fontFamily: 'Manrope', fontWeight: '800', fontSize: '18', }}>
          Salvar alterações
        </Text>
      </TouchableOpacity>

      {/* modal de confirmação */}
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
    borderRadius: 20,
    padding: 24,
    width: 330,
    alignItems: 'center',
    gap: 20,
    shadowColor: '#000000',         // cor da sombra
                shadowOffset: { width: 0, height: 2 },  // x e y do Figma
                shadowOpacity: 0.4,          // 10% = 0.1
                shadowRadius: 2,
                elevation: 3,  
  },
  texto: {
    color: '#4A4A4A',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Manrope',
    lineHeight: 25,
  },
  botoes: {
    flexDirection: 'row',
    gap: 20,
    shadowColor: '#000000',         // cor da sombra
                shadowOffset: { width: 0, height: 2 },  // x e y do Figma
                shadowOpacity: 0.4,          // 10% = 0.1
                shadowRadius: 2,  
  },
  botao: {
    paddingHorizontal: 30,
    paddingVertical: 5,
    borderRadius: 30,
  },
  textoBotao: {
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Manrope',
    fontSize: 18,
  },
  botaoSalvar: {
    backgroundColor: '#526471',
    width:200,
    height: 40,
    borderRadius: 30,
    alignItems:'center',
    justifyContent:'center',
  },
});
