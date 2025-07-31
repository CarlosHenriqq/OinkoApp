import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import StepIndicator from 'react-native-step-indicator';
import { Button } from "../../../components/botao";
import Input from "../../../components/input";
import InputCategoria from "../../../components/inputCategoria";
import { API_BASE_URL, ENDPOINTS } from '../../config/api';

export default function RegisterFinance() {
  const labels = ["Dados pessoais", "Dados Financeiros"];
  const [errors, setErrors] = useState({
    renda: '',
    categorias: '',
  });
  const [renda, setRenda] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
    ["Assinaturas", "Alimentação"],
    ["Moradia", "Cartão de crédito"],
    ["Contas do dia a dia", "Outros"],
  ];

  const categoriasWidth = {
    "Dívidas": 95,
    "Transporte": 128,
    "Pets": 70,
    "Saúde": 86,
    "Cuidados Pessoais": 205,
    "Educação": 119,
    "Entretenimento": 175,
    "Assinaturas": 139,
    "Alimentação": 145,
    "Moradia": 102,
    "Cartão de Crédito": 190,
    "Contas do dia a dia": 202,
    "Outros": 91,
  };

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

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

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
  }

  async function handleRegisterFinance() {
    if (!validateForm()) return;

    try {
      const draftFinanceiro = {
        renda,
        selectedCategories,
      };
      await AsyncStorage.setItem('@draftFinanceiro', JSON.stringify(draftFinanceiro));

      const draftCadastroStr = await AsyncStorage.getItem('@draftCadastro');
      if (!draftCadastroStr) {
        Alert.alert('Erro', 'Dados pessoais não encontrados. Por favor, volte e preencha os dados pessoais.');
        router.replace('/auth/register');
        return;
      }
      const draftCadastro = JSON.parse(draftCadastroStr);

      const dataNascimentoSemBarra = draftCadastro.birthDate.replace(/\D/g, '');
      const cleanRenda = Number(renda.replace(/\D/g, ''));

      let userIdStr = await AsyncStorage.getItem('userId');
      let response;

      if (!userIdStr) {
        // Só cria usuário via POST se ainda não existir
        response = await axios.post(`${API_BASE_URL}${ENDPOINTS.REGISTER}`, {
          nome: draftCadastro.name,
          data_nascimento: dataNascimentoSemBarra,
          email: draftCadastro.email,
          senha: draftCadastro.password,
        });
        userIdStr = response.data.id.toString();
        await AsyncStorage.setItem('userId', userIdStr);
      }

      // Salva dados financeiros
      await axios.post(`${API_BASE_URL}${ENDPOINTS.REGISTER_FINANCE}`, {
        usuario_id: Number(userIdStr),
        renda: cleanRenda,
        categorias: selectedCategories,
      });

      await AsyncStorage.removeItem('@draftCadastro');
      await AsyncStorage.removeItem('@draftFinanceiro');
      await AsyncStorage.removeItem('fotoPerfil');
      await AsyncStorage.removeItem('localFotoPerfil');

      Alert.alert('Sucesso', 'Cadastro finalizado com sucesso!');
      router.replace('/pages/userDash');

    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Erro ao salvar informações. Tente novamente.');
    }
  }

  // Carregar rascunho na inicialização
  useEffect(() => {
    const loadDraftFinanceiro = async () => {
      try {
        const draftFinanceiroStr = await AsyncStorage.getItem('@draftFinanceiro');
        if (draftFinanceiroStr) {
          const draftFinanceiro = JSON.parse(draftFinanceiroStr);
          if (draftFinanceiro.renda) setRenda(draftFinanceiro.renda);
          if (draftFinanceiro.selectedCategories) setSelectedCategories(draftFinanceiro.selectedCategories);
        }
      } catch (error) {
        console.error('Erro ao carregar rascunho financeiro:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadDraftFinanceiro();
  }, []);

  // Salvar rascunho somente se tiver dados (evita salvar vazio)
  useEffect(() => {
    const salvarRascunhoFinanceiro = async () => {
      if (renda || selectedCategories.length > 0) {
        const draftFinanceiro = {
          renda,
          selectedCategories,
        };
        await AsyncStorage.setItem('@draftFinanceiro', JSON.stringify(draftFinanceiro));
      }
    };
    salvarRascunhoFinanceiro();
  }, [renda, selectedCategories]);

  if (isLoading) {
    return <Text style={{ textAlign: 'center', marginTop: 50, fontSize: 16 }}>Carregando informações...</Text>;
  }

  return (
    <View style={{ backgroundColor: '#E0E8F9', flex: 1 }}>
      <View style={{ backgroundColor: '#E0E8F9', marginTop: 60 }} >
        <StepIndicator
          customStyles={customStyles}
          currentPosition={1}
          labels={labels}
          stepCount={2}
        />
      </View>
      <View style={styles.container}>
        <View style={{ marginBottom: 25, marginTop: 24 }} >
          <Text style={{ color: '#4A4A4A', fontSize: 34, fontFamily: 'Manrope', fontWeight: "bold", maxWidth: 230, textAlign: 'center' }}>Informações Financeiras</Text>
        </View>
        <View>
          <Input
            placeholder="Quanto é a sua renda?"
            icon="cash-outline"
            value={renda}
            onChangeText={handleChangeRenda}
            error={errors.renda} />
        </View>
        <View style={{ marginBottom: 25 }}>
          <Text style={{ color: '#4A4A4A', fontSize: 20, fontFamily: 'Manrope', fontWeight: "500", maxWidth: 336, textAlign: 'center' }}>
            Quais dessas categorias fazem parte do seu mês? <Text style={{ fontWeight: 'bold' }}>Escolha até 7 </Text>
          </Text>
        </View>
        <View style={{ paddingBottom: 20 }}>
          {categorias.map((row, idx) => (
            <View
              key={idx}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: 13,
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
          {errors.categorias ? <Text style={styles.errorText}>{errors.categorias}</Text> : null}
        </View>
        <View style={{ marginTop: 25, marginBottom: 25 }}>
          <Button title='Finalizar' onPress={() => { if (validateForm()) { handleRegisterFinance(); } }} />
        </View>
      </View>

      <TouchableOpacity onPress={() => router.push('/auth/register')}>
        <Text style={{
          textAlign: 'center',
          fontFamily: 'manrope',
          textDecorationLine: 'underline',
          fontSize: 16,
          fontWeight: '600',
          color: '#4a4a4a'
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
  },
  errorText: {
    color: '#f15757ff',
    fontSize: 13,
    marginTop: 4,
    fontFamily: 'Manrope',
    marginLeft: 8,
    fontWeight: '700',
    textAlign: 'center'
  },
});
