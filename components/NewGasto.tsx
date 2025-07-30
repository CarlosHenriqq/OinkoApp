import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { API_BASE_URL, ENDPOINTS } from '../src/config/api';
import { isValidDate } from '../src/config/mask';

const { width: screenWidth } = Dimensions.get('window');

export default function NewGasto({ visible, onClose, onSave, gasto = null }) {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [data, setData] = useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);
  const [errors, setErrors] = useState({
    valor: '',
    data: '',
    descricao: '',
    categoria: ''
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!descricao) {
      newErrors.descricao = 'Descrição é obrigatória';
      isValid = false;
    } else {
      newErrors.descricao = '';
    }

    if (!valor) {
      newErrors.valor = 'Valor é obrigatório';
      isValid = false;
    } else {
      newErrors.valor = '';
    }

    if (!data) {
      newErrors.data = 'Data é obrigatória';
      isValid = false;
    } else if (!isValidDate(data)) {
      newErrors.data = 'Data inválida';
      isValid = false;
    } else {
      newErrors.data = '';
    }
    if (!value) {
      newErrors.categoria = 'Por favor, selecione uma categoria';
      isValid = false;
    } else {
      newErrors.categoria = '';
    }

    setErrors(newErrors);
    return isValid;
  };

  useEffect(() => {
    async function buscarCategorias() {
      const userIdStr = await AsyncStorage.getItem('userId');
      const userId = userIdStr ? Number(userIdStr) : null;
      try {
        const response = await axios.get(`${API_BASE_URL}${ENDPOINTS.CATEGORIA_POR_USUARIO}`, {
          headers: { usuario_id: userId },
        });
        const categoriasFormatadas = response.data.map((categoria) => ({
          label: categoria.nome,
          value: categoria.id,
        }));
        setItems(categoriasFormatadas);
      } catch (error) {
        console.error('Erro ao buscar categorias:', error.message);
      }
    }

    if (visible) {
      buscarCategorias();
    }
  }, [visible]);

  function formatarDataParaInput(data) {
    if (!data) return '';
    if (data.includes('-')) {
      const [ano, mes, dia] = data.split('-');
      return `${dia}/${mes}/${ano}`;
    } else if (data.includes('/')) {
      return data;
    }
    return '';
  }

  useEffect(() => {
    if (visible) {
      if (gasto) {
        setDescricao(gasto.descricao || '');
        setValor(
          gasto.valor
            ? gasto.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
            : ''
        );
        setData(formatarDataParaInput(gasto.data));
      } else {
        setDescricao('');
        setValor('');
        setData('');
        setValue(null);
      }
      setErrors({ valor: '', data: '', descricao: '' }); // Limpar erros ao abrir
    }
  }, [visible, gasto]);

  useEffect(() => {
    if (gasto && items.length > 0) {
      const categoriaExistente = items.find(item => item.value === gasto.categoria_id);
      if (categoriaExistente) {
        setValue(categoriaExistente.value);
      } else {
        setValue(null);
      }
    }
  }, [gasto, items]);

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
    let cleanText = text.replace(/\D/g, '');
    if (cleanText.length > 8) cleanText = cleanText.slice(0, 8);
    if (cleanText.length >= 5) {
      return `${cleanText.slice(0, 2)}/${cleanText.slice(2, 4)}/${cleanText.slice(4)}`;
    } else if (cleanText.length >= 3) {
      return `${cleanText.slice(0, 2)}/${cleanText.slice(2)}`;
    } else {
      return cleanText;
    }
  }

  function handleChangeData(text) {
    const formatted = formatDate(text);
    setData(formatted);
  }

  function formatDateToISO(dateStr) {
    const [day, month, year] = dateStr.split('/');
    if (!day || !month || !year) return null;
    if (day.length !== 2 || month.length !== 2 || year.length !== 4) return null;
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }

  async function handleSalvar() {
    if (!validateForm()) return;

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
      if (gasto && gasto.id) {
        await axios.put(`${API_BASE_URL}${ENDPOINTS.GASTOS_UPDATE}/${gasto.id}`, gastoPayload, {
          headers: { usuario_id: userId },
        });
      } else {
        await axios.post(`${API_BASE_URL}${ENDPOINTS.GASTOS}`, gastoPayload, {
          headers: { usuario_id: userId },
        });
      }
      onSave();
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
            placeholderTextColor="#A3C0AC"
            style={[styles.input, errors.descricao ? styles.inputError : null]}
            value={descricao}
            onChangeText={setDescricao}
          />
          {errors.descricao ? <Text style={styles.errorText}>{errors.descricao}</Text> : null}

          <View style={styles.row}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <TextInput
                placeholder="R$0,00"
                placeholderTextColor="#A3C0AC"
                style={[styles.input, errors.valor ? styles.inputError : null]}
                value={valor}
                onChangeText={handleChangeValor}
                keyboardType="numeric"
              />
              {errors.valor ? <Text style={styles.errorText}>{errors.valor}</Text> : null}
            </View>

            <View style={{ flex: 1 }}>
              <TextInput
                placeholder="01/01/2025"
                placeholderTextColor="#A3C0AC"
                style={[styles.input, errors.data ? styles.inputError : null]}
                value={data}
                onChangeText={handleChangeData}
                keyboardType="numeric"
                maxLength={10}
              />
              {errors.data ? <Text style={styles.errorText}>{errors.data}</Text> : null}
            </View>
          </View>

          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder="Selecione a categoria"
            disabled={!!gasto}
            listMode="SCROLLVIEW"
            dropDownDirection="BOTTOM"
            style={styles.dropdown}
            textStyle={styles.dropdownText}
            placeholderStyle={styles.dropdownPlaceholder}
            dropDownContainerStyle={styles.dropdownContainer}
            arrowIconStyle={{ height: 25 }}
            showArrowIcon={!gasto}
          />
          {errors.categoria ? <Text style={[styles.errorText, {marginTop:-15}]}>{errors.categoria}</Text> : null}


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
    width: screenWidth * 0.8,
    backgroundColor: '#E0E8F9',
    padding: 20,
    borderRadius: 20,
    position: 'relative',
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
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
    marginBottom: 4,
    fontSize: 18,
    fontFamily: 'Manrope',
    fontWeight: '600',
    color: '#4A4A4A',
  },
  
  errorText: {
    color: '#f15757ff',
    fontSize: 12,
    marginBottom: 8,
    fontFamily: 'Manrope',
    paddingLeft:10
  },
  row: {
    flexDirection: 'row',
  },
  saveButton: {
    backgroundColor: '#526471',
    width: '60%',
    height: 40,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  saveButtonText: {
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Manrope',
    fontSize: 18,
  },
  dropdown: {
    backgroundColor: '#fff',
    borderWidth: 3,
    borderColor: '#A3C0AC',
    borderRadius: 15,
    height: 40,
    paddingHorizontal: 10,
    marginBottom: 30,
  },
  dropdownText: {
    fontFamily: 'Manrope',
    color: '#4A4A4A',
    fontWeight: 'bold',
    fontSize: 18,
  },
  dropdownPlaceholder: {
    color: '#A3C0AC',
    fontWeight: 'bold',
  },
  dropdownContainer: {
    borderColor: '#A3C0AC',
    borderRadius: 15,
    borderTopWidth: 1,
    borderWidth: 3,
  },
});
