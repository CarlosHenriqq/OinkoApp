import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import StepIndicator from 'react-native-step-indicator';
import { Button } from "../../../components/botao";
import Input from "../../../components/input";
import InputCategoria from "../../../components/inputCategoria";
import ToastAlerta from '../../../components/toast';
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

  // Novos estados para dados pessoais carregados do AsyncStorage
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState<string | null>(null);
  const [toastVisivel, setToastVisivel] = useState(false);
  const [tipo, setTipo] = useState<'sucesso' | 'erro'>('sucesso');
  const [mensagem, setMensagem] = useState('');

  function mostrarToast(texto: string, tipoAlerta: 'sucesso' | 'erro') {
    setMensagem(texto);
    setTipo(tipoAlerta);
    setToastVisivel(true);

    setTimeout(() => {
      setToastVisivel(false);
    }, 3000);
  }
  function esconderToast() {
    setToastVisivel(false);
  }

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
    "Assinatura": 139,
    "Alimentação": 145,
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
        mostrarToast('Dados não encontrados, por favor tente novamente', 'erro');
        router.replace('/auth/register');
        return;
      }
      const draftCadastro = JSON.parse(draftCadastroStr);

      const dataNascimentoSemBarra = draftCadastro.birthDate?.replace(/\D/g, '') || '';
      const cleanRenda = Number(renda.replace(/\D/g, ''));

      // Aqui pega os dois IDs
      const userIdStr = await AsyncStorage.getItem('userId');
      const clerkIdStr = await AsyncStorage.getItem('clerk_id');

      if (!userIdStr && !clerkIdStr) {
        mostrarToast('Usuário não autenticado, por favor tente novamente', 'erro');
        router.replace('/auth/login');
        return;
      }

      const payload = {
        usuario_id: userIdStr ? Number(userIdStr) : null,
        clerk_id: clerkIdStr || null,
        nome: draftCadastro.name || (await AsyncStorage.getItem('userName')) || null,
        email: draftCadastro.email || (await AsyncStorage.getItem('email')) || null,
        renda: cleanRenda,
        categorias: selectedCategories,
      };
      console.log('Payload enviado:', payload);

      await axios.post(`${API_BASE_URL}${ENDPOINTS.REGISTER_FINANCE}`, payload);

      await AsyncStorage.removeItem('@draftCadastro');
      await AsyncStorage.removeItem('@draftFinanceiro');
      await AsyncStorage.removeItem('fotoPerfil');
      await AsyncStorage.removeItem('localFotoPerfil');

      mostrarToast('Cadastro realizado com sucesso!', 'sucesso');
      router.replace('/pages/userDash');
    } catch (error) {
      console.error(error);
      mostrarToast('Erro ao salvar informações, por favor tente novamente', 'erro');
    }
  }


  // Carregar rascunho na inicialização e dados do Google se rascunho não existir
  useEffect(() => {
    const loadDraftAndUserData = async () => {
      try {
        const draftFinanceiroStr = await AsyncStorage.getItem('@draftFinanceiro');
        if (draftFinanceiroStr) {
          const draftFinanceiro = JSON.parse(draftFinanceiroStr);
          if (draftFinanceiro.renda) setRenda(draftFinanceiro.renda);
          if (draftFinanceiro.selectedCategories) setSelectedCategories(draftFinanceiro.selectedCategories);
        }

        const draftCadastroStr = await AsyncStorage.getItem('@draftCadastro');
        if (draftCadastroStr) {
          const draftCadastro = JSON.parse(draftCadastroStr);
          setName(draftCadastro.name || '');
          setEmail(draftCadastro.email || '');
          setBirthDate(draftCadastro.birthDate || '');
          setPassword(draftCadastro.password || '');
          setUserId(null);
        } else {
          // Se não tem draftCadastro, pega dados do Google do AsyncStorage
          const userName = await AsyncStorage.getItem('userName');
          const userEmail = await AsyncStorage.getItem('email');
          const storedUserId = await AsyncStorage.getItem('userId');
          if (userName && userEmail && storedUserId) {
            setName(userName);
            setEmail(userEmail);
            setBirthDate('');
            setPassword('');
            setUserId(storedUserId);
          }
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDraftAndUserData();
  }, []);

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
        <View style={{ marginBottom: 70, marginTop: 24 }} >
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
        <View style={{ marginBottom: 20 }}>
          <Text style={{ color: '#4A4A4A', fontSize: 20, fontFamily: 'Manrope', fontWeight: "500", maxWidth: 336, textAlign: 'center' }}>
            Quais dessas categorias fazem parte do seu mês? <Text style={{ fontWeight: 'bold' }}>Escolha até 7 </Text>
          </Text>
        </View>
        <View style={{ paddingBottom: 30 }}>
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
        <View style={{ marginTop: 25, marginBottom: 65 }}>
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
      <ToastAlerta
                      visivel={toastVisivel}
                      tipo={tipo}
                      mensagem={mensagem}
                      aoFechar={esconderToast}
                  />
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
