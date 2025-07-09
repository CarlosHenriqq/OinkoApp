import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import {
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function Newgasto({ visible, onClose, onSave }) {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [data, setData] = useState('');
  const [categoria, setCategoria] = useState('');

  function formatMoney(text) {
    let cleanText = text.replace(/\D/g, '');
    let num = Number(cleanText) / 100;
    if (isNaN(num)) return '';
    return num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  function handleChangeValor(text) {
    const formatted = formatMoney(text);
    setValor(formatted);
  }

  function formatDate(text) {
    // Remove tudo que não for número
    let cleanText = text.replace(/\D/g, '');

    if (cleanText.length > 8) {
      cleanText = cleanText.slice(0, 8);
    }

    // Formata dd/mm/yyyy enquanto digita
    if (cleanText.length >= 5) {
      return `${cleanText.slice(0,2)}/${cleanText.slice(2,4)}/${cleanText.slice(4)}`;
    } else if (cleanText.length >= 3) {
      return `${cleanText.slice(0,2)}/${cleanText.slice(2)}`;
    } else {
      return cleanText;
    }
  }

  function handleChangeData(Text) {
    const formatted = formatDate(Text);
    setData(formatted);
  }

  useEffect(() => {
  if (visible) {
    setDescricao('');
    setValor('');
    setData('');
    setCategoria('');
  }
}, [visible]);

function handleSalvar() {
  onSave({ descricao, valor, data, categoria });
  setDescricao('');
  setValor('');
  setData('');
  setCategoria('');
  onClose();
  }

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={20} color="#4A4A4A" />
          </TouchableOpacity>

          <Text style={styles.title}>Informações sobre o gasto</Text>

          <TextInput
            placeholder="Descrição do gasto"
            style={styles.input}
            value={descricao}
            onChangeText={setDescricao}
          />

          <View style={styles.row}>
            <TextInput
              placeholder="R$0,00"
              style={[styles.input, { flex: 1, marginRight: 8 }]}
              value={valor}
              onChangeText={handleChangeValor}
              keyboardType="numeric"
            />
            <TextInput
              placeholder="01/01/2025"
              style={[styles.input, { flex: 1 }]}
              value={data}
              onChangeText={handleChangeData}
              keyboardType="numeric"
              maxLength={10}
            />
          </View>

          <TextInput
            placeholder="Selecione a categoria"
            style={styles.input}
            value={categoria}
            onChangeText={setCategoria}
          />

          <TouchableOpacity style={styles.saveButton} onPress={handleSalvar}>
            <Text style={styles.saveButtonText}>Salvar gasto</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: 330,
    backgroundColor: '#E0E8F9',
    padding: 20,
    borderRadius: 20,
    elevation: 4,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#4A4A4A',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 3,
    borderColor: '#A3C0AC',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 12,
    fontSize: 18,
    fontWeight: '600',
    color: '#4A4A4A',
  },
  row: {
    flexDirection: 'row',
  },
  saveButton: {
    backgroundColor: '#4A4A4A',
    width: 200,
    height: 40,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    alignSelf: 'center',
  },
  saveButtonText: {
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Manrope',
    fontSize: 18,
  },
});
