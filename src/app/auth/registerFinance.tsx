import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { router } from "expo-router";
import { useState } from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import StepIndicator from 'react-native-step-indicator';
import { Button } from "../../../components/botao";
import Input from "../../../components/input";
import InputCategoria from "../../../components/inputCategoria";
import { API_BASE_URL, ENDPOINTS } from '../../config/api';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function RegisterFinance() {
  const labels = ["Dados pessoais", "Dados Financeiros"];
  const [errors, setErrors] = useState({
    renda: '',
    categorias: '',
  });

  const customStyles = {
    stepIndicatorSize: 20,
    currentStepIndicatorSize: 24,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#A3C0AC',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#A3C0AC',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#A3C0AC',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#A3C0AC',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#A3C0AC',
    stepIndicatorLabelFontSize: 12,
    currentStepIndicatorLabelFontSize: 12,
    stepIndicatorLabelCurrentColor: '#ffffff',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: '#A3C0AC'
  };

  const categorias = [
    ["Dívidas", "Transporte", "Pets"],
    ["Saúde", "Cuidados Pessoais"],
    ["Educação", "Entretenimento"],
    ["Assinatura", "Alimentação"],
    ["Moradia", "Cartão de crédito"],
    ["Contas do dia a dia", "Outros"],
  ];

  const categoriasWidth = {
    "Dívidas": 93,
    "Transporte": 126,
    "Pets": 68,
    "Saúde": 84,
    "Cuidados Pessoais": 197,
    "Educação": 114,
    "Entretenimento": 170,
    "Assinatura": 135,
    "Alimentação": 141,
    "Moradia": 100,
    "Cartão de crédito": 188,
    "Contas do dia a dia": 200,
    "Outros": 89,
  };

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [renda, setRenda] = useState('');

  function formatCurrency(value: string) {
    const cleanValue = value.replace(/\D/g, '');
    const number = parseFloat(cleanValue) / 100;
    if (isNaN(number)) return '';
    return number.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }

  function handleChangeRenda(text: string) {
    setRenda(formatCurrency(text));
  }

  function handleToggleCategory(category: string) {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(prev => prev.filter(c => c !== category));
    } else {
      if (selectedCategories.length < 7) {
        setSelectedCategories(prev => [...prev, category]);
      }
    }
  }

    async function handleRegisterFinance() {
    if (!validateForm()) return;
    try {
        

        let userIdStr = await AsyncStorage.getItem('userId');
        let userId = userIdStr ? Number(userIdStr) : 'null';

        let nome = await AsyncStorage.getItem('userName') || '';
        let email = await AsyncStorage.getItem('email') || '';
        const dataNascimento = null; // ajustar se desejar solicitar antes

        if (!userId) {
            // Cria usuário no banco caso venha do Clerk (Google)
            const response = await axios.post(`${API_BASE_URL}${ENDPOINTS.REGISTER}`, {
                nome,
                email,
                senha: '', // senha vazia pois é login social
                data_nascimento: dataNascimento,
            });

            userId = response.data.id;
            await AsyncStorage.setItem('userId', userId.toString());
        }

        const cleanRenda = Number(renda.replace(/\D/g, ''));

        await axios.post(`${API_BASE_URL}${ENDPOINTS.REGISTER_FINANCE}`, {
            usuario_id: userId,
            renda: cleanRenda,
            categorias: selectedCategories,
        });

        await AsyncStorage.setItem('renda', cleanRenda.toString());

        Alert.alert('Sucesso', 'Informações financeiras salvas com sucesso!');

        // Checar se nome ou email estão vazios, indicando necessidade de completar perfil
        if (!nome || !email) {
            router.replace('/profileEdit');
        } else {
            router.replace('/auth/pages/userDash');
        }

    } catch (error) {
        console.error(error);
        Alert.alert('Erro', 'Erro ao salvar informações. Tente novamente.');
    } 
}
const validateForm = () => {
  let isValid = true;
  const newErrors = {...errors};

    if (!renda) {
      newErrors.renda = 'Valor deve ser maior que R$0,00';
      isValid = false;
    } else {
      newErrors.renda = '';
    }

    if (selectedCategories.length === 0) {
      newErrors.categorias = 'Por favor, selecione ao menos 1 categoria';
      isValid = false;
    } else {
      newErrors.categorias = '';
    }

    setErrors(newErrors);
    return isValid;
  };

  return (
    <View style={{ backgroundColor: '#E0E8F9', flex: 1 }}>
      <View style={{ backgroundColor: '#E0E8F9', marginTop: 60 }}>
        <StepIndicator
          customStyles={customStyles}
          currentPosition={1}
          labels={labels}
          stepCount={2}
        />
      </View>

      <View style={styles.container}>
        <View style={{ marginBottom: 25, marginTop: 24, paddingHorizontal: 20 }}>
          <Text style={{
            color: '#4A4A4A',
            fontSize: 34,
            fontFamily: 'Manrope',
            fontWeight: "bold",
            maxWidth: SCREEN_WIDTH * 0.75,
            textAlign: 'center'
          }}>
            Informações Financeiras
          </Text>
        </View>

        <Input
          placeholder="Quanto é a sua renda?"
          icon="cash-outline"
          value={renda}
          onChangeText={handleChangeRenda}
          error={errors.renda}
        />

        <View style={{ marginBottom: 25, paddingHorizontal: 20 }}>
          <Text style={{
            color: '#4A4A4A',
            fontSize: 20,
            fontFamily: 'Manrope',
            fontWeight: "600",
            textAlign: 'center'
          }}>
            Quais dessas categorias fazem parte do seu mês? <Text style={{ fontWeight: 'bold' }}>Escolha até 7</Text>
          </Text>
        </View>

        <View style={{ paddingBottom: 20 }}>
          {categorias.map((row, idx) => (
            <View
              key={idx}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 10,
                paddingHorizontal: 12,
                marginBottom: 5
              }}
            >
              {row.map((cat) => (
                <InputCategoria
                  key={cat}
                  title={cat}
                  width={categoriasWidth[cat]}
                  isSelected={selectedCategories.includes(cat)}
                  onPress={() => handleToggleCategory(cat)}
                  backgroundColorSelect='#A3C0AC'
                  backgroundColorUnSelect='#ffff'
                  borderColorSelect='#A3C0AC'
                  borderColorUnSelect='#A3C0AC'
                  textUnselect='#A3C0AC'
                />
              ))}
            </View>
          ))}
          {errors?.categorias ? <Text style={styles.errorText}>{errors.categorias}</Text> : null}
        </View>

        <View style={{ marginTop: 10, marginBottom: 30 }}>
          <Button title='Finalizar' onPress={() => { if (validateForm()) { handleRegisterFinance() } }} />
        </View>
      </View>

      <TouchableOpacity onPress={() => router.push('/auth/register')}>
        <Text style={{
          textAlign: 'center',
          fontFamily: 'manrope',
          textDecorationLine: 'underline',
          fontSize: 16,
          fontWeight: '600',
          color: '#4a4a4a',
          marginBottom: 25
        }}>
          Voltar para a tela anterior
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E0E8F9',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  errorText: {
    color: '#FF0000',
    fontSize: 13,
    marginTop: 4,
    fontFamily: 'Manrope',
    marginLeft: 8,
    fontWeight: '700',
    textAlign: 'center'
  },
});
