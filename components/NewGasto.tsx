import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

export default function Newgasto({ visible, onClose, onSave }) {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [data, setData] = useState('');
  const [categoria, setCategoria] = useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function buscarCategorias() {
      const userIdStr = await AsyncStorage.getItem('userId');
      const userId = userIdStr ? Number(userIdStr) : null;
      try {
        const response = await axios.get('http://192.168.1.110:3000/auth/categoriasSelecionadas', {
          headers: { usuario_id: userId },
        });
        const categoriasFormatadas = response.data.map((categoria) => ({
          label: categoria.nome,
          value: categoria.id,
        }));
        setItems(categoriasFormatadas);
      } catch (error) {
        console.error('Erro ao buscar categorias:', error.message);
        if (error.response) {
          console.error('Resposta do servidor:', error.response.data);
        }
      }
    }

    if (visible) {
      buscarCategorias();
    }
  }, [visible]);

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
      return `${cleanText.slice(0, 2)}/${cleanText.slice(2, 4)}/${cleanText.slice(4)}`;
    } else if (cleanText.length >= 3) {
      return `${cleanText.slice(0, 2)}/${cleanText.slice(2)}`;
    } else {
      return cleanText;
    }
  }

  function handleChangeData(Text) {
    const formatted = formatDate(Text);
    setData(formatted);
  }

  // Função para converter "dd/mm/yyyy" para "yyyy-mm-dd"
  function formatDateToISO(dateStr) {
    const [day, month, year] = dateStr.split('/');
    if (!day || !month || !year) return null;

    // Validação simples para números e tamanho correto
    if (
      day.length !== 2 ||
      month.length !== 2 ||
      year.length !== 4 ||
      isNaN(Number(day)) ||
      isNaN(Number(month)) ||
      isNaN(Number(year))
    ) {
      return null;
    }

    // Verificar se a data é válida (exemplo básico)
    const dayNum = Number(day);
    const monthNum = Number(month);
    const yearNum = Number(year);
    if (monthNum < 1 || monthNum > 12) return null;
    if (dayNum < 1 || dayNum > 31) return null; // Pode melhorar aqui para meses específicos

    // Monta no formato ISO
    return `${year.padStart(4, '0')}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }

  useEffect(() => {
    if (visible) {
      setDescricao('');
      setValor('');
      setData('');
      setCategoria('');
      setValue(null);
    }
  }, [visible]);

  async function handleSalvar() {
    try {
      const userIdStr = await AsyncStorage.getItem('userId');
      const userId = userIdStr ? Number(userIdStr) : null;
      const valorNumerico = Number(valor.replace(/\D/g, '')) / 100;

      const dataISO = formatDateToISO(data);
      if (!dataISO) {
        alert('Data inválida. Use o formato dd/mm/yyyy');
        return;
      }

      const gastoPayload = {
        categoria_id: value,
        valor: valorNumerico,
        data: dataISO,
        descricao: descricao,
      };

      const response = await axios.post('http://192.168.1.110:3000/expenses/gastos', gastoPayload, {
        headers: {
          usuario_id: userId,
        },
      });

      onSave(response.data);

      setDescricao('');
      setValor('');
      setData('');
      setValue(null);
      onClose();
    } catch (error) {
      console.error('Erro ao salvar gasto:', error);
      alert('Erro ao salvar gasto.');
    }
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
            placeholderTextColor={'#A3C0AC'}
            style={styles.input}
            value={descricao}
            onChangeText={setDescricao}
          />

          <View style={styles.row}>
            <TextInput
              placeholder="R$0,00"
              placeholderTextColor={'#A3C0AC'}
              style={[styles.input, { flex: 1, marginRight: 8 }]}
              value={valor}
              onChangeText={handleChangeValor}
              keyboardType="numeric"
            />
            <TextInput
              placeholder="01/01/2025"
              placeholderTextColor={'#A3C0AC'}
              style={[styles.input, { flex: 1 }]}
              value={data}
              onChangeText={handleChangeData}
              keyboardType="numeric"
              maxLength={10}
            />
          </View>

          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder="Selecione a categoria"
            style={{
              backgroundColor: '#ffff',
              borderWidth: 3,
              borderColor: '#A3C0AC',
              borderRadius: 15,
              height: 40,
              paddingHorizontal: 10,
              marginBottom: 30,
              shadowColor: '#000000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.4,
              shadowRadius: 2,
              elevation: 3,
            }}
            textStyle={{
              fontFamily: 'Manrope',
              color: '#A3C0AC',
              fontWeight: 'bold',
              fontSize: 18,
            }}
            placeholderStyle={{
              color: '#A3C0AC',
              fontWeight: 'bold',
            }}
            dropDownContainerStyle={{
              borderColor: '#A3C0AC',
              borderRadius: 15,
              borderTopWidth: 1,
              borderWidth: 3,
            }}
            arrowIconStyle={{
              height: 25,
            }}
            showArrowIcon={true}
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 3,
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
    fontFamily: 'Manrope',
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
    fontFamily: 'Manrope',
    fontWeight: '600',
    color: '#4A4A4A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 3,
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 3,
  },
  saveButtonText: {
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Manrope',
    fontSize: 18,
  },
});
