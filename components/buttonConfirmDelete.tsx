import { router } from 'expo-router';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
          <Text style={estilos.texto}>{mensagem}<Text style={{fontWeight: 600}}>{mensagem2}</Text></Text>

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
    borderRadius: 20,
    padding: 24,
    width: 330,
    alignItems: 'center',
    gap: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
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
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  botao: {
    width:120,
    paddingVertical: 5,
    borderRadius: 30,
  },
  textoBotao: {
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Manrope',
    fontSize: 18,
    textAlign:'center', 
  },
  botaoSalvar: {
    backgroundColor: '#526471',
    width: 200,
    height: 40,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});